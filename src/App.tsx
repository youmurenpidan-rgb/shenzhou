import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import VerticalIntegration from './components/VerticalIntegration';
import Stats from './components/Stats';
import SmartManufacturing from './components/SmartManufacturing';
import ESG from './components/ESG';
import Partners from './components/Partners';
import VideoPlayer from './components/VideoPlayer';
import { useLanguage } from './lib/LanguageContext';

export default function App() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <div className="bg-white mix-blend-normal">
      <Navigation />
      
      <main className="relative">
        <div className="absolute inset-0 z-0 bg-[url('https://www.shenzhouintl.com/assets/images/pattern.png')] opacity-5" />
        <div className="relative z-10 w-full">
           <Hero onOpenVideo={() => setIsVideoOpen(true)} />
           
           {/* Add a subtle highlight line at the top to emphasize the edge */}
           <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />
           
           <VerticalIntegration />
           <Stats />
           <SmartManufacturing />
           <ESG />
           <Partners />

           <footer className="min-h-[30vh] bg-zinc-50 flex flex-col items-center justify-center py-20 px-4 text-center border-t border-zinc-200">
             <h3 className="text-2xl md:text-3xl text-zinc-900 font-medium tracking-tight mb-6">
               {language === 'zh' ? '探求卓越，生生不息' : 'IN PURSUIT OF EXCELLENCE'}
             </h3>
             <p className="text-zinc-500 font-light mb-12">
               {language === 'zh' ? 'IN PURSUIT OF EXCELLENCE' : 'Constant innovation and sustainable growth'}
             </p>
             <div className="h-px w-24 bg-zinc-200 mb-12" />
             <p className="text-sm font-mono text-zinc-400">&copy; 2025 Shenzhou International Group Holdings Limited. All rights reserved.</p>
           </footer>
        </div>
      </main>

      <VideoPlayer isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} videoSrc="https://shenzhoujituan.oss-cn-beijing.aliyuncs.com/shenzhouvideo.mp4" />
    </div>
  );
}
