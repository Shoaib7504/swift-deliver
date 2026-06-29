import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

const logos = ["NORDIC", "Acme Co.", "Lumen", "Northwind", "Stark", "Globex", "Initech"];
const track = [...logos, ...logos]; // duplicated so the wrap-around is seamless

export default function LogoStrip() {
  const x = useMotionValue(0);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const trackRef = useRef(null);
  const [halfWidth, setHalfWidth] = useState(0);

  const SPEED = 35; // px per second — raise/lower to taste

  // measure one copy of the track once it's rendered
  useEffect(() => {
    if (trackRef.current) {
      setHalfWidth(trackRef.current.scrollWidth / 2);
    }
  }, []);

  // respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useAnimationFrame((_, delta) => {
    if (hovered || reducedMotion || !halfWidth) return;
    const moveBy = (SPEED * delta) / 1000;
    let next = x.get() - moveBy;
    if (next <= -halfWidth) next += halfWidth; // loop back seamlessly
    x.set(next);
  });

  return (
    <section className="border-y bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by teams at 8,000+ restaurants & stores
        </p>

        <div
          className="relative mt-5 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <motion.div
            ref={trackRef}
            style={{ x }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="flex w-max items-center gap-16 opacity-70"
          >
            {track.map((logo, i) => (
              <p
                key={`${logo}-${i}`}
                className="shrink-0 whitespace-nowrap text-center font-display text-lg font-bold tracking-tight text-foreground/80"
              >
                {logo}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}