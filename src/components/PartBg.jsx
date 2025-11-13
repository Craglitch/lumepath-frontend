// src/components/PartBg.jsx
import { useEffect, useMemo } from "react";
import { initParticlesEngine, Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function PartBg() {
  const options = useMemo(
    () => ({
      background: { color: { value: "#0f1020" } },
      particles: {
        color: { value: ["#7c3aed", "#60a5fa"] }, // purple-blue
        links: { enable: true, color: "#60a5fa" },
        move: { enable: true, speed: 1 },
        number: { value: 50 },
        opacity: { value: 0.7 },
        size: { value: { min: 1, max: 3 } },
      },
    }),
    []
  );

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  return <Particles id="tsparticles" options={options} />;
}

