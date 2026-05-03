import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { ComposableMap, Geographies, Geography, Marker, Line, Graticule, ZoomableGroup } from 'react-simple-maps';
import { useLanguage } from '../lib/LanguageContext';

function Counter({ from, to, duration, format }: { from: number; to: number; duration: number, format?: (val: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView && ref.current) {
      // Non-linear jump easing (Easing Counter)
      animate(from, to, {
        duration,
        ease: [0.16, 1, 0.3, 1], // custom spring-like easeOut
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = format ? format(value) : (value % 1 === 0 ? Math.round(value).toString() : value.toFixed(1));
          }
        }
      });
      // Add slight dynamic blur effect
      animate(4, 0, {
        duration: duration * 0.8,
        ease: "easeOut",
        onUpdate(value) {
           if (ref.current) {
             ref.current.style.filter = `blur(${value}px)`;
           }
        }
      });
    }
  }, [from, to, duration, inView, format]);

  return <span ref={ref} className="will-change-[filter,content]" />;
}

const statsData = [
  { label: '年产成衣产能', labelEn: 'Annual Apparel Capacity', value: 6, suffix: '亿+ 件', suffixEn: '00M+ Pcs', duration: 2.5 },
  { label: '全球员工规模', labelEn: 'Global Employees', value: 10, suffix: '万+ 人', suffixEn: '0K+', duration: 2.8 },
  { label: '核心生产基地（中、越、柬）', labelEn: 'Core Bases (CN, VN, KH)', value: 3, suffix: '大', suffixEn: '', duration: 2.2 },
  { label: '面料年产值', labelEn: 'Annual Fabric Output', value: 25, suffix: '万+ 吨', suffixEn: '0K+ Tons', duration: 2.0 },
];

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const bases = [
  {
    id: "china",
    name: "中国基地",
    nameEn: "China Base",
    coordinates: [121.5, 29.8] as [number, number],
    desc: "集团总部核心 | 全球产能调度指挥中心",
    descEn: "Group HQ | Global Dispatch Center",
  },
  {
    id: "vietnam",
    name: "越南基地",
    nameEn: "Vietnam Base",
    coordinates: [106.6, 10.7] as [number, number],
    desc: "自动化水平 80%+ | 垂直一体化闭环",
    descEn: "80%+ Automated | Closed-loop Integration",
  },
  {
    id: "cambodia",
    name: "柬埔寨基地",
    nameEn: "Cambodia Base",
    coordinates: [104.9, 11.5] as [number, number],
    desc: "高效产能中心 | 响应东南亚柔性供应链",
    descEn: "High-Efficiency Center | Agile Supply Chain",
  }
];

// Connections from China to other bases and global partners
const lines = [
  { from: [121.5, 29.8] as [number, number], to: [106.6, 10.7] as [number, number] }, // China to Vietnam
  { from: [121.5, 29.8] as [number, number], to: [104.9, 11.5] as [number, number] }, // China to Cambodia
  { from: [121.5, 29.8] as [number, number], to: [139.6, 35.6] as [number, number] }, // China to Japan
  { from: [121.5, 29.8] as [number, number], to: [151.2, -33.8] as [number, number] }, // China to Australia
  { from: [121.5, 29.8] as [number, number], to: [-118.2, 34.0] as [number, number] }, // China to US West
  { from: [121.5, 29.8] as [number, number], to: [2.3, 48.8] as [number, number] },   // China to Europe
];

export default function Stats() {
  const { language } = useLanguage();
  const [hoveredBase, setHoveredBase] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scale-in Rotation for Globe (Scroll bound)
  const globeScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.6]);
  const globeRotateZ = useTransform(scrollYProgress, [0, 1], [15, -15]);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Background displacement (Ratio 0.05)
  const bgTranslateX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const bgTranslateY = useTransform(springY, [-0.5, 0.5], [20, -20]);

  // Data Layer displacement (Ratio 0.2)
  const dataTranslateX = useTransform(springX, [-0.5, 0.5], [-80, 80]);
  const dataTranslateY = useTransform(springY, [-0.5, 0.5], [-80, 80]);

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  // Tilt Effect for specific Info Overlay
  const overlayRotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const overlayRotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef} 
      id="stats" 
      className="relative bg-[#0d0d0d] z-20 overflow-hidden flex flex-col items-center pt-24 md:pt-32 pb-24 md:pb-48"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 z-0 pointer-events-none text-white perspective-[1500px]">
        {/* Deep Space / Grid Background Layer */}
        <motion.div 
          className="sticky top-0 w-full h-screen opacity-40 mix-blend-screen"
          style={{ 
            x: bgTranslateX, y: bgTranslateY,
            backgroundImage: 'radial-gradient(ellipse at center, rgba(161,161,170,0.15) 0%, transparent 60%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '100% 100%, 40px 40px, 40px 40px'
          }}
        />

        {/* Middle Layer (Globe Layer) */}
        <motion.div 
          className="sticky top-0 w-full h-screen -mt-[100vh] flex items-center justify-center transform-gpu pointer-events-auto cursor-crosshair"
          style={{ rotateX, rotateY, scale: globeScale, rotateZ: globeRotateZ, perspective: 1200 }}
        >
          <ComposableMap
            projection="geoOrthographic"
            projectionConfig={{
              rotate: [-110, -20, 0], // Center on East Asia
              scale: 525
            }}
            width={1200}
            height={800}
            className="w-full h-full max-w-[1200px] drop-shadow-[0_0_25px_rgba(212,212,216,0.3)]"
          >
            {/* Parallax Zoom and Pan Wrapper */}
            <ZoomableGroup zoom={1} center={[0, 0]} maxZoom={1.5} filterZoomEvent={() => false}>
              
              {/* Digital Twin Traces (Graticule) */}
              <Graticule stroke="rgba(255,255,255,0.05)" strokeWidth={0.5} strokeDasharray="4 4" />

              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#121212"
                      stroke="#52525b"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#1a1a1a", outline: "none", transition: "all 0.3s" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Data Growth: Flow Lines */}
              {lines.map((line, idx) => (
                <Line
                  key={`line-${idx}`}
                  from={line.from}
                  to={line.to}
                  stroke="#027357"
                  strokeWidth={isInView ? 1.5 : 0}
                  strokeLinecap="round"
                  className="transition-all duration-1000 origin-center"
                  style={{
                    strokeDasharray: "10 5",
                    animation: "dash 3s linear infinite",
                    opacity: isInView ? (hoveredBase ? 0.3 : 0.6) : 0,
                    transitionDelay: `${idx * 0.2}s`
                  }}
                />
              ))}

              {/* Pulsing Dots for Bases (Micro-Parallax Hover applies to overlays so standard marker here) */}
              {bases.map((base) => (
                <Marker 
                  key={base.id} 
                  coordinates={base.coordinates}
                  onMouseEnter={() => setHoveredBase(base.id)}
                  onMouseLeave={() => setHoveredBase(null)}
                >
                  <circle 
                    r={hoveredBase === base.id ? 8 : 4} 
                    fill="#027357" 
                    className="transition-all duration-500 cursor-pointer"
                  />
                  {/* Pulse effect */}
                  <circle 
                    r={12} 
                    fill="none" 
                    stroke="#027357" 
                    strokeWidth={2} 
                    className="animate-ping opacity-75"
                  />
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </motion.div>

        {/* Global CSS for Line Animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes dash {
            from { stroke-dashoffset: 100; }
            to { stroke-dashoffset: 0; }
          }
        `}} />

        {/* Black Mask 30% Opacity */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />
      </div>

      {/* Top Layer (Data Layer) */}
      <div 
        className="mx-auto max-w-7xl px-6 lg:px-8 relative z-20 pointer-events-none w-full"
      >
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center mb-16 md:mb-24 mt-10 md:mt-0">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              {language === 'zh' ? (
                <>布局全球 <span className="text-[#027357]">链接未来</span></>
              ) : (
                <>GLOBAL <span className="text-[#027357]">FOOTPRINT</span></>
              )}
            </motion.h2>
            {language === 'zh' && (
              <motion.p 
                className="text-lg md:text-xl text-zinc-500 font-light tracking-wide uppercase mb-6"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Global Footprint & Resilience.
              </motion.p>
            )}
            <motion.p 
              className="text-lg md:text-xl text-zinc-400 font-light tracking-wide max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {language === 'zh' ? '构筑跨地域的高韧性智造网络，实现全球订单的快速响应与精准交付。' : 'Building a resilient, cross-regional smart manufacturing network for rapid global order response and precise delivery.'}
            </motion.p>
          </div>
          
          <dl className="mt-16 grid grid-cols-1 gap-12 overflow-hidden text-center sm:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
              <motion.div 
                key={stat.label} 
                className="flex flex-col pt-8 relative group pointer-events-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                  {/* Divider Line */}
                  <div className="absolute top-0 left-[10%] right-[10%] h-px bg-zinc-800" />
                  {/* Progress bar background */}
                  <div className="absolute top-0 left-[10%] h-[1px] bg-[#027357] w-0 group-hover:w-[80%] transition-all duration-700 ease-out shadow-[0_0_8px_rgba(2,115,87,0.8)]" />
                  
                <dd className="order-first text-6xl md:text-7xl font-light tracking-tight text-white mb-4 flex justify-center items-baseline gap-2 whitespace-nowrap">
                  <Counter from={0} to={stat.value} duration={stat.duration} />
                  <span className="text-lg md:text-xl text-zinc-400 font-normal">{language === 'zh' ? stat.suffix : stat.suffixEn}</span>
                </dd>
                <dt className="text-sm md:text-base font-medium leading-6 text-zinc-500 tracking-wider uppercase">{language === 'zh' ? stat.label : stat.labelEn}</dt>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* Info Overlays for Hovering Bases (Tilt Effect) */}
        <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-full max-w-md pointer-events-none hidden md:block z-30 perspective-[1000px]">
           <motion.div 
              className="w-full bg-zinc-900/60 backdrop-blur-md border border-[#027357]/30 shadow-[0_0_30px_rgba(2,115,87,0.2)] rounded-2xl p-6 pointer-events-auto transition-opacity duration-300"
              style={{ rotateX: overlayRotateX, rotateY: overlayRotateY }}
              initial={{ opacity: 0, scale: 0.95, z: -50 }}
              animate={{ opacity: hoveredBase ? 1 : 0, scale: hoveredBase ? 1 : 0.95, z: hoveredBase ? 0 : -50 }}
           >
              {hoveredBase && (
                <div className="relative">
                  {/* Inner glow line mimicking precision instruments */}
                  <div className="absolute -left-2 top-0 bottom-0 w-[2px] bg-[#027357] opacity-60" />
                  
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#027357] shadow-[0_0_12px_#027357]" />
                    <h4 className="text-xl font-bold text-white tracking-wide uppercase">
                      {language === 'zh' ? bases.find(b => b.id === hoveredBase)?.name : bases.find(b => b.id === hoveredBase)?.nameEn}
                    </h4>
                  </div>
                  <p className="text-[#027357] font-light pl-6 text-sm tracking-widest whitespace-pre-wrap">
                    {language === 'zh' ? bases.find(b => b.id === hoveredBase)?.desc.split(' | ').join('\n') : bases.find(b => b.id === hoveredBase)?.descEn?.split(' | ').join('\n')}
                  </p>
                </div>
              )}
           </motion.div>
        </div>
      </div>
    </section>
  );
}
