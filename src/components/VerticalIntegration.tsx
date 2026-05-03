import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Network, Droplets, ShieldCheck, Scissors, Globe } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const steps = [
  { 
    id: '01', 
    title: '纤维研发 | 源头创新', 
    titleEn: 'FIBER R&D | SOURCE INNOVATION',
    en: 'RESEARCH', 
    desc: '我们从分子级维度开启服饰革命，通过 3D 虚拟样衣与材质数据库的底层打通，实现面料性能的数字孪生。在这里，创新不止于构想，而是重塑万亿产业革新的起点。',
    descEn: 'We start the apparel revolution at the molecular level, bridging 3D virtual sampling with our material database to achieve digital twins of fabric performance. Innovation here is the starting point of reshaping a trillion-dollar industry.',
    highlight: '1,000+ 年度研发专利',
    highlightEn: '1,000+ Annual Patents',
    tag: 'Innovation',
    Icon: Network,
  },
  { 
    id: '02', 
    title: '织造印染 | 绿色工业', 
    titleEn: 'KNITTING & DYEING | GREEN INDUSTRY',
    en: 'DYEING', 
    desc: '依托全球整合度最高的产业平台，我们在每一寸织物的经纬间把控细节。人工智能充当工厂大脑，实时监控每一滴染料的配比与每一根纱线的张力，确保极致的工艺精度。',
    descEn: 'Relying on the highest global integration platform, we control details in every inch of fabric. AI acts as our factory brain, monitoring dye formulas and yarn tension to ensure perfect precision.',
    highlight: '70% 中水回用率',
    highlightEn: '70% Water Recycling',
    tag: 'Eco-Friendly',
    Icon: Droplets,
  },
  { 
    id: '03', 
    title: '面料后整理 | 性能赋能', 
    titleEn: 'FABRIC FINISHING | PERFORMANCE',
    en: 'FINISHING', 
    desc: '利用尖端数字化技术，赋予面料恒温、亲肤、高强韧等未来特性。这是我们从顶尖制造向科技引领跨越的关键，让科技感知每一寸肌肤的真实诉求。',
    descEn: 'Using cutting-edge digital tech, we give fabrics future traits like thermal control, skin-friendliness, and high strength. This is our leap from top manufacturing to tech leadership.',
    highlight: 'UPF 50+ 极致防护指标',
    highlightEn: 'UPF 50+ Protection',
    tag: 'Performance',
    Icon: ShieldCheck,
  },
  { 
    id: '04', 
    title: '印花刺绣 | 精工美学', 
    titleEn: 'PRINTING & EMBROIDERY | CRAFTSMANSHIP',
    en: 'EMBROIDERY', 
    desc: '智能机械化为产业臂膀，将复杂的创意蓝图精准还原于服饰之上。大数据构筑的核心系统，确保全球范围内每一件成品的视觉高度统一，赢得全球顶尖品牌的长期信赖。',
    descEn: 'Smart mechanics serve as our industrial arms, recreating complex creative blueprints accurately onto garments. Our core big data system ensures high visual unification worldwide.',
    highlight: '0.1mm 级针迹精准度',
    highlightEn: '0.1mm Stitch Precision',
    tag: 'Precision',
    Icon: Scissors,
  },
  { 
    id: '05', 
    title: '成衣制造 | 智造闭环', 
    titleEn: 'GARMENT MFG | SMART LOOP',
    en: 'APPAREL', 
    desc: '我们每年将超六亿件融合了数字智能与卓越运营模式的服饰，精准交付至消费者手中。我们正处在关键转折点，以科技引领下一轮跨越，诚邀您携手并肩，共启行业崭新时代。',
    descEn: 'Every year, we deliver over 600 million smart-manufactured garments to consumers. We are at a turning point, using technology to lead the next leap in the apparel industry.',
    highlight: '6 亿件 年产规模',
    highlightEn: '600M Annual Capacity',
    tag: 'Global Supply',
    Icon: Globe,
  },
];

// Helper to determine which section is currently active
function useActiveIndex(progress: number, total: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    // Math to determine which step is currently closest to center
    const index = Math.round(progress * (total - 1));
    setActiveIndex(index);
  }, [progress, total]);
  return activeIndex;
}

export default function VerticalIntegration() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'] // container is h-[500vh]
  });

  const [progress, setProgress] = useState(0);
  
  // Track scrollYProgress in state for reactive updates in standard components if needed
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', v => setProgress(v));
    return () => unsubscribe();
  }, [scrollYProgress]);

  const activeIndex = useActiveIndex(progress, steps.length);

  // Foreground fast scroll (moves the 5 screens)
  const fgX = useTransform(scrollYProgress, [0, 1], ['5vw', '-355vw']);
  // Background slow scroll (parallax)
  const bgX = useTransform(scrollYProgress, [0, 1], ['5vw', '-150vw']);
  // Beam fast moving
  const beamX = useTransform(scrollYProgress, [0, 1], ['-200px', '100vw']);

  const [isHovered, setIsHovered] = useState<string | null>(null);

  // Dynamic visual render based on step index
  const renderVisual = (idx: number) => {
    const isActive = activeIndex === idx;
    
    // Array of photos for each step
    const photos = [
      "/research.jpg",
      "/dyeing.jpg",
      "/finishing.jpg",
      "/embroidery.jpg",
      "/apparel.jpg"
    ];

    const altTexts = ["Weaving", "Dyeing", "Finishing", "Cutting", "Sewing"];

    return (
      <div className="relative w-full h-full bg-zinc-900 overflow-hidden transition-shadow duration-500">
          <img 
            src={photos[idx]} 
            alt={altTexts[idx]} 
            className={`w-full h-full object-cover opacity-90`} 
          />
          <div className="absolute inset-0 bg-[#027357]/10 mix-blend-overlay" />
      </div>
    );
  };

  return (
    <div className="relative bg-white text-zinc-900 border-t border-zinc-100">
      {/* Unified Sticky Background */}
      <div className="sticky top-0 h-screen w-full pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: "url('/bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.05
          }}
        />
      </div>

      {/* Content wrapper overlapping the sticky background */}
      <div className="-mt-[100vh] relative z-10 block">
        {/* Mobile Title Section (Independent of the scroll-lock area) */}
        <section className="pt-24 pb-12 px-4 relative z-10 xl:hidden" id="integration-mobile">
          <div className="flex flex-col items-center relative z-10">
          <motion.h2 
            className="text-4xl font-bold tracking-tight text-zinc-900 mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {language === 'zh' ? (
               <>纵向一体化：<span className="text-[#027357]">绿色智能制造</span>的极致效能</>
            ) : (
               <>VERTICAL INTEGRATION: <span className="text-[#027357]">GREEN SMART MANUFACTURING</span></>
            )}
          </motion.h2>
          {language === 'zh' && (
            <motion.p 
              className="text-xl text-zinc-500 font-light tracking-wide text-center uppercase mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              The Power of Vertical Integration
            </motion.p>
          )}
          <motion.p 
            className={`text-lg md:text-xl text-zinc-600 font-light tracking-wide text-center mt-6 lg:mt-8 leading-relaxed px-4 md:px-0 ${language === 'zh' ? 'max-w-3xl' : 'max-w-4xl lg:max-w-5xl'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {language === 'zh' ? '我们构筑起全球产业链整合度最高、综合实力顶尖的产业平台。申洲国际坚守品质、锐意创新，精耕每一道工序、把控每一处细节。' : 'We have built an industrial platform with the highest level of global supply chain integration and top-tier comprehensive strength. Shenzhou International insists on quality and innovation, refining every process and controlling every detail.'}
          </motion.p>
        </div>
      </section>

      {/* Height 500vh ensures we have 5 times the viewport height to scroll through */}
      <section ref={containerRef} className="relative h-[500vh]">
        {/* Sticky container stays in place while scrolling */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pt-16 xl:pt-[10vh] pb-8 xl:pb-[4vh] relative">
          
          {/* Desktop Title */}
          <div className="hidden xl:flex flex-col items-center pointer-events-none px-4 shrink-0 z-20 mb-4 2xl:mb-8 relative" id="integration-desktop">
            <h2 className="text-5xl 2xl:text-6xl font-bold tracking-tight text-zinc-900 mb-2 2xl:mb-4 text-center drop-shadow-sm">
              {language === 'zh' ? (
                 <>纵向一体化：<span className="text-[#027357]">绿色智能制造</span>的极致效能</>
              ) : (
                 <>VERTICAL INTEGRATION: <span className="text-[#027357]">GREEN SMART MANUFACTURING</span></>
              )}
            </h2>
            {language === 'zh' && (
              <p className="text-xl text-zinc-500 font-light tracking-wide text-center uppercase drop-shadow-sm mt-2">
                The Power of Vertical Integration
              </p>
            )}
            <p className={`text-xl text-zinc-600 font-light tracking-wide text-center mt-6 2xl:mt-8 drop-shadow-sm leading-relaxed ${language === 'zh' ? 'max-w-3xl' : 'max-w-4xl lg:max-w-5xl'}`}>
              {language === 'zh' ? '我们构筑起全球产业链整合度最高、综合实力顶尖的产业平台。申洲国际坚守品质、锐意创新，精耕每一道工序、把控每一处细节。' : 'We have built an industrial platform with the highest level of global supply chain integration and top-tier comprehensive strength. Shenzhou International insists on quality and innovation, refining every process and controlling every detail.'}
            </p>
          </div>

          {/* Scrolling Area Container */}
          <div className="relative flex-1 min-h-0 w-full overflow-hidden">
            {/* Background Parallax Words */}
            <motion.div style={{ x: bgX }} className="absolute inset-0 flex items-start md:items-center xl:items-start pointer-events-none z-0">
              {steps.map(step => (
                <div key={`bg-${step.id}`} className="w-[90vw] shrink-0 text-center flex justify-center items-start md:items-center xl:items-start h-full px-4 pt-4 md:pt-0 xl:pt-12">
                  <span className="text-[14vw] sm:text-[18vw] md:text-[22vw] lg:text-[24vw] xl:text-[18vw] font-black text-[#027357] opacity-[0.06] select-none tracking-tighter leading-none whitespace-nowrap transform md:-translate-y-1/4 xl:translate-y-0">
                    {step.en}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Dynamic Foreground Track Line */}
            <div className="absolute top-[50%] left-0 right-0 h-px bg-zinc-200 z-0 opacity-50" />
            {/* The 200px Green Beam moving across */}
            <motion.div 
                className="absolute top-[50%] left-0 h-[2px] w-[200px] bg-[#027357] z-0 shadow-[0_0_15px_rgba(2,115,87,0.5)] -translate-y-[1px]"
                style={{ x: beamX }}
            />

            {/* Foreground Content */}
            <motion.div style={{ x: fgX }} className="absolute inset-0 flex items-center z-10 pointer-events-none">
            {steps.map((step, idx) => {
              const isActive = activeIndex === idx;
              const Icon = step.Icon;
              
              return (
                <div key={step.id} className="w-[85vw] md:w-[90vw] shrink-0 h-full flex flex-col justify-center items-center px-4 md:px-8 pointer-events-auto">
                  <div 
                    className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-0 items-center group cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-500 bg-white"
                    onMouseEnter={() => setIsHovered(step.id)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    {/* Left: Content Block */}
                    <div className="h-[280px] sm:h-[350px] md:h-[400px] lg:h-[660px] bg-white transition-all duration-500 p-6 md:p-12 lg:p-20 flex flex-col relative overflow-hidden">
                       {/* "Breathing" glow effect triggered on center/hover */}
                       <div className={`absolute -inset-px transition-all duration-1000 
                         ${isActive || isHovered === step.id ? 'bg-zinc-50/80' : 'bg-transparent'} -z-10`} 
                       />
                       
                       {/* Large transparent number background - superimposed under title */}
                       <div className="absolute top-2 md:top-4 lg:top-8 left-6 md:left-12 text-[100px] md:text-[140px] lg:text-[240px] font-black text-black/[0.04] group-hover:text-black/[0.06] transition-colors duration-500 leading-none pointer-events-none select-none z-0">
                           {step.id}
                       </div>
  
                       <div className="relative z-10 flex flex-col h-full mt-12 sm:mt-16 md:mt-24 lg:mt-32 pt-2 md:pt-4 transition-colors duration-500">
                           <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-zinc-900 tracking-tight mb-2 md:mb-4 lg:mb-6 transition-colors duration-300">
                             {language === 'zh' ? step.title : step.titleEn}
                           </h3>
  
                           <div className="mb-2 md:mb-4 lg:mb-6 flex items-center flex-wrap gap-2 lg:gap-4">
                              <span className="text-[#027357] font-medium text-sm md:text-base lg:text-xl">
                                {language === 'zh' ? step.highlight : step.highlightEn}
                              </span>
                              {step.tag && (
                                <span className="px-2 py-0.5 lg:py-1 lg:px-3 bg-[#027357] text-white text-[10px] lg:text-xs font-bold tracking-wider uppercase rounded-sm">
                                  {step.tag}
                                </span>
                              )}
                           </div>
  
                           <p className="text-zinc-500 text-xs sm:text-sm md:text-lg lg:text-xl leading-relaxed font-light flex-1 mb-4 md:mb-6 lg:mb-12">
                              {language === 'zh' ? step.desc : step.descEn}
                           </p>
  
                           <div className="flex items-center text-xs md:text-sm font-medium tracking-widest uppercase text-zinc-400 group-hover:text-[#027357] transition-colors gap-3 mt-auto">
                             <span>{language === 'zh' ? 'Explore' : 'Explore'}</span>
                             <div className="h-[1px] bg-zinc-300 group-hover:bg-[#027357] transition-all duration-500 w-6 group-hover:w-16" />
                           </div>
                       </div>
                    </div>
  
                    {/* Right: Visual Window */}
                    <div className="h-[200px] md:h-[400px] lg:h-[660px] relative overflow-hidden"
                    >
                       {renderVisual(idx)}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
          </div>

          {/* Dynamic Scroll Progress Bar placed inside sticky container bottom */}
          <motion.div 
             className="absolute bottom-0 left-0 right-0 h-1 bg-[#027357] z-50 origin-left"
             style={{ scaleX: scrollYProgress }}
          />
        </div>
      </section>
      </div> {/* End content wrapper */}
    </div>
  );
}
