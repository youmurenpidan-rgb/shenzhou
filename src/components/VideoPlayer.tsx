import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, RotateCcw, RotateCw, Maximize, Minimize } from 'lucide-react';

export default function VideoPlayer({ isOpen, onClose, videoSrc }: { isOpen: boolean; onClose: () => void; videoSrc: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const resetControlsTimeout = () => {
      setIsControlsVisible(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
          setIsControlsVisible(false);
      }, 3000);
  };

  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
        resetControlsTimeout();
    } else {
        document.body.style.overflow = 'unset';
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    }
  }, [isOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      resetControlsTimeout();
      const rect = e.currentTarget.getBoundingClientRect();
      const isBottom = rect.bottom - e.clientY <= 80;
      if (isBottom) {
          if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
          setIsControlsVisible(true);
      }
  };

  const handleMouseLeave = () => {
      resetControlsTimeout();
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
      if (videoRef.current) {
          setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
      }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const seekValue = parseFloat(e.target.value);
      if (videoRef.current) {
          videoRef.current.currentTime = (seekValue / 100) * videoRef.current.duration;
          setProgress(seekValue);
      }
  };

  const skip = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += time;
    }
  };

  const toggleFullscreen = () => {
      if (!isFullscreen) {
          playerRef.current?.requestFullscreen();
      } else {
          document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
     {isOpen && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
      >
        <motion.div 
            ref={playerRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`relative w-full max-w-4xl bg-black overflow-hidden shadow-2xl ${isControlsVisible ? 'cursor-default' : 'cursor-none'}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white hover:text-brand transition-colors">
            <X size={28} />
            </button>
            <video ref={videoRef} src={videoSrc} className="w-full" onTimeUpdate={handleTimeUpdate}/>
            
            <AnimatePresence>
                {isControlsVisible && (
                    <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="absolute bottom-0 left-0 right-0 p-4 bg-zinc-900/80"
                    >
                        <input type="range" min="0" max="100" value={progress} onChange={handleSeek} className="w-full h-2 mb-4 accent-brand cursor-pointer" />
                        <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-4">
                                <button onClick={() => skip(-10)}><RotateCcw size={20}/></button>
                                <button onClick={togglePlay}>{isPlaying ? <Pause size={24} /> : <Play size={24} />}</button>
                                <button onClick={() => skip(10)}><RotateCw size={20}/></button>
                            </div>
                            <button onClick={toggleFullscreen}>{isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
      </motion.div>
     )}
    </AnimatePresence>
  );
}
