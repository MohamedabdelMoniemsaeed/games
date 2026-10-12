import React, { useEffect, useRef } from 'react';
import { CropType, WeatherType } from '../game/models';

/**
 * Utility to configure canvas with devicePixelRatio for ultra-crisp retina display
 */
function setupDprCanvas(
  canvas: HTMLCanvasElement,
  cssWidth: number,
  cssHeight: number
): CanvasRenderingContext2D | null {
  const dpr = typeof window !== 'undefined' ? Math.max(1, window.devicePixelRatio || 1) : 1;
  canvas.width = Math.round(cssWidth * dpr);
  canvas.height = Math.round(cssHeight * dpr);
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
  }
  return ctx;
}

export const GroundCanvas: React.FC<{
  season: number; // 0 spring, 1 summer, 2 autumn, 3 winter
  width: number;
  height: number;
}> = ({ season, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width <= 0 || height <= 0) return;
    const ctx = setupDprCanvas(canvas, width, height);
    if (!ctx) return;

    // Palette per season
    const grassColors = ['#88C265', '#6FAE49', '#C29F47', '#E2ECF0'];
    const tuftColors = ['#5F9B3A', '#4F8A2D', '#9A7625', '#B5C4CB'];

    // 1. Base vibrant seasonal lawn
    ctx.fillStyle = grassColors[season] || grassColors[0];
    ctx.fillRect(0, 0, width, height);

    // Subtle lawn pattern stripes
    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    for (let y = 0; y < height; y += 18) {
      ctx.fillRect(0, y, width, 9);
    }

    // 2. Crisp grass tufts & wildflowers
    ctx.strokeStyle = tuftColors[season] || tuftColors[0];
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';
    for (let i = 0; i < 90; i++) {
      const x = (i * 37) % width;
      const y = ((i * 73) % (height - 60)) + 35;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 2, y - 6);
      ctx.moveTo(x, y);
      ctx.lineTo(x + 2, y - 7);
      ctx.stroke();

      // Occasional tiny flower in spring/summer
      if ((season === 0 || season === 1) && i % 7 === 0) {
        ctx.fillStyle = i % 14 === 0 ? '#FFFFFF' : '#FFD54F';
        ctx.beginPath();
        ctx.arc(x + 1, y - 8, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 3. Dirt Path along the bottom (for tractor)
    const pathH = 38;
    const pathY = height - pathH;

    // Path drop shadow at top edge
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.fillRect(0, pathY - 2, width, 3);

    // Warm rustic dirt road
    ctx.fillStyle = '#BF9F70';
    ctx.fillRect(0, pathY, width, pathH);

    // Road texture & gravel specks
    ctx.fillStyle = 'rgba(90, 60, 20, 0.1)';
    for (let i = 0; i < 40; i++) {
      const gx = (i * 43) % width;
      const gy = pathY + 4 + ((i * 17) % (pathH - 8));
      ctx.beginPath();
      ctx.arc(gx, gy, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Two parallel tractor tire ruts
    ctx.strokeStyle = '#997448';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, pathY + 11);
    ctx.lineTo(width, pathY + 11);
    ctx.moveTo(0, pathY + 27);
    ctx.lineTo(width, pathY + 27);
    ctx.stroke();

    // Tire tread marks (small dashes)
    ctx.strokeStyle = '#856038';
    ctx.lineWidth = 1.2;
    for (let x = 6; x < width; x += 12) {
      ctx.beginPath();
      ctx.moveTo(x, pathY + 9);
      ctx.lineTo(x + 3, pathY + 13);
      ctx.moveTo(x, pathY + 25);
      ctx.lineTo(x + 3, pathY + 29);
      ctx.stroke();
    }

    // 4. Wooden Fence separating top courtyard from fields
    const fenceY = 82;
    // Fence shadow on ground
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, fenceY + 6, width, 4);

    // Horizontal fence rails (two rails with wood bevel)
    ctx.fillStyle = '#8B5A2B';
    ctx.fillRect(0, fenceY - 4, width, 4.5);
    ctx.fillStyle = '#6D401D';
    ctx.fillRect(0, fenceY + 0.5, width, 1.5);

    ctx.fillStyle = '#8B5A2B';
    ctx.fillRect(0, fenceY + 10, width, 4.5);
    ctx.fillStyle = '#6D401D';
    ctx.fillRect(0, fenceY + 14.5, width, 1.5);

    // Fence vertical posts
    for (let x = 12; x < width; x += 28) {
      // Post shadow
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(x + 5, fenceY - 14, 2, 34);

      // Post wood body
      ctx.fillStyle = '#A06D3B';
      ctx.fillRect(x, fenceY - 14, 6, 32);
      // Post pointed top
      ctx.beginPath();
      ctx.moveTo(x, fenceY - 14);
      ctx.lineTo(x + 3, fenceY - 18);
      ctx.lineTo(x + 6, fenceY - 14);
      ctx.closePath();
      ctx.fill();

      // Post grain / highlight
      ctx.fillStyle = '#BC854C';
      ctx.fillRect(x + 1, fenceY - 13, 1.5, 30);
    }

    // 5. Rich Layered Trees Along Top with Trunks & Highlights
    const treeSpacing = 68;
    const treeCount = Math.floor(width / treeSpacing);

    for (let i = 0; i < treeCount; i++) {
      const bx = (width / (treeCount + 1)) * (i + 1);
      const by = 26;
      const seed = i * 17;

      // Ground shadow under tree
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.beginPath();
      ctx.ellipse(bx, by + 26, 18, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Detailed textured trunk with root flares
      ctx.fillStyle = '#4E342E';
      ctx.beginPath();
      ctx.moveTo(bx - 3.5, by + 12);
      ctx.lineTo(bx - 5, by + 25);
      ctx.lineTo(bx + 6, by + 25);
      ctx.lineTo(bx + 4, by + 12);
      ctx.closePath();
      ctx.fill();

      // Bark highlight line
      ctx.strokeStyle = '#6D4C41';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(bx - 1, by + 13);
      ctx.lineTo(bx - 2, by + 24);
      ctx.stroke();

      // Foliage Clusters per Season:
      // Autumn: vibrant amber, burnt orange, golden yellow, russet
      // Spring: fresh lime-green with pink blossoms
      // Summer: lush deep forest green
      // Winter: snowy pine or frost-covered boughs
      const clusters = [
        { dx: -9, dy: -4, r: 13 },
        { dx: 9, dy: -3, r: 13 },
        { dx: 0, dy: -12, r: 15 },
        { dx: -4, dy: 3, r: 11 },
        { dx: 5, dy: 4, r: 12 },
      ];

      // Palette definition
      let darkBase = '#1B5E20';
      let midLeaf = '#388E3C';
      let lightHighlight = '#66BB6A';

      if (season === 0) {
        // Spring: Fresh bright lime
        darkBase = '#2E7D32';
        midLeaf = '#4CAF50';
        lightHighlight = '#81C784';
      } else if (season === 1) {
        // Summer: Deep lush foliage
        darkBase = '#1B5E20';
        midLeaf = '#2E7D32';
        lightHighlight = '#43A047';
      } else if (season === 2) {
        // Autumn: Multicolored rich autumn tree
        const autVariants = [
          { d: '#BF360C', m: '#E65100', l: '#FF9800' }, // burnt orange
          { d: '#B71C1C', m: '#C62828', l: '#EF5350' }, // crimson
          { d: '#E65100', m: '#F57F17', l: '#FDD835' }, // golden amber
        ];
        const v = autVariants[i % autVariants.length];
        darkBase = v.d;
        midLeaf = v.m;
        lightHighlight = v.l;
      } else {
        // Winter: Snow-capped evergreen
        darkBase = '#263238';
        midLeaf = '#37474F';
        lightHighlight = '#ECEFF1';
      }

      // Draw dark foliage base
      ctx.fillStyle = darkBase;
      clusters.forEach((c) => {
        ctx.beginPath();
        ctx.arc(bx + c.dx, by + c.dy + 2, c.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw mid-tone foliage body
      ctx.fillStyle = midLeaf;
      clusters.forEach((c) => {
        ctx.beginPath();
        ctx.arc(bx + c.dx, by + c.dy, c.r * 0.9, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw sunlit highlights (from top-left)
      ctx.fillStyle = lightHighlight;
      clusters.forEach((c) => {
        ctx.beginPath();
        ctx.arc(bx + c.dx - c.r * 0.28, by + c.dy - c.r * 0.3, c.r * 0.45, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spring pink blossoms
      if (season === 0 && (seed % 2 === 0)) {
        ctx.fillStyle = '#F48FB1';
        for (let b = 0; b < 6; b++) {
          const fx = bx - 10 + ((b * 13) % 22);
          const fy = by - 12 + ((b * 17) % 18);
          ctx.beginPath();
          ctx.arc(fx, fy, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Winter snow cap on top of tree
      if (season === 3) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(bx, by - 16, 12, 4, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [season, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export const CropCanvas: React.FC<{
  crop: CropType;
  progress: number;
  wilted: boolean;
  size: number;
}> = ({ crop, progress, wilted, size }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size <= 0) return;
    const ctx = setupDprCanvas(canvas, size, size);
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);

    const stage = progress < 0.15 ? 0 : progress < 0.4 ? 1 : progress < 0.8 ? 2 : 3;
    const u = size / 100;

    // High contrast plant colors
    const healthyLeaf = '#2E7D32';
    const vibrantLeaf = '#43A047';
    const wiltedLeaf = '#9E8B52';
    const stemColor = wilted ? '#7D6F3E' : '#1B5E20';

    const positions = [
      { x: 0.28 * size, y: 0.36 * size },
      { x: 0.72 * size, y: 0.36 * size },
      { x: 0.28 * size, y: 0.72 * size },
      { x: 0.72 * size, y: 0.72 * size },
    ];

    positions.forEach((pos, idx) => {
      // 1. Seed Mound Stage (0)
      if (stage === 0) {
        // Soil mound shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(pos.x, pos.y + 2 * u, 5 * u, 2.5 * u, 0, 0, Math.PI * 2);
        ctx.fill();

        // Crumbly dark soil mound
        ctx.fillStyle = '#3E2723';
        ctx.beginPath();
        ctx.ellipse(pos.x, pos.y, 4.5 * u, 3 * u, 0, 0, Math.PI * 2);
        ctx.fill();

        // Seed peeking
        ctx.fillStyle = '#8D6E63';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y - 0.5 * u, 1.2 * u, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      // 2. Lettuce
      if (crop === 'lettuce') {
        const rads = [0, 7, 12, 16][stage] * u;
        const mainColor = wilted ? wiltedLeaf : '#43A047';
        const innerColor = wilted ? '#B3A369' : '#81C784';
        const coreColor = wilted ? '#C7B97F' : '#C8E6C9';

        // Outer ruffled lettuce leaves
        for (let k = 0; k < 6; k++) {
          const a = (k * Math.PI * 2) / 6;
          ctx.fillStyle = mainColor;
          ctx.beginPath();
          ctx.arc(
            pos.x + Math.cos(a) * rads * 0.55,
            pos.y + Math.sin(a) * rads * 0.45,
            rads * 0.52,
            0,
            Math.PI * 2
          );
          ctx.fill();
          // Leaf edge contrast stroke
          ctx.strokeStyle = wilted ? '#6B5E38' : '#1B5E20';
          ctx.lineWidth = 1 * u;
          ctx.stroke();
        }

        // Mid rosette ring
        for (let k = 0; k < 5; k++) {
          const a = (k * Math.PI * 2) / 5 + 0.3;
          ctx.fillStyle = innerColor;
          ctx.beginPath();
          ctx.arc(
            pos.x + Math.cos(a) * rads * 0.32,
            pos.y + Math.sin(a) * rads * 0.26,
            rads * 0.38,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // Crisp butterhead core
        ctx.fillStyle = coreColor;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, rads * 0.26, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      // 3. Stems & Leaves for Other Crops
      const stemH = [0, 11, 21, 28][stage] * u;
      const leafR = [0, 5, 7.5, 9][stage] * u;

      // Stem with crisp outline
      ctx.strokeStyle = stemColor;
      ctx.lineWidth = 2.4 * u;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(pos.x, pos.y - stemH);
      ctx.stroke();

      // Branching leaves
      ctx.fillStyle = wilted ? wiltedLeaf : vibrantLeaf;
      ctx.strokeStyle = wilted ? '#6B5E38' : '#1B5E20';
      ctx.lineWidth = 0.8 * u;

      // Left leaf
      ctx.beginPath();
      ctx.ellipse(pos.x - leafR * 0.9, pos.y - stemH * 0.55, leafR * 0.95, leafR * 0.48, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Right leaf
      ctx.beginPath();
      ctx.ellipse(pos.x + leafR * 0.9, pos.y - stemH * 0.7, leafR * 0.95, leafR * 0.48, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      const ripe = stage === 3;

      // 4. Fruit / Root Specifics
      switch (crop) {
        case 'carrot': {
          // Lush feathery carrot fronds at all stages
          ctx.strokeStyle = wilted ? wiltedLeaf : '#2E7D32';
          ctx.lineWidth = 1.2 * u;
          for (let f = -2; f <= 2; f++) {
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y - stemH);
            ctx.lineTo(pos.x + f * 4 * u, pos.y - stemH - 7 * u);
            ctx.stroke();
          }

          // Orange carrot shoulder emerging from soil
          if (stage >= 2) {
            const carrotW = (ripe ? 7.5 : 4.5) * u;
            const carrotH = (ripe ? 13 : 8) * u;
            // Orange root cone
            ctx.fillStyle = '#FF6F00';
            ctx.beginPath();
            ctx.moveTo(pos.x - carrotW / 2, pos.y);
            ctx.lineTo(pos.x + carrotW / 2, pos.y);
            ctx.lineTo(pos.x, pos.y + carrotH);
            ctx.closePath();
            ctx.fill();

            // Root ridges
            ctx.strokeStyle = '#E65100';
            ctx.lineWidth = 0.9 * u;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(pos.x - carrotW * 0.35, pos.y + 3 * u);
            ctx.lineTo(pos.x + carrotW * 0.35, pos.y + 3 * u);
            ctx.moveTo(pos.x - carrotW * 0.25, pos.y + 6 * u);
            ctx.lineTo(pos.x + carrotW * 0.25, pos.y + 6 * u);
            ctx.stroke();
          }
          break;
        }

        case 'tomato': {
          if (stage >= 2) {
            const tomatoCount = ripe ? 3 : 2;
            for (let t = 0; t < tomatoCount; t++) {
              const tx = pos.x + (t === 0 ? -leafR * 0.8 : t === 1 ? leafR * 0.8 : 0);
              const ty = pos.y - stemH * (t === 2 ? 0.35 : 0.55);
              const tr = (ripe ? 4.6 : 3.2) * u;

              // Tomato shadow
              ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
              ctx.beginPath();
              ctx.arc(tx, ty + 1 * u, tr, 0, Math.PI * 2);
              ctx.fill();

              // Tomato red berry (or unripe green)
              ctx.fillStyle = !ripe ? '#8BC34A' : '#E53935';
              ctx.beginPath();
              ctx.arc(tx, ty, tr, 0, Math.PI * 2);
              ctx.fill();

              // Specular shine
              if (ripe) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
                ctx.beginPath();
                ctx.arc(tx - tr * 0.35, ty - tr * 0.35, tr * 0.3, 0, Math.PI * 2);
                ctx.fill();
              }

              // Green star calyx crown on top
              ctx.fillStyle = '#1B5E20';
              ctx.beginPath();
              ctx.arc(tx, ty - tr * 0.9, 1.2 * u, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          break;
        }

        case 'corn': {
          if (stage >= 2) {
            // Plump golden corn cobs on stalk
            const cobW = (ripe ? 5.8 : 3.8) * u;
            const cobH = (ripe ? 14 : 9) * u;
            const cx = pos.x + leafR * 0.45;
            const cy = pos.y - stemH * 0.5;

            // Green husk
            ctx.fillStyle = wilted ? '#8D8156' : '#558B2F';
            ctx.beginPath();
            ctx.ellipse(cx, cy, cobW * 0.7, cobH * 0.55, 0.2, 0, Math.PI * 2);
            ctx.fill();

            // Golden yellow kernels
            ctx.fillStyle = ripe ? '#FFC107' : '#DCE775';
            ctx.beginPath();
            ctx.roundRect(cx - cobW * 0.45, cy - cobH * 0.45, cobW * 0.9, cobH * 0.9, 2 * u);
            ctx.fill();
            ctx.strokeStyle = '#FFA000';
            ctx.lineWidth = 0.8 * u;
            ctx.stroke();

            // Corn silk tuft on top
            if (ripe) {
              ctx.strokeStyle = '#8D6E63';
              ctx.lineWidth = 1 * u;
              ctx.beginPath();
              ctx.moveTo(cx, cy - cobH * 0.45);
              ctx.lineTo(cx + 2 * u, cy - cobH * 0.7);
              ctx.stroke();
            }
          }
          break;
        }

        case 'strawberry': {
          if (stage >= 2) {
            const berryCount = ripe ? 3 : 2;
            for (let b = 0; b < berryCount; b++) {
              const bx = pos.x + (b === 0 ? -leafR * 0.75 : b === 1 ? leafR * 0.75 : 0);
              const by = pos.y - stemH * (b === 2 ? 0.3 : 0.5);
              const bw = (ripe ? 4.2 : 2.8) * u;
              const bh = (ripe ? 5.8 : 3.8) * u;

              if (ripe) {
                // Heart/cone strawberry shape
                ctx.fillStyle = '#E91E63';
                ctx.beginPath();
                ctx.moveTo(bx - bw, by - bh * 0.3);
                ctx.quadraticCurveTo(bx - bw, by + bh * 0.5, bx, by + bh * 0.8);
                ctx.quadraticCurveTo(bx + bw, by + bh * 0.5, bx + bw, by - bh * 0.3);
                ctx.closePath();
                ctx.fill();

                // Tiny yellow seed speckles
                ctx.fillStyle = '#FFF59D';
                for (let s = -1; s <= 1; s++) {
                  ctx.fillRect(bx + s * 1.8 * u, by + (s * s) * 1.2 * u, 0.8 * u, 0.8 * u);
                }

                // Green serrated cap
                ctx.fillStyle = '#2E7D32';
                ctx.beginPath();
                ctx.arc(bx, by - bh * 0.3, 1.8 * u, 0, Math.PI * 2);
                ctx.fill();
              } else {
                // White blossom or green berry
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(bx, by, 3 * u, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#FDD835';
                ctx.beginPath();
                ctx.arc(bx, by, 1.2 * u, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
          break;
        }
      }
    });
  }, [crop, progress, wilted, size]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export const WeatherOverlay: React.FC<{
  weather: WeatherType;
  season: number;
  width: number;
  height: number;
}> = ({ weather, season, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animId: number;
    let t = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas || width <= 0 || height <= 0) return;
      const ctx = setupDprCanvas(canvas, width, height);
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);
      t = (t + 0.003) % 1.0;

      // Drifting clouds
      if (weather !== 'sunny') {
        ctx.fillStyle = `rgba(255, 255, 255, ${weather === 'rain' ? 0.35 : 0.22})`;
        for (let i = 0; i < 3; i++) {
          const x = (((i / 3 + t) % 1.0) * (width + 160)) - 80;
          const y = 24 + i * height * 0.28;
          ctx.beginPath();
          ctx.ellipse(x, y, 68, 22, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(x + 24, y - 7, 44, 18, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Rain / Snow
      if (weather === 'rain') {
        const isSnow = season === 3;
        ctx.fillStyle = isSnow ? '#FFFFFF' : 'rgba(120, 180, 240, 0.85)';
        ctx.strokeStyle = isSnow ? '#FFFFFF' : 'rgba(120, 180, 240, 0.85)';
        ctx.lineWidth = isSnow ? 2.5 : 1.6;
        ctx.lineCap = 'round';

        for (let i = 0; i < 60; i++) {
          const seed = i * 47;
          const x0 = (seed % width);
          const spd = isSnow ? 5 + (i % 4) : 22 + (i % 10);
          const y = (((seed / width) + t * spd) % 1.0) * height;

          if (isSnow) {
            ctx.beginPath();
            ctx.arc(x0 + Math.sin(y / 20 + i) * 5, y, 2.2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.moveTo(x0, y);
            ctx.lineTo(x0 - 3, y + 12);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [weather, season, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
};

export const DayNightOverlay: React.FC<{
  darkness: number;
  hour: number;
  width: number;
  height: number;
}> = ({ darkness, hour, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width <= 0 || height <= 0) return;
    const ctx = setupDprCanvas(canvas, width, height);
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    // Warm Sunset Glow between 17:00 and 20:00
    if (hour >= 17 && hour < 20) {
      ctx.fillStyle = 'rgba(255, 120, 30, 0.16)';
      ctx.fillRect(0, 0, width, height);
    }

    if (darkness <= 0.01) return;

    // Dark night blue overlay
    ctx.fillStyle = `rgba(10, 18, 55, ${darkness})`;
    ctx.fillRect(0, 0, width, height);

    if (darkness > 0.35) {
      const a = Math.min(1.0, Math.max(0, (darkness - 0.3) * 1.6));
      ctx.fillStyle = `rgba(255, 255, 255, ${a})`;

      // Stars
      for (let i = 0; i < 26; i++) {
        const sx = ((i * 83) % width);
        const sy = ((i * 47) % (height * 0.45));
        ctx.beginPath();
        ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Moon
      ctx.fillStyle = `rgba(255, 250, 220, ${a})`;
      ctx.beginPath();
      ctx.arc(width * 0.84, 24, 12, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [darkness, hour, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
    />
  );
};
