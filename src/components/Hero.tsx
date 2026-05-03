import { motion, useMotionValue, useTransform, useScroll } from 'motion/react';
import { useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';

const SplitText = ({ text, className, delayOffset = 0 }: { text: string; className?: string; delayOffset?: number }) => {
  return (
    <span className={`inline-flex overflow-hidden ${className || ''}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: delayOffset + index * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

export default function Hero({ onOpenVideo }: { onOpenVideo: () => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();
  const { language } = useLanguage();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Adjust translation constraints for parallax effect
  const bgX = useTransform(mouseX, [-1, 1], ['-1%', '1%']);
  const bgY = useTransform(mouseY, [-1, 1], ['-1%', '1%']);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Scroll-Fixed Wrapper for Parallax */}
      <motion.div
        className="absolute inset-x-0 top-0 h-screen w-full z-0 pointer-events-none"
        style={{ y: scrollY }}
      >
        {/* Background Image / Video wrapper with mouse parallax */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ x: bgX, y: bgY, scale: 1.05 }}
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 0.7 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          {/* High-quality macro video background representing modern industrial weaving */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://shenzhoujituan.oss-cn-beijing.aliyuncs.com/shouye.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for clean aesthetic and better white text contrast */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full pt-10">
        <h1 className="font-sans text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4 sm:mb-6 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 drop-shadow-lg">
          {language === 'zh' ? (
            <>
              <SplitText key="zh-1" text="织造全球" delayOffset={0.2} />
              <SplitText key="zh-2" text="智领未来" delayOffset={0.5} />
            </>
          ) : (
            <>
              <SplitText key="en-1" text="WEAVING THE FUTURE" delayOffset={0.2} />
            </>
          )}
        </h1>
        
        {language === 'zh' && (
          <motion.p
            className="font-sans text-xs sm:text-sm md:text-base text-white/70 max-w-2xl mt-2 font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            Weaving the Future, Connecting the World.
          </motion.p>
        )}
        
        <motion.p
          className="font-sans text-lg md:text-xl text-white/90 max-w-3xl mt-6 font-light tracking-wide drop-shadow-md"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          {language === 'zh' ? '从纤维研发到成衣智造，构筑全球整合度最高的产业平台。' : 'Building the world\'s most integrated industrial platform, from fiber R&D to apparel manufacturing.'}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-16"
        >
          <button
            onClick={onOpenVideo}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-zinc-900 transition-all hover:bg-brand hover:text-white"
          >
            <span className="relative z-10 flex items-center gap-2">
              {language === 'zh' ? '探索智造天地' : 'Explore Platform'}
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator overlay at bottom */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-white/50 text-[10px] tracking-[0.3em] font-mono uppercase">Scroll Down</span>
        <motion.div 
          className="w-[1px] h-12 border-l border-white/20 relative overflow-hidden"
        >
          <motion.div 
            className="w-full h-1/3 bg-white absolute top-0"
            animate={{ 
              top: ['-100%', '200%']
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
