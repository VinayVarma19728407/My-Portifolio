import React, { useEffect, useRef } from 'react';

export type CosmicMode = 'idle' | 'blank' | 'diving' | 'blackhole';

interface CosmicSpaceEngineProps {
  mode: CosmicMode;
}

interface WarpStar {
  x: number;
  y: number;
  z: number;
  pz: number;
  color: string;
  size: number;
}

interface InfallingLightParticle {
  angle: number;
  distance: number;
  speed: number;
  radialSpeed: number;
  color: string;
  size: number;
  tailLength: number;
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

    // Golden & Purple color palettes
    const goldColors = ['#ffd700', '#fbbf24', '#f59e0b', '#fef08a'];
    const purpleColors = ['#c084fc', '#a855f7', '#8b5cf6', '#e879f9'];
    const cosmicColors = [...goldColors, ...purpleColors, '#ffffff'];

    // 1. Warp Stars for Space Dive
    const warpStars: WarpStar[] = [];
    const warpCount = 500;
    for (let i = 0; i < warpCount; i++) {
      warpStars.push({
        x: (Math.random() - 0.5) * width * 2.5,
        y: (Math.random() - 0.5) * height * 2.5,
        z: Math.random() * 1000 + 1,
        pz: 1000,
        color: cosmicColors[Math.floor(Math.random() * cosmicColors.length)],
        size: Math.random() * 2 + 0.8,
      });
    }

    // 2. Black Hole Infalling Light Streams
    const infallingParticles: InfallingLightParticle[] = [];
    const particleCount = 280;

    for (let i = 0; i < particleCount; i++) {
      const isGold = Math.random() > 0.45;
      infallingParticles.push({
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 550 + 40,
        speed: (Math.random() * 0.025 + 0.015),
        radialSpeed: Math.random() * 1.4 + 0.6,
        color: isGold
          ? goldColors[Math.floor(Math.random() * goldColors.length)]
          : purpleColors[Math.floor(Math.random() * purpleColors.length)],
        size: Math.random() * 2.2 + 0.8,
        tailLength: Math.random() * 14 + 6,
      });
    }

    let diveSpeed = 1.0;

    const render = () => {
      // PHASE 1: PURE BLANK (300ms)
      if (mode === 'blank') {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);
        animId = requestAnimationFrame(render);
        return;
      }

      // PHASE 2: SPACE DIVE (Intense Strings of Golden and Purple Lights)
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

        // Intense expanding portal warp rings
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

      // PHASE 3: ENTERED PORTFOLIO (Cosmic Background with Black Hole Sucking Light)
      // Base deep space canvas
      ctx.fillStyle = 'rgba(2, 2, 7, 0.88)';
      ctx.fillRect(0, 0, width, height);

      // Black Hole position in space (placed gracefully in depth)
      const bhX = width > 900 ? width * 0.78 : width * 0.5;
      const bhY = width > 900 ? height * 0.42 : height * 0.28;
      const eventHorizonRadius = width > 900 ? 55 : 42;

      // 1. Distant stationary background stars
      for (let i = 0; i < 90; i++) {
        const star = warpStars[i];
        ctx.beginPath();
        ctx.arc((star.x + width) % width, (star.y + height) % height, star.size * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = 0.4;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // 2. Gravitational Accretion Disk Glow (Golden & Purple)
      const diskGrad = ctx.createRadialGradient(bhX, bhY, eventHorizonRadius * 0.8, bhX, bhY, eventHorizonRadius * 5.5);
      diskGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      diskGrad.addColorStop(0.18, 'rgba(251, 191, 36, 0.22)'); // gold photon ring
      diskGrad.addColorStop(0.45, 'rgba(168, 85, 247, 0.16)'); // purple accretion glow
      diskGrad.addColorStop(0.85, 'rgba(124, 58, 237, 0.05)');
      diskGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = diskGrad;
      ctx.beginPath();
      ctx.arc(bhX, bhY, eventHorizonRadius * 5.5, 0, Math.PI * 2);
      ctx.fill();

      // 3. Swirling Infalling Light Streams being sucked into the Black Hole
      for (let i = 0; i < infallingParticles.length; i++) {
        const p = infallingParticles[i];

        // Angular movement (orbiting inward)
        p.angle += p.speed;
        // Radial movement (being sucked inward by gravity)
        // Stronger pull as it gets closer
        const gravity = (180 / (p.distance + 30));
        p.distance -= p.radialSpeed * (0.8 + gravity * 0.35);

        // Respawn particle at outer edge once swallowed by event horizon
        if (p.distance <= eventHorizonRadius) {
          p.distance = Math.random() * 450 + 200;
          p.angle = Math.random() * Math.PI * 2;
          p.speed = Math.random() * 0.025 + 0.015;
        }

        // Elliptical accretion distortion (tilted view of the black hole disk)
        const tilt = 0.55; // vertical foreshortening
        const px = bhX + Math.cos(p.angle) * p.distance;
        const py = bhY + Math.sin(p.angle) * p.distance * tilt;

        // Draw light streak trailing into the gravitational vortex
        const tailAngle = p.angle - p.speed * p.tailLength;
        const tailDist = p.distance + p.radialSpeed * 4;
        const tx = bhX + Math.cos(tailAngle) * tailDist;
        const ty = bhY + Math.sin(tailAngle) * tailDist * tilt;

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.strokeStyle = p.color;
        // Light heats up and gets brighter near event horizon
        const proximityAlpha = Math.min((p.distance - eventHorizonRadius) / 250, 1);
        ctx.globalAlpha = 0.2 + (1 - proximityAlpha) * 0.8;
        ctx.lineWidth = p.size * (1 + (1 - proximityAlpha) * 1.5);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      // 4. Relativistic Photon Ring (Glowing border around event horizon)
      ctx.beginPath();
      ctx.arc(bhX, bhY, eventHorizonRadius + 3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.75)';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(bhX, bhY, eventHorizonRadius + 7, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 5. The Event Horizon (Pitch Black Singularity)
      ctx.beginPath();
      ctx.arc(bhX, bhY, eventHorizonRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();

      // Gravitational lens label (subtle HUD identifier)
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(251, 191, 36, 0.5)';
      ctx.fillText('SINGULARITY // GRAVITATIONAL_LENSING', bhX - 110, bhY + eventHorizonRadius + 24);

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
