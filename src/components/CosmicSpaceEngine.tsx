import React, { useEffect, useRef } from 'react';

export type CosmicMode = 'idle' | 'blank' | 'diving' | 'galaxies';

interface CosmicSpaceEngineProps {
  mode: CosmicMode;
}

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
  color: string;
  size: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

interface GalaxyParticle {
  galaxy: 1 | 2; // 1 = Golden Galaxy, 2 = Purple Galaxy
  armIndex: number;
  originalDist: number;
  angle: number;
  speed: number;
  color: string;
  size: number;
  offsetY: number;
}

export const CosmicSpaceEngine: React.FC<CosmicSpaceEngineProps> = ({ mode }) => {
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

    // Realistic astronomical stellar colors: White, Blue, Red, Yellow
    const starColors = [
      '#ffffff', // White (A/O class)
      '#f8fafc', // Bright White
      '#60a5fa', // Blue (B class)
      '#93c5fd', // Light Blue
      '#ef4444', // Red (M class / Red Giant)
      '#f87171', // Warm Red
      '#facc15', // Yellow (G class / Solar)
      '#fbbf24', // Amber Yellow
    ];

    // Colors for the Space Dive warp strings (Gold and Purple)
    const diveColors = [
      '#ffd700', '#fbbf24', '#f59e0b', // Golden strings
      '#c084fc', '#a855f7', '#8b5cf6', // Purple strings
      '#ffffff',
    ];

    // 1. Background Realistic Stars
    const backgroundStars: Star[] = [];
    const starCount = 380;
    for (let i = 0; i < starCount; i++) {
      backgroundStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 1000 + 1,
        pz: 1000,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        size: Math.random() * 1.8 + 0.6,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
      });
    }

    // 2. Warp Stars for Space Dive
    const warpStars: Star[] = [];
    for (let i = 0; i < 480; i++) {
      warpStars.push({
        x: (Math.random() - 0.5) * width * 2.5,
        y: (Math.random() - 0.5) * height * 2.5,
        z: Math.random() * 1000 + 1,
        pz: 1000,
        color: diveColors[Math.floor(Math.random() * diveColors.length)],
        size: Math.random() * 2 + 1,
        twinklePhase: 0,
        twinkleSpeed: 0,
      });
    }

    // 3. Two Colliding Galaxies Simulation Particles
    const galaxyParticles: GalaxyParticle[] = [];
    const particlesPerGalaxy = 320;

    // Galaxy 1: Golden / Amber Galaxy
    const goldPalette = ['#ffd700', '#fbbf24', '#f59e0b', '#fef08a', '#ffffff'];
    for (let i = 0; i < particlesPerGalaxy; i++) {
      const arm = i % 2;
      const dist = Math.pow(Math.random(), 0.7) * 220 + 8;
      const baseAngle = arm * Math.PI + dist * 0.022;
      galaxyParticles.push({
        galaxy: 1,
        armIndex: arm,
        originalDist: dist,
        angle: baseAngle + (Math.random() - 0.5) * 0.4,
        speed: (0.012 - dist * 0.00003),
        color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
        size: Math.random() * 2.2 + 0.8,
        offsetY: (Math.random() - 0.5) * (dist * 0.22),
      });
    }

    // Galaxy 2: Purple / Violet Galaxy
    const purplePalette = ['#c084fc', '#a855f7', '#8b5cf6', '#e879f9', '#ffffff'];
    for (let i = 0; i < particlesPerGalaxy; i++) {
      const arm = i % 2;
      const dist = Math.pow(Math.random(), 0.7) * 200 + 8;
      const baseAngle = arm * Math.PI + dist * 0.024;
      galaxyParticles.push({
        galaxy: 2,
        armIndex: arm,
        originalDist: dist,
        angle: baseAngle + (Math.random() - 0.5) * 0.45,
        speed: (0.013 - dist * 0.000035),
        color: purplePalette[Math.floor(Math.random() * purplePalette.length)],
        size: Math.random() * 2.0 + 0.8,
        offsetY: (Math.random() - 0.5) * (dist * 0.2),
      });
    }

    let diveSpeed = 1.0;
    let collisionTime = 0;

    const render = () => {
      // 1. PURE BLANK SCREEN PHASE
      if (mode === 'blank') {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);
        animId = requestAnimationFrame(render);
        return;
      }

      // 2. SPACE DIVE (2s Golden & Purple Warp Light Strings)
      if (mode === 'diving') {
        ctx.fillStyle = 'rgba(2, 1, 8, 0.28)';
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;

        diveSpeed += (55 - diveSpeed) * 0.08;

        for (let i = 0; i < warpStars.length; i++) {
          const star = warpStars[i];
          star.pz = star.z;
          star.z -= diveSpeed;

          if (star.z <= 1) {
            star.z = 1000;
            star.pz = 1000;
            star.x = (Math.random() - 0.5) * width * 2.5;
            star.y = (Math.random() - 0.5) * height * 2.5;
          }

          const k = 420 / star.z;
          const px = star.x * k + cx;
          const py = star.y * k + cy;

          const prevK = 420 / star.pz;
          const prevPx = star.x * prevK + cx;
          const prevPy = star.y * prevK + cy;

          if (px >= 0 && px < width && py >= 0 && py < height) {
            ctx.beginPath();
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            ctx.strokeStyle = star.color;
            ctx.lineWidth = Math.min((1 - star.z / 1000) * 4.5 + 1.2, 7);
            ctx.lineCap = 'round';
            ctx.shadowColor = star.color;
            ctx.shadowBlur = 12;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }

        // Concentric warp shockwave rings
        const ringTime = Date.now() * 0.004;
        for (let r = 0; r < 3; r++) {
          const radius = ((ringTime + r * 1.5) * 260) % (width * 0.9);
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = r % 2 === 0 ? 'rgba(251, 191, 36, 0.45)' : 'rgba(168, 85, 247, 0.45)';
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        animId = requestAnimationFrame(render);
        return;
      }

      // 3. ENTERED PORTFOLIO: TWO COLLIDING GALAXIES (GOLDEN & PURPLE MERGER)
      ctx.fillStyle = 'rgba(3, 3, 8, 0.88)';
      ctx.fillRect(0, 0, width, height);

      // (A) Realistic Multicolored Background Stars (White, Blue, Red, Yellow)
      for (let i = 0; i < backgroundStars.length; i++) {
        const star = backgroundStars[i];
        star.twinklePhase += star.twinkleSpeed;
        const alpha = 0.35 + 0.55 * Math.sin(star.twinklePhase);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.15, alpha);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [mode]);

  return <canvas ref={canvasRef} className="cosmic-canvas" aria-hidden="true" />;
};
