import React, { useRef, useEffect, useState } from "react";

interface CanvasRevealEffectProps {
  /** Speed of the wave noise animation. */
  animationSpeed?: number;
  /** Primary RGB color(s) for the reveal effect, e.g. [[0, 255, 255]] for cyan */
  colors?: number[][];
  /** Array of opacity values for depth layering */
  opacities?: number[];
  /** Radius of the mouse reveal spotlight */
  revealRadius?: number;
  /** Size of each dot in pixels */
  dotSize?: number;
  /** Spacing between dots in pixels */
  dotSpacing?: number;
  /** Toggle whether to display a glowing radial overlay following the mouse */
  showGradient?: boolean;
  /** Tailwind wrapper class */
  containerClassName?: string;
  /** Canvas wrapper class */
  className?: string;
}

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  colors = [[34, 211, 238]], // Default to cyan
  revealRadius = 150,
  dotSize = 1.5,
  dotSpacing = 16,
  showGradient = true,
  containerClassName = "",
  className = "",
}: CanvasRevealEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Handle resizing
    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      canvas.width = (rect?.width || window.innerWidth) * window.devicePixelRatio;
      canvas.height = (rect?.height || window.innerHeight) * window.devicePixelRatio;
      canvas.style.width = `${rect?.width || window.innerWidth}px`;
      canvas.style.height = `${rect?.height || window.innerHeight}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse events relative to container
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      });
    };

    const handleMouseLeave = () => {
      setMouse((prev) => ({ ...prev, active: false }));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
      container.addEventListener("mouseenter", () => {
        setMouse((prev) => ({ ...prev, active: true }));
      });
    }

    // Render loop
    const render = () => {
      if (!ctx || !canvas) return;
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      // Clear canvas
      ctx.clearRect(0, 0, w, h);

      time += animationSpeed * 0.05;

      const cols = Math.ceil(w / dotSpacing);
      const rows = Math.ceil(h / dotSpacing);

      // Loop through the grid
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * dotSpacing + dotSpacing / 2;
          const y = r * dotSpacing + dotSpacing / 2;

          // Calculate distance to mouse
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Calculate reveal opacity factor based on proximity to mouse
          let revealFactor = 0;
          if (mouse.active) {
            if (distance < revealRadius) {
              revealFactor = (1 - distance / revealRadius);
            }
          }

          // Generate animated wave modulation
          const wave = Math.sin(c * 0.2 + time) * Math.cos(r * 0.2 + time);
          const baseOpacity = 0.03 + (wave + 1) * 0.02; // Soft pulse when not hovered

          // Final opacity
          const opacity = baseOpacity + revealFactor * 0.85;

          // Interpolate colors based on revealFactor
          let colorString = "rgba(255, 255, 255, 0.06)";
          if (revealFactor > 0.01) {
            // Pick color from props (cycle if multiple, blend with revealFactor)
            const colorIdx = Math.floor((c + r) % colors.length);
            const [cr, cg, cb] = colors[colorIdx];
            colorString = `rgba(${cr}, ${cg}, ${cb}, ${opacity})`;
          } else {
            colorString = `rgba(255, 255, 255, ${baseOpacity})`;
          }

          // Draw the dot
          ctx.beginPath();
          // Scale size slightly with mouse hover or wave
          const sizeMultiplier = 1 + revealFactor * 0.8;
          ctx.arc(x, y, dotSize * sizeMultiplier, 0, Math.PI * 2);
          ctx.fillStyle = colorString;
          ctx.fill();
        }
      }

      // Optionally draw a subtle highlight gradient behind mouse (spotlight effect)
      if (showGradient && mouse.active) {
        const [primaryColor] = colors;
        const [cr, cg, cb] = primaryColor;
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          10,
          mouse.x,
          mouse.y,
          revealRadius
        );
        grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.12)`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationSpeed, colors, revealRadius, dotSize, dotSpacing, showGradient, mouse.x, mouse.y, mouse.active]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${containerClassName}`}
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 pointer-events-none block z-0 ${className}`}
      />
    </div>
  );
};
