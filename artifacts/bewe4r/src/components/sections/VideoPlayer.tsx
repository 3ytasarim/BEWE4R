import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  src: string;
  poster?: string;
  label?: string;
};

function fmt(t: number) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VideoPlayer({ src, poster, label = "Studio · Live" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [hover, setHover] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Only load the heavy video file when the player is near viewport
  useEffect(() => {
    const w = wrapRef.current;
    if (!w) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(w);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      setCurrent(v.currentTime);
      setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    };
    const onMeta = () => {
      setDuration(v.duration);
      setLoaded(true);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    const onFs = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    const w = wrapRef.current;
    if (!w) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else w.requestFullscreen?.();
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = Math.max(0, Math.min(1, ratio)) * v.duration;
  };

  return (
    <div
      ref={wrapRef}
      className="relative w-full aspect-video bg-black border border-white/10 overflow-hidden group/player"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-testid="video-player"
    >
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="flex items-center gap-3">
            <span className="block w-2 h-2 bg-white/60 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-mono">
              Loading
            </span>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onClick={togglePlay}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        data-testid="video-element"
      />

      {/* Top-left LIVE badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/15 pointer-events-none"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        <span className="text-[9px] tracking-[0.4em] uppercase text-white font-mono">
          {label}
        </span>
      </motion.div>

      {/* Top-right timecode */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/15 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.2em] text-white/80 font-mono">
          {fmt(current)} / {fmt(duration)}
        </span>
      </motion.div>

      {/* Center play/pause overlay — visible when paused or on hover */}
      <AnimatePresence>
        {(!playing || hover) && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            data-testid="video-play-toggle"
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <span className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
            <span className="relative w-20 h-20 md:w-24 md:h-24 border border-white/40 bg-black/50 backdrop-blur-md flex items-center justify-center group-hover/player:border-white transition-colors">
              {playing ? (
                <span className="flex gap-2">
                  <span className="block w-1.5 h-8 bg-white" />
                  <span className="block w-1.5 h-8 bg-white" />
                </span>
              ) : (
                <span className="block w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1.5" />
              )}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom control bar — slides up on hover */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={hover || !playing ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 bottom-0 z-20 px-4 pb-3 pt-10 bg-gradient-to-t from-black via-black/70 to-transparent"
      >
        {/* Progress bar */}
        <div
          className="relative h-1 bg-white/15 cursor-pointer group/bar mb-3 hover:h-1.5 transition-all"
          onClick={seek}
          data-testid="video-seek"
        >
          <div
            className="absolute inset-y-0 left-0 bg-white"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white opacity-0 group-hover/bar:opacity-100 transition-opacity -translate-x-1/2"
            style={{ left: `${progress}%` }}
          />
          {/* Buffer shimmer */}
          <span className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse pointer-events-none" />
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-4">
          {/* Play / Pause */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="w-7 h-7 flex items-center justify-center text-white hover:scale-110 transition-transform"
            data-testid="video-control-play"
          >
            {playing ? (
              <span className="flex gap-[3px]">
                <span className="block w-[3px] h-3.5 bg-white" />
                <span className="block w-[3px] h-3.5 bg-white" />
              </span>
            ) : (
              <span className="block w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent" />
            )}
          </button>

          {/* Mute */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="w-7 h-7 flex items-center justify-center text-white hover:scale-110 transition-transform"
            data-testid="video-control-mute"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
              <path d="M3 10v4h4l5 4V6L7 10H3z" strokeLinejoin="round" />
              {muted ? (
                <>
                  <path d="M16 9l5 5M21 9l-5 5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <path d="M16 8a5 5 0 010 8" strokeLinecap="round" />
                  <path d="M19 5a9 9 0 010 14" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>

          {/* Timecode (bottom) */}
          <span className="text-[10px] tracking-[0.2em] text-white/70 font-mono">
            {fmt(current)} <span className="text-white/30">/</span> {fmt(duration)}
          </span>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Quality badge */}
          <span className="hidden md:inline text-[9px] tracking-[0.3em] uppercase text-white/50 font-mono border border-white/20 px-2 py-0.5">
            HD
          </span>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
            className="w-7 h-7 flex items-center justify-center text-white hover:scale-110 transition-transform"
            data-testid="video-control-fullscreen"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
              {fullscreen ? (
                <>
                  <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" strokeLinecap="round" strokeLinejoin="round" />
                </>
              ) : (
                <>
                  <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-transparent to-black/40 z-10" />

      {/* Corner cut accents */}
      <span className="absolute top-2 left-2 w-3 h-3 border-l border-t border-white/40 pointer-events-none z-20" />
      <span className="absolute top-2 right-2 w-3 h-3 border-r border-t border-white/40 pointer-events-none z-20" />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-white/40 pointer-events-none z-20" />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-white/40 pointer-events-none z-20" />
    </div>
  );
}
