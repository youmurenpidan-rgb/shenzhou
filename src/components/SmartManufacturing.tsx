import { motion } from 'motion/react';
import { Bot, Cpu, Factory, Monitor, Brain } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const features = [
  { 
    id: 1, 
    subtitle: '数字化工厂大脑 (The AI Brain)',
    title: '人工智能中心', 
    titleEn: 'AI Center',
    desc: '人工智能充当工厂大脑，大数据构筑产业核心。我们在全球范围内全面提升生产效率与工艺精度，重新定义服饰的智造体验。',
    descEn: 'AI acts as the factory brain, while big data shapes our industrial core. We optimize efficiency and precision globally, redefining smart apparel manufacturing.',
    icon: Brain,
    img: '/smart1.jpg' 
  },
  { 
    id: 2, 
    subtitle: '机器人缝制臂膀 (Robotic Limb)',
    title: '智能机械系统', 
    titleEn: 'Smart Mechanics',
    desc: '智能机械化为产业臂膀。引入机器视觉与自动化抓取，突破柔性面料缝制壁垒，在每一道工序中把控极致的工艺精度。',
    descEn: 'Intelligent mechanization serves as our industrial arms. With machine vision and automated grabbing, we break barriers in flexible fabric sewing, ensuring extreme precision in every step.',
    icon: Bot,
    img: '/smart2.jpg' 
  },
  { 
    id: 3, 
    subtitle: '智慧中枢物流 (Intelligent Logistics)',
    title: '自动化仓储', 
    titleEn: 'Automated Storage',
    desc: '通过立体库与 AGV 机器人的无缝交互，实现原辅料及成品的秒级智能存取。以卓越运营模式，确保全球订单的高效响应。',
    descEn: 'Through seamless interaction between our high-bay warehouses and AGV robots, we achieve sub-second intelligent storage of materials. This ensures efficient responses to global orders.',
    icon: Factory,
    img: '/smart3.jpg' 
  },
  { 
    id: 4, 
    subtitle: '数字孪生研发 (Digital Twin R&D)',
    title: '数字化研发', 
    titleEn: 'Digital R&D',
    desc: '打通 3D 虚拟样衣与材质数据库。科技引领下一轮跨越，通过全链路数字孪生，驱动绿色可持续发展水平的革新。',
    descEn: 'Bridging 3D virtual sampling with material databases. Tech leads our next leap, using full-lifecycle digital twins to drive sustainable green innovation.',
    icon: Monitor,
    img: '/smart4.jpg' 
  },
];

export default function SmartManufacturing() {
  const { language } = useLanguage();

  return (
    <section className="relative py-24 md:py-32 bg-zinc-50 overflow-hidden">
      {/* Architectural / Tech Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <img src="/smart-bg.jpg" alt="technology background" className="w-full h-full object-cover opacity-[0.03] grayscale mix-blend-multiply" />
         <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/50 via-transparent to-zinc-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 shrink-0 mb-12 md:mb-16 md:text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 mb-4"
        >
          {language === 'zh' ? '科技驱动 智领变革' : 'TECH-DRIVEN TRANSFORMATION'}
        </motion.h2>
        {language === 'zh' && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-xl text-zinc-500 font-light tracking-wide"
          >
            Tech-Driven Manufacturing.
          </motion.p>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <motion.div
               key={feature.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 * idx, duration: 0.6 }}
               className="group cursor-pointer flex flex-col bg-white overflow-hidden transition-all duration-500 h-[360px] md:h-[432px]"
            >
               <div className="flex-1 overflow-hidden relative min-h-0">
                 <img 
                   src={feature.img} 
                   alt={feature.title} 
                   className="w-full h-full object-cover" 
                 />
                 <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
               </div>
               
               <div className="bg-white relative z-10">
                 <div className="p-6 md:p-8 flex flex-col justify-end transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform">
                    {/* Header block */}
                    <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-2">
                       <p className="text-[10px] md:text-xs font-bold text-[#027357] tracking-widest uppercase mb-3 text-ellipsis overflow-hidden whitespace-nowrap">{feature.subtitle}</p>
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-900 group-hover:bg-[#027357] group-hover:border-[#027357] group-hover:text-white transition-all duration-300 shrink-0">
                           <feature.icon size={18} />
                         </div>
                         <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 line-clamp-1">{language === 'zh' ? feature.title : feature.titleEn}</h3>
                       </div>
                    </div>
                    
                    {/* Collapsible Body */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                       <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          <div className="pt-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] delay-75">
                             <p className="text-zinc-500 leading-relaxed font-light text-sm md:text-base line-clamp-3 md:line-clamp-none">
                               {language === 'zh' ? feature.desc : feature.descEn}
                             </p>
                             <div className="flex items-center text-xs md:text-sm font-medium tracking-widest uppercase text-zinc-400 group-hover:text-[#027357] transition-colors gap-3 mt-6">
                               <span>{language === 'zh' ? 'Explore' : 'Explore'}</span>
                               <div className="h-[1px] bg-zinc-300 group-hover:bg-[#027357] transition-all duration-500 w-6 group-hover:w-16" />
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
