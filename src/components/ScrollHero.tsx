"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  HAS_HERO_FRAMES,
  HAS_HERO_VIDEO,
  HERO_FRAME_COUNT,
  HERO_FRAME_PATH,
  HERO_VIDEO_URL,
} from "@/config/heroFrames";

const HERO_SCROLL_VH = 300;

function coverFit(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  const ir = img.width / img.height;
  const cr = w / h;
  let dw: number, dh: number, dx: number, dy: number;
  if (ir > cr) {
    dh = h;
    dw = h * ir;
    dx = (w - dw) / 2;
    dy = 0;
  } else {
    dw = w;
    dh = w / ir;
    dx = 0;
    dy = (h - dh) / 2;
  }
  ctx.drawImage(img, dx, dy, dw, dh);
}

export function ScrollHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const [framesReady, setFramesReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const reduceMotion = useReducedMotion();
  const useVideo = HAS_HERO_VIDEO && !reduceMotion && !HAS_HERO_FRAMES;

  const scrubVideo = useCallback(
    (progress: number) => {
      const video = videoRef.current;
      if (!video || !videoReady || !Number.isFinite(video.duration)) return;
      const target = progress * video.duration;
      if (Math.abs(video.currentTime - target) > 0.03) video.currentTime = target;
    },
    [videoReady],
  );

  const paint = useCallback(() => {
    if (useVideo) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#0F1110";
    ctx.fillRect(0, 0, w, h);

    const p = progressRef.current;
    if (HAS_HERO_FRAMES && framesReady && framesRef.current.length > 0) {
      const idx = Math.min(
        framesRef.current.length - 1,
        Math.max(0, Math.floor(p * (framesRef.current.length - 1))),
      );
      const img = framesRef.current[idx];
      if (img?.complete) coverFit(ctx, img, w, h);
    }
  }, [framesReady, useVideo]);

  useEffect(() => {
    if (useVideo || !HAS_HERO_FRAMES) {
      setFramesReady(true);
      return;
    }
    let cancelled = false;
    const load = async () => {
      const imgs: HTMLImageElement[] = [];
      for (let i = 1; i <= HERO_FRAME_COUNT; i += 1) {
        const img = new Image();
        img.src = HERO_FRAME_PATH(i);
        await new Promise<void>((res, rej) => {
          img.onload = () => res();
          img.onerror = () => rej();
        }).catch(() => undefined);
        if (cancelled) return;
        imgs.push(img);
      }
      framesRef.current = imgs.filter((x) => x.complete);
      if (!cancelled) setFramesReady(true);
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [useVideo]);

  useEffect(() => {
    const tick = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      progressRef.current = scrollable > 0 ? scrolled / scrollable : 0;
      if (useVideo) {
        scrubVideo(progressRef.current);
        return;
      }
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(paint);
    };

    const loop = () => {
      tick();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const onResize = () => {
      if (!useVideo) paint();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [paint, scrubVideo, useVideo]);

  useEffect(() => {
    if (!useVideo && framesReady) paint();
  }, [framesReady, paint, useVideo]);

  const overlayVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: { delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
        }),
      };

  return (
    <div ref={containerRef} className="relative" style={{ height: `${HERO_SCROLL_VH}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {useVideo ? (
          <video
            ref={videoRef}
            src={HERO_VIDEO_URL}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            aria-hidden
            onLoadedMetadata={() => setVideoReady(true)}
          />
        ) : (
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F1110] via-[#0F1110]/20 to-[#0F1110]/60" />

        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-28">
          <div className="mx-auto w-full max-w-5xl">
            <motion.p
              className="lurra-label"
              initial="hidden"
              animate="visible"
              custom={0}
              variants={overlayVariants}
            >
              Melbourne · Est. 2024
            </motion.p>
            <motion.h1
              className="lurra-display mt-5 text-6xl font-semibold tracking-tight text-lurra-cream sm:text-7xl md:text-[5.5rem] md:leading-[1.02]"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={overlayVariants}
            >
              Lurra Projects
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl text-lg leading-relaxed text-lurra-muted md:text-2xl md:leading-9"
              initial="hidden"
              animate="visible"
              custom={2}
              variants={overlayVariants}
            >
              Bespoke landscape design and garden construction for discerning Melbourne homes — where architecture, planting, and craftsmanship meet in quiet perfection.
            </motion.p>
            <motion.div
              className="pointer-events-auto mt-10 flex flex-wrap gap-4"
              initial="hidden"
              animate="visible"
              custom={3}
              variants={overlayVariants}
            >
              <a href="#contact" className="lurra-btn-primary">
                Begin Your Project
              </a>
              <a href="tel:0400810107" className="lurra-btn-secondary">
                Speak with Lachie
              </a>
            </motion.div>
            <motion.p
              className="mt-8 font-sans text-xs tracking-wide text-lurra-muted/80"
              initial="hidden"
              animate="visible"
              custom={4}
              variants={overlayVariants}
            >
              Scroll — step from home into your garden
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}