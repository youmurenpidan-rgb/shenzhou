import { motion } from 'motion/react';
import { Leaf, Droplets, Sun } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const initiatives = [
  {
    title: '碳中和路径规划',
    titleEn: 'Carbon Neutrality Path',
    desc: '承诺科学减碳，布局低碳生产工艺，打造零碳工厂样本。',
    descEn: 'Committing to scientific carbon reduction, laying out low-carbon production processes, and creating zero-carbon factory samples.',
    icon: Leaf,
  },
  {
    title: '水资源回用系统',
    titleEn: 'Water Recycling System',
    desc: '采用国际尖端中水回用设备，染色用水高度循环再利用，护航绿水青山。',
    descEn: 'Adopting international cutting-edge water recycling equipment for highly circular dyeing water reuse, protecting our green mountains and clear waters.',
    icon: Droplets,
  },
  {
    title: '全面铺设光伏电站',
    titleEn: 'Full PV Station Coverage',
    desc: '在各大厂区厂房屋顶大规模部署太阳能光伏系统，提升清洁能源使用占比。',
    descEn: 'Deploying large-scale solar photovoltaic systems on factory roofs across all major sites to increase the use of clean energy.',
    icon: Sun,
  }
];

export default function ESG() {
  const { language } = useLanguage();

  return (
    <section className="bg-zinc-950 text-white min-h-[90vh] flex flex-col md:flex-row relative overflow-hidden">
      {/* Fixed organic background pattern */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center opacity-60 mix-blend-luminosity grayscale pointer-events-none"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2826&auto=format&fit=crop")' }}
      />
      <div className="absolute inset-0 z-0 bg-black/80 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none" />

      {/* Left Data Content */}
      <div className="w-full md:w-1/2 p-8 md:p-24 lg:p-32 xl:pr-20 flex flex-col justify-center order-2 md:order-1 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
        >
          {language === 'zh' ? '为绿色时尚负责' : 'RESPONSIBLE FASHION'}
        </motion.h2>
        {language === 'zh' && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-xl text-brand font-light mb-16 tracking-wide"
          >
            Responsible for Green Fashion.
          </motion.p>
        )}

        <div className="space-y-12 relative pt-4 ml-6 lg:ml-8">
          {/* Vertical connecting line */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-800/60 -ml-[23px] z-0" />
          
          {initiatives.map((item, idx) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="relative group pr-4"
            >
              <div className="flex items-start gap-6">
                <div className="relative z-10 w-12 h-12 mt-1 shrink-0 rounded-full bg-zinc-950 border border-zinc-700 shadow-sm flex items-center justify-center text-zinc-500 group-hover:border-brand group-hover:text-brand group-hover:shadow-[0_0_15px_rgba(2,115,87,0.4)] transition-all duration-300 -ml-[47px]">
                   <item.icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                   <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-brand transition-colors duration-300 mb-2">{language === 'zh' ? item.title : item.titleEn}</h3>
                   <p className="text-lg md:text-xl text-zinc-400 font-light tracking-wide leading-relaxed max-w-2xl">{language === 'zh' ? item.desc : item.descEn}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.6 }}
           className="mt-16 pt-8 border-t border-zinc-800/60"
        >
           <a href="#sustainability" className="inline-flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-white hover:text-brand transition-colors group">
              {language === 'zh' ? '查看 ESG 报告' : 'View ESG Report'}
              <span className="w-8 h-px bg-white group-hover:bg-brand group-hover:w-12 transition-all duration-300" />
           </a>
        </motion.div>
      </div>

      {/* Right Bleed Image */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-auto min-h-full relative order-1 md:order-2 z-10 flex items-center justify-center">
         <div 
            className="w-full h-full relative overflow-hidden group"
            style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)', maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)' }}
          >
            <motion.img 
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop" 
              alt="Sustainable Factory"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Elegant gradient overlays for softening and depth */}
             <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 pointer-events-none" />
         </div>
      </div>
    </section>
  );
}
