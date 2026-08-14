import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS, type Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FocusViewProps {
  startIndex: number;
  onClose: () => void;
  onAdd: (product: Product, size: string) => void;
}

const formatPrice = (n: number) => `$${n.toFixed(2)}`;
const mod = (a: number, n: number) => ((a % n) + n) % n;
const norm180 = (d: number) => {
  let x = ((d + 180) % 360 + 360) % 360 - 180;
  return Math.abs(x);
};

/**
 * "Rotating clock" product detail, modelled on store.elevenlabs.io.
 * A giant ring is rotated so the focused product lands at a fixed focal
 * point; the rest orbit off-screen. Motion is fully physics-driven: drag
 * carries momentum and glides to a smooth stop, arrows/scroll spring to the
 * next product. Each item counter-rotates to stay upright and fades with
 * distance from focus for depth.
 */
export function FocusView({ startIndex, onClose, onAdd }: FocusViewProps) {
  const N = PRODUCTS.length;
  const STEP = 360 / N;

  const [focusReal, setFocusReal] = useState(mod(startIndex, N));
  const [size, setSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [vp, setVp] = useState({ w: 1280, h: 720 });

  const ringRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const product = PRODUCTS[focusReal];
  const isMobile = vp.w < 768;

  /* ── Geometry ─────────────────────────────────────────────── */
  const geo = useMemo(() => {
    const focalX = isMobile ? vp.w * 0.5 : vp.w * 0.4;
    const focalY = isMobile ? vp.h * 0.34 : vp.h * 0.48;
    const R = isMobile ? Math.max(vp.w * 0.95, 300) : vp.w * 0.62;
    const item = isMobile
      ? Math.min(vp.w * 0.66, 320)
      : Math.min(vp.w * 0.3, 440);
    return { focalX, focalY, R, item, Cx: focalX - R, Cy: focalY };
  }, [vp, isMobile]);

  useLayoutEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Physics state (refs — never trigger React re-renders) ── */
  const sim = useRef({
    rot: -startIndex * STEP, // continuous rotation (deg)
    vel: 0, // deg / s
    targetIdx: startIndex, // virtual (unbounded) target product
    mode: "spring" as "spring" | "inertia" | "drag",
  });
  const focusRealRef = useRef(focusReal);

  /* Write the current rotation to the DOM + per-item depth styling. */
  const paint = useCallback(() => {
    const { rot } = sim.current;
    ringRef.current?.style.setProperty("--rot", `${rot}deg`);
    for (let i = 0; i < N; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;
      const d = norm180(i * STEP + rot); // angular distance from focal (0°)
      const scale = 1 - Math.min(d / 90, 1) * 0.16;
      const opacity = 1 - Math.min(d / 64, 1) * 0.62;
      el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      el.style.opacity = opacity.toFixed(3);
      el.style.zIndex = String(1000 - Math.round(d));
    }
  }, [N, STEP]);

  /* ── Animation loop ───────────────────────────────────────── */
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const s = sim.current;

      if (s.mode === "inertia") {
        s.rot += s.vel * dt;
        s.vel *= Math.exp(-4 * dt); // friction
        if (Math.abs(s.vel) < 40) {
          s.mode = "spring";
          s.targetIdx = Math.round(-s.rot / STEP);
        }
      } else if (s.mode === "spring") {
        const target = -s.targetIdx * STEP;
        if (reduce) {
          s.rot = target;
          s.vel = 0;
        } else {
          const k = 150; // stiffness
          const c = 25; // damping (~critical → smooth, no wobble)
          const a = k * (target - s.rot) - c * s.vel;
          s.vel += a * dt;
          s.rot += s.vel * dt;
          if (Math.abs(target - s.rot) < 0.08 && Math.abs(s.vel) < 2) {
            s.rot = target;
            s.vel = 0;
          }
        }
      }
      // mode "drag" → rot is set by the pointer handler directly.

      paint();
      const real = mod(Math.round(-s.rot / STEP), N);
      if (real !== focusRealRef.current) {
        focusRealRef.current = real;
        setFocusReal(real);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [N, STEP, paint]);

  /* Re-apply depth styling immediately when geometry changes. */
  useLayoutEffect(() => {
    paint();
  }, [geo, paint]);

  /* ── Reset per-product UI when focus changes ──────────────── */
  useEffect(() => {
    setSize(product.sizes.length === 1 ? product.sizes[0] : null);
    setActiveImage(0);
  }, [focusReal, product.sizes]);

  const nudge = useCallback((dir: number) => {
    sim.current.mode = "spring";
    sim.current.targetIdx += dir;
  }, []);

  /* ── Keyboard ─────────────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); nudge(1); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); nudge(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nudge, onClose]);

  /* ── Wheel / trackpad ─────────────────────────────────────── */
  const wheelAcc = useRef(0);
  const onWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    wheelAcc.current += delta;
    const THRESH = 90;
    while (Math.abs(wheelAcc.current) >= THRESH) {
      nudge(wheelAcc.current > 0 ? 1 : -1);
      wheelAcc.current -= Math.sign(wheelAcc.current) * THRESH;
    }
  };

  /* ── Pointer drag: grab & rotate the clock (follows the finger) ──
     The ring rotates to track the pointer's angle around the ring centre,
     so dragging up/down along the visible arc spins it naturally — matching
     the reference, where the clock's arc near the focal point is vertical.
     Move/up are bound to `window` (not the element) so a fast drag keeps
     tracking even if the pointer leaves the item, and never gets dropped. */
  const movedRef = useRef(false);
  const geoRef = useRef(geo);
  geoRef.current = geo;

  // Normalise sensitivity so one product ≈ `pxPerStep` of drag on any screen,
  // regardless of the (huge) ring radius, while keeping finger-tracking.
  const pxPerStepRef = useRef(0);
  pxPerStepRef.current = isMobile ? vp.w * 0.32 : 150;

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("[data-focus-panel],[data-nav-btn]")) return;
    e.preventDefault();
    sim.current.mode = "drag";
    movedRef.current = false;
    stageRef.current?.classList.add("dragging");

    const { Cx, Cy, R } = geoRef.current;
    const sens = (STEP * Math.PI * R) / (180 * pxPerStepRef.current);
    let lastAngle = Math.atan2(e.clientY - Cy, e.clientX - Cx);
    let lastT = performance.now();
    let vel = 0;
    const startX = e.clientX;
    const startY = e.clientY;

    const move = (ev: PointerEvent) => {
      let angle = Math.atan2(ev.clientY - Cy, ev.clientX - Cx);
      let dA = angle - lastAngle;
      if (dA > Math.PI) dA -= 2 * Math.PI; // unwrap
      if (dA < -Math.PI) dA += 2 * Math.PI;
      const dADeg = ((dA * 180) / Math.PI) * sens;
      sim.current.rot += dADeg; // clock tracks the finger
      const now = performance.now();
      const dt = Math.max(now - lastT, 1) / 1000;
      vel = dADeg / dt; // angular velocity (deg/s)
      lastAngle = angle;
      lastT = now;
      if (Math.abs(ev.clientX - startX) > 4 || Math.abs(ev.clientY - startY) > 4)
        movedRef.current = true;
      paint(); // update immediately, independent of the rAF cadence
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      stageRef.current?.classList.remove("dragging");
      sim.current.vel = Math.max(Math.min(vel, 1500), -1500); // carry momentum
      sim.current.mode = Math.abs(vel) > 45 ? "inertia" : "spring";
      if (sim.current.mode === "spring")
        sim.current.targetIdx = Math.round(-sim.current.rot / STEP);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  /* Click a neighbour to spring it to focus (shortest path). */
  const focusItem = (realIndex: number) => {
    if (movedRef.current) return;
    const current = mod(sim.current.targetIdx, N);
    if (realIndex === current) return;
    let delta = realIndex - current;
    if (delta > N / 2) delta -= N;
    if (delta < -N / 2) delta += N;
    sim.current.mode = "spring";
    sim.current.targetIdx += delta;
  };

  const canAdd = size !== null;

  return (
    <div
      className="focus-overlay fixed inset-0 z-30 overflow-hidden bg-background/95 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
    >
      <button
        className="absolute inset-0 h-full w-full cursor-default"
        aria-label="Close product"
        onClick={onClose}
        tabIndex={-1}
      />

      <div
        ref={stageRef}
        className="focus-stage absolute inset-0"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
      >
        <div className="absolute" style={{ left: geo.Cx, top: geo.Cy, width: 0, height: 0 }}>
          <div
            ref={ringRef}
            className="focus-ring absolute"
            style={{ left: -geo.R, top: -geo.R, width: geo.R * 2, height: geo.R * 2 }}
          >
            {PRODUCTS.map((p, i) => {
              const a = (i * STEP * Math.PI) / 180;
              const lx = geo.R + geo.R * Math.cos(a);
              const ly = geo.R + geo.R * Math.sin(a);
              const isFocal = i === focusReal;
              return (
                <div
                  key={p.id}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: lx, top: ly, width: geo.item, height: geo.item }}
                >
                  <div className="focus-item-rev h-full w-full">
                    <button
                      onClick={() => focusItem(i)}
                      className={cn(
                        "relative block h-full w-full overflow-hidden rounded-3xl border bg-card",
                        isFocal
                          ? "border-border shadow-[0_24px_60px_rgba(0,0,0,0.16)]"
                          : "border-border/60"
                      )}
                      tabIndex={isFocal ? 0 : -1}
                    >
                      <img
                        src={isFocal ? p.images[activeImage] : p.images[0]}
                        alt={p.name}
                        draggable={false}
                        className="h-full w-full select-none object-cover"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <button
        data-nav-btn
        onClick={() => nudge(-1)}
        aria-label="Previous product"
        className="absolute left-3 top-1/2 z-40 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground sm:left-5"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        data-nav-btn
        onClick={() => nudge(1)}
        aria-label="Next product"
        className="absolute right-3 top-1/2 z-40 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground sm:right-5 md:hidden"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Info panel */}
      <div
        data-focus-panel
        className={cn(
          "absolute z-40 flex flex-col gap-3 rounded-3xl border border-border bg-card/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-md",
          isMobile ? "inset-x-3 bottom-3" : "right-6 top-1/2 w-[340px] -translate-y-1/2"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              {product.category}
            </p>
            <h2 className="mt-0.5 text-xl font-semibold leading-tight tracking-tight">
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-base tabular-nums">{formatPrice(product.price)}</p>

        {!isMobile && (
          <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        )}

        {product.images.length > 1 && (
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "h-11 w-11 overflow-hidden rounded-lg border-2 transition-colors",
                  i === activeImage
                    ? "border-foreground"
                    : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {product.sizes.length > 1 && (
          <div>
            <p className="mb-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
              Size
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={cn(
                    "min-w-[2.75rem] rounded-full border px-3 py-1.5 text-xs uppercase tracking-wide transition-colors",
                    size === s
                      ? "border-foreground bg-primary text-primary-foreground"
                      : "border-border hover:border-foreground"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={() => size && onAdd(product, size)}
          disabled={!canAdd}
          className="mt-1 h-11 w-full rounded-full text-xs uppercase tracking-wide"
        >
          {canAdd ? "Add to cart" : "Select a size"}
        </Button>

        <p className="text-center text-[11px] text-muted-foreground">
          Swipe, scroll, or use ← → to browse
        </p>
      </div>
    </div>
  );
}
