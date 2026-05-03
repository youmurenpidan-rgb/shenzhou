import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';

const partnerImages = [
  'adidas.png', 'alo.png', 'lacoste.png', 'lululemon.png',
  'newbalance.png', 'nike.png', 'polo.png', 'puma.png'
];

export default function Partners() {
  const { language } = useLanguage();

  return (
    <section className="relative py-32 bg-white text-zinc-900 border-t border-zinc-100 overflow-hidden">
      {/* ... keeping background ... */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2898&auto=format&fit=crop" alt="global presence" className="w-full h-full object-cover opacity-[0.08] grayscale mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${language === 'zh' ? 'mb-4' : 'mb-16 lg:mb-24'}`}
        >
          {language === 'zh' ? '与全球领军品牌并肩' : 'GLOBAL PARTNERSHIPS'}
        </motion.h2>
        {language === 'zh' && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-xl text-zinc-500 font-light mb-24 tracking-wide"
          >
            Partnering with Global Leaders
          </motion.p>
        )}
        
        {/* Logos container: 2 rows of 4 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-zinc-200">
          {partnerImages.map((src, idx) => (
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              className="flex items-center justify-center min-h-[180px] md:min-h-[280px] p-10 group cursor-pointer hover:bg-zinc-50 transition-colors duration-500 relative border-r border-b border-zinc-200"
            >
              <img
                src={`/${src}`}
                alt={`Partner ${idx + 1}`}
                className="max-h-20 md:max-h-24 object-contain transition-all duration-300 scale-[1.2] grayscale opacity-70 group-hover:scale-[1.3] group-hover:grayscale-0 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
