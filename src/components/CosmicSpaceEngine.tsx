import React, { useEffect, useRef } from 'react';

interface CosmicSpaceEngineProps {
  isDiving: boolean;
}

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number; // previous z for drawing light streaks
  color: string;
  size: number;
}

export const CosmicSpaceEngine: React.FC<CosmicSpaceEngineProps> = ({ isDiving }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color palette: Strings of Golden and Purple/Violet lights
    const spaceColors = [
      '#fbbf24', // bright gold
      '#f59e0b', // amber gold
      '#ffd700', // pure gold
      '#c084fc', // light purple
      '#a855f7', // electric purple
      '#8b5cf6', // deep violet
      '#ec4899', // magenta touch
      '#ffffff', // stellar white
    ];

    const starCount = 420;
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * 1000 + 1,
        pz: 1000,
        color: spaceColors[Math.floor(Math.random() * spaceColors.length)],
        size: Math.random() * 1.8 + 0.6,
      });
    }

    let speed = 0.8;
    const targetSpeed = isDiving ? 42 : 0.8;

    const render = () => {
      // Smoothly accelerate or decelerate to target speed
      speed += (targetSpeed - speed) * (isDiving ? 0.08 : 0.04);

      // Deep space cosmic backdrop
      ctx.fillStyle = isDiving ? 'rgba(5, 2, 14, 0.35)' : 'rgba(4, 5, 12, 0.85)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw nebular glow in background
      if (!isDiving) {
        const purpleGrad = ctx.createRadialGradient(cx * 0.4, cy * 0.3, 50, cx * 0.4, cy * 0.3, 400);
        purpleGrad.addColorStop(0, 'rgba(139, 92, 246, 0.06)');
        purpleGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = purpleGrad;
        ctx.fillRect(0, 0, width, height);

        const goldGrad = ctx.createRadialGradient(cx * 1.5, cy * 0.8, 40, cx * 1.5, cy * 0.8, 350);
        goldGrad.addColorStop(0, 'rgba(245, 158, 11, 0.05)');
        goldGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = goldGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Render 3D Starfield & Warp Light Strings
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.pz = star.z;
        star.z -= speed;

        if (star.z <= 1) {
          star.z = 1000;
          star.pz = 1000;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
          star.color = spaceColors[Math.floor(Math.random() * spaceColors.length)];
        }

        const k = 400 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px < 0 || px >= width || py < 0 || py >= height) continue;

        if (isDiving || speed > 4) {
          // Warp dive mode: draw elongated strings of golden and purple light
          const prevK = 400 / star.pz;
          const prevPx = star.x * prevK + cx;
          const prevPy = star.y * prevK + cy;

          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = Math.min((1 - star.z / 1000) * 3.5 + 0.8, 5);
          ctx.lineCap = 'round';
          ctx.shadowColor = star.color;
          ctx.shadowBlur = 10;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else {
          // Ambient cosmic star
          const alpha = (1 - star.z / 1000);
          ctx.beginPath();
          ctx.arc(px, py, star.size * (1 - star.z / 1200), 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = Math.max(alpha, 0.2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      }

      // Pulsing cosmic rings during space dive
      if (isDiving) {
        const ringTime = Date.now() * 0.003;
        const ringRadius = (ringTime * 280) % (width * 0.8);
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)'; // golden ring
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, (ringRadius + 120) % (width * 0.8), 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)'; // purple ring
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isDiving]);

  return <canvas ref={canvasRef} className="cosmic-canvas" aria-hidden="true" />;
};
