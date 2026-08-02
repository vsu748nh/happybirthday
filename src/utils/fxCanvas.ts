import confetti from 'canvas-confetti';

/**
 * FX Canvas System
 * Handles stars, floating hearts, aurora wave, fireworks, confetti, and sparkles.
 */

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  rotation?: number;
  vRot?: number;
}

export class ParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animId: number | null = null;
  private stars: Array<{ x: number; y: number; size: number; alpha: number; speed: number }> = [];
  private hearts: Particle[] = [];
  private fireworks: Particle[] = [];
  private width: number = 0;
  private height: number = 0;
  private auroraOffset: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get canvas context');
    this.ctx = context;

    this.resize();
    this.initStars();
    window.addEventListener('resize', this.resize.bind(this));
  }

  public resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  private initStars() {
    this.stars = [];
    const count = Math.min(120, Math.floor((this.width * this.height) / 8000));
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 0.8,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
      });
    }
  }

  public addFloatingHeart(x?: number, y?: number) {
    const px = x ?? Math.random() * this.width;
    const py = y ?? this.height + 20;
    const colors = ['#FF6090', '#FF80AB', '#FF4081', '#E040FB', '#FFD700', '#F8BBD0'];

    this.hearts.push({
      x: px,
      y: py,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -(Math.random() * 2 + 1),
      size: Math.random() * 16 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      life: 0,
      maxLife: Math.random() * 180 + 120,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.04,
    });
  }

  public triggerFireworks(count: number = 3) {
    for (let f = 0; f < count; f++) {
      setTimeout(() => {
        const cx = Math.random() * (this.width * 0.8) + this.width * 0.1;
        const cy = Math.random() * (this.height * 0.5) + this.height * 0.1;
        const colors = ['#FF4081', '#FFD700', '#00E5FF', '#E040FB', '#76FF03', '#FF9100', '#FFFFFF'];

        for (let i = 0; i < 60; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6 + 1;
          this.fireworks.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 3 + 1.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            life: 0,
            maxLife: Math.random() * 60 + 40,
          });
        }
      }, f * 250);
    }
  }

  public start() {
    if (this.animId) return;

    const loop = () => {
      this.render();
      this.animId = requestAnimationFrame(loop);
    };
    loop();
  }

  public stop() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  private drawAurora() {
    this.auroraOffset += 0.005;
    const grad = this.ctx.createLinearGradient(0, 0, this.width, this.height);
    
    // Soft pastel aurora shift
    const r1 = Math.sin(this.auroraOffset) * 20 + 240;
    const g1 = Math.cos(this.auroraOffset * 0.8) * 20 + 200;
    const b1 = Math.sin(this.auroraOffset * 0.5) * 20 + 230;

    grad.addColorStop(0, `rgba(${Math.floor(r1)}, ${Math.floor(g1)}, ${Math.floor(b1)}, 0.15)`);
    grad.addColorStop(0.5, `rgba(230, 200, 250, 0.1)`);
    grad.addColorStop(1, `rgba(255, 230, 240, 0.15)`);

    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  private render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Aurora wave
    this.drawAurora();

    // Draw Stars
    this.stars.forEach((star) => {
      star.alpha += star.speed;
      if (star.alpha > 1 || star.alpha < 0.1) {
        star.speed = -star.speed;
      }
      this.ctx.fillStyle = `rgba(255, 255, 240, ${Math.abs(star.alpha)})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // Spawn random floating hearts occasionally
    if (Math.random() < 0.03 && this.hearts.length < 25) {
      this.addFloatingHeart();
    }

    // Update & Draw Floating Hearts
    for (let i = this.hearts.length - 1; i >= 0; i--) {
      const h = this.hearts[i];
      h.life++;
      h.x += h.vx + Math.sin(h.life * 0.05) * 0.5;
      h.y += h.vy;
      if (h.rotation !== undefined && h.vRot !== undefined) {
        h.rotation += h.vRot;
      }
      h.alpha = 1 - h.life / h.maxLife;

      if (h.alpha <= 0 || h.y < -30) {
        this.hearts.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(h.x, h.y);
      if (h.rotation) this.ctx.rotate(h.rotation);
      this.ctx.globalAlpha = Math.max(0, h.alpha);
      this.ctx.fillStyle = h.color;

      // Draw heart path
      const s = h.size / 16;
      this.ctx.beginPath();
      this.ctx.moveTo(0 * s, -3 * s);
      this.ctx.bezierCurveTo(-5 * s, -12 * s, -15 * s, -3 * s, 0 * s, 10 * s);
      this.ctx.bezierCurveTo(15 * s, -3 * s, 5 * s, -12 * s, 0 * s, -3 * s);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Update & Draw Fireworks Particles
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      const fw = this.fireworks[i];
      fw.life++;
      fw.x += fw.vx;
      fw.y += fw.vy + 0.08; // gravity
      fw.vx *= 0.98;
      fw.vy *= 0.98;
      fw.alpha = 1 - fw.life / fw.maxLife;

      if (fw.alpha <= 0) {
        this.fireworks.splice(i, 1);
        continue;
      }

      this.ctx.fillStyle = fw.color;
      this.ctx.globalAlpha = Math.max(0, fw.alpha);
      this.ctx.beginPath();
      this.ctx.arc(fw.x, fw.y, fw.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    }
  }

  public destroy() {
    this.stop();
    window.removeEventListener('resize', this.resize.bind(this));
  }
}

// Helper to launch high quality Canvas Confetti
export function launchConfetti() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FF80AB', '#FFD700', '#E040FB', '#00E5FF', '#FFFFFF'],
  });
}

export function launchGrandConfettiShower() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const interval: ReturnType<typeof setInterval> = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
