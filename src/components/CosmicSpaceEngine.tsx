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

interface InfallingFilament {
  angle: number;
  radius: number;
  speed: number;
  fallSpeed: number;
  width: number;
  color: string;
  length: number;
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

    // Warp Stars for the 2-second Space Dive
    const goldTones = ['#ffd700', '#fbbf24', '#f59e0b', '#fef08a'];
    const purpleTones = ['#c084fc', '#a855f7', '#8b5cf6', '#e879f9'];
    const warpColors = [...goldTones, ...purpleTones, '#ffffff'];

    const warpStars: WarpStar[] = [];
    for (let i = 0; i < 500; i++) {
      warpStars.push({
        x: (Math.random() - 0.5) * width * 2.5,
        y: (Math.random() - 0.5) * height * 2.5,
        z: Math.random() * 1000 + 1,
        pz: 1000,
        color: warpColors[Math.floor(Math.random() * warpColors.length)],
        size: Math.random() * 2 + 0.8,
      });
    }

    // Infalling light filaments being sucked into Interstellar Black Hole
    const filaments: InfallingFilament[] = [];
    const filamentColors = ['#fde047', '#fbbf24', '#f59e0b', '#fb923c', '#c084fc', '#a855f7'];
    for (let i = 0; i < 220; i++) {
      filaments.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 320 + 70,
        speed: Math.random() * 0.03 + 0.015,
        fallSpeed: Math.random() * 0.9 + 0.4,
        width: Math.random() * 2.5 + 1,
        color: filamentColors[Math.floor(Math.random() * filamentColors.length)],
        length: Math.random() * 0.35 + 0.15,
      });
    }

    let diveSpeed = 1.0;
    let accretionRotation = 0;

    const render = () => {
      // 1. PURE BLANK PHASE (300ms)
      if (mode === 'blank') {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);
        animId = requestAnimationFrame(render);
        return;
      }

      // 2. SPACE DIVE (2 Seconds Strings of Golden & Purple Lights)
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

        // Relativistic golden and purple shock rings
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

      // 3. ENTERED PORTFOLIO: INTERSTELLAR "GARGANTUA" BLACK HOLE
      ctx.fillStyle = 'rgba(2, 2, 7, 0.88)';
      ctx.fillRect(0, 0, width, height);

      // Black hole position
      const bhX = width > 992 ? width * 0.76 : width * 0.5;
      const bhY = width > 992 ? height * 0.42 : height * 0.26;
      const R = width > 992 ? 65 : 48; // Event Horizon Radius

      // Stationary distant stars
      for (let i = 0; i < 70; i++) {
        const star = warpStars[i];
        ctx.beginPath();
        ctx.arc((star.x + width) % width, (star.y + height) % height, star.size * 0.65, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = 0.35;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      accretionRotation += 0.015;

      // INTERSTELLAR ACCRETION DISK GRAVITATIONAL LENSING:
      // (1) Upper Lensed Arch (The back of the disk bent over the black hole)
      ctx.save();
      ctx.translate(bhX, bhY);

      // Upper Arch
      ctx.beginPath();
      ctx.ellipse(0, -R * 0.15, R * 2.5, R * 1.6, 0, Math.PI, 0);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.38)';
      ctx.lineWidth = R * 0.42;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 24;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, -R * 0.15, R * 2.3, R * 1.45, 0, Math.PI, 0);
      ctx.strokeStyle = 'rgba(254, 240, 138, 0.7)';
      ctx.lineWidth = R * 0.18;
      ctx.stroke();

      // Lower Lensed Arch (The bottom reflection)
      ctx.beginPath();
      ctx.ellipse(0, R * 0.15, R * 2.4, R * 1.5, 0, 0, Math.PI);
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.32)';
      ctx.lineWidth = R * 0.35;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // (2) Swirling Light Infalling Streams (Being sucked inward)
      for (let i = 0; i < filaments.length; i++) {
        const f = filaments[i];
        f.angle += f.speed;
        // Gravitational pull increases sharply near horizon
        const pull = 1 + (R * 2) / (f.radius + 10);
        f.radius -= f.fallSpeed * pull * 0.5;

        // Reset once crossing the event horizon
        if (f.radius <= R * 1.05) {
          f.radius = Math.random() * 260 + R * 2.2;
          f.angle = Math.random() * Math.PI * 2;
        }

        const startX = Math.cos(f.angle) * f.radius;
        const startY = Math.sin(f.angle) * (f.radius * 0.28);

        const endAngle = f.angle + f.length;
        const endRadius = f.radius - 8;
        const endX = Math.cos(endAngle) * endRadius;
        const endY = Math.sin(endAngle) * (endRadius * 0.28);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = f.color;
        // Doppler effect: brighter on left (approaching) side
        const doppler = Math.cos(f.angle) < 0 ? 0.9 : 0.4;
        ctx.globalAlpha = doppler;
        ctx.lineWidth = f.width;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      // (3) Front Equatorial Accretion Disk (Cutting directly across the middle)
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 3.4, R * 0.48, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.18)';
      ctx.fill();

      // Intense central equatorial light bar
      const diskGrad = ctx.createLinearGradient(-R * 3, 0, R * 3, 0);
      diskGrad.addColorStop(0, 'rgba(168, 85, 247, 0.1)');
      diskGrad.addColorStop(0.3, 'rgba(254, 240, 138, 0.85)'); // Relativistic beaming (bright side)
      diskGrad.addColorStop(0.5, 'rgba(251, 191, 36, 0.9)');
      diskGrad.addColorStop(0.8, 'rgba(245, 158, 11, 0.5)');
      diskGrad.addColorStop(1, 'rgba(168, 85, 247, 0.1)');

      ctx.beginPath();
      ctx.ellipse(0, 0, R * 3.1, R * 0.22, 0, 0, Math.PI * 2);
      ctx.fillStyle = diskGrad;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      // (4) Photosphere Glow Ring (The glowing edge of the black hole)
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.06, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(254, 240, 138, 0.95)';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#fde047';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // (5) The Pure Black Event Horizon (The central shadow of Gargantua)
      ctx.beginPath();
      ctx.arc(0, 0, R, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();

      // Telemetry badge
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(251, 191, 36, 0.6)';
      ctx.fillText('GARGANTUA // EVENT HORIZON', -75, R + 34);

      ctx.restore();

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
