import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import Logo from './Logo';

type SubItem = {
  label: string;
  en: string;
  href: string;
};

type NavItem = {
  label: string;
  en: string;
  href: string;
  subItems?: SubItem[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: '集团概览',
    en: 'Group',
    href: '#about',
    subItems: [
      { label: '企业概况', en: 'Profile', href: '#about-overview' },
      { label: '发展历程', en: 'History', href: '#about-history' },
      { label: '领导团队', en: 'Leadership', href: '#about-team' },
      { label: '荣誉资质', en: 'Awards', href: '#about-awards' },
      { label: '全球布局地图', en: 'Global', href: '#about-map' },
    ]
  },
  {
    label: '纵向一体化',
    en: 'Integration',
    href: '#integration',
    subItems: [
      { label: '研发设计', en: 'R&D', href: '#int-rnd' },
      { label: '面料开发', en: 'Fabrics', href: '#int-fabric' },
      { label: '染整技术', en: 'Dyeing', href: '#int-dyeing' },
      { label: '成衣制造', en: 'Garments', href: '#int-garment' },
      { label: '质量控制体系', en: 'Quality', href: '#int-qc' },
    ]
  },
  {
    label: '产品矩阵',
    en: 'Products',
    href: '#products',
    subItems: [
      { label: '运动服饰系列', en: 'Sports', href: '#prod-sport' },
      { label: '休闲服饰系列', en: 'Casual', href: '#prod-casual' },
      { label: '内衣服装系列', en: 'Intimates', href: '#prod-inner' },
      { label: '创新功能性面料', en: 'Tech Fabric', href: '#prod-fabric' },
    ]
  },
  {
    label: '可持续发展',
    en: 'ESG',
    href: '#sustainability',
    subItems: [
      { label: '环境保护', en: 'Environment', href: '#esg-e' },
      { label: '社会责任', en: 'Social', href: '#esg-s' },
      { label: '公司治理', en: 'Governance', href: '#esg-g' },
      { label: 'ESG年度报告', en: 'Reports', href: '#esg-report' },
    ]
  },
  {
    label: '投资者关系',
    en: 'Investors',
    href: '#investors',
    subItems: [
      { label: '实时股价', en: 'Stock', href: '#inv-stock' },
      { label: '公告与通函', en: 'Announcements', href: '#inv-announcements' },
      { label: '财务业绩回顾', en: 'Financials', href: '#inv-financials' },
      { label: '投资者日', en: 'Events', href: '#inv-day' },
      { label: '日历与FAQ', en: 'FAQ', href: '#inv-faq' },
    ]
  },
  {
    label: '人才发展',
    en: 'Careers',
    href: '#careers',
    subItems: [
      { label: '社会招聘', en: 'Pros', href: '#career-social' },
      { label: '校园招聘', en: 'Campus', href: '#career-campus' },
      { label: '员工成长', en: 'Growth', href: '#career-growth' },
      { label: '申洲生活', en: 'Life', href: '#career-life' },
    ]
  }
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const { language, toggleLanguage } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Update scrolled state
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Hide/show navigation based on scroll direction
    if (latest > previous && latest > 150) {
      // scrolling down && past initial threshold
      setHidden(true);
      setActiveMenu(null); // Close dropdown if scrolling down
    } else if (latest < previous) {
      // scrolling up
      setHidden(false);
    }
  });

  return (
    <motion.nav
      className={`fixed top-0 z-50 w-full transition-colors duration-500 ${
        scrolled || activeMenu || mobileMenuOpen
          ? 'bg-white/85 backdrop-blur-md border-b border-zinc-200/50'
          : 'bg-transparent'
      }`}
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden && !activeMenu && !mobileMenuOpen ? 'hidden' : 'visible'}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-500 ${scrolled ? 'py-0' : 'py-2'}`}>
        <div className="flex h-20 items-center justify-between relative">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-3 group">
              <div className={`flex items-center justify-center transition-all duration-300 ${!scrolled && !activeMenu && !mobileMenuOpen ? 'text-white' : 'text-zinc-900'}`}>
                {/* Shenzhou Logo */}
                <Logo className="h-10 w-10" variant="navigation" isScrolled={!!(scrolled || activeMenu || mobileMenuOpen)} />
              </div>
              <div className={`flex flex-col ${scrolled || activeMenu || mobileMenuOpen ? 'text-zinc-900' : 'text-white'}`}>
                <span className="text-xl font-bold tracking-tighter leading-none">
                  申洲国际
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase mt-1 opacity-90">
                  Shenzhou International
                </span>
              </div>
            </a>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-stretch h-full ml-auto mr-10 relative z-20">
            <div className="flex items-stretch space-x-10 h-full">
              {NAV_ITEMS.map((item) => (
                <div 
                   key={item.label} 
                   className="relative flex items-center h-full"
                   onMouseEnter={() => setActiveMenu(item.label)}
                >
                  <a
                    href={item.href}
                    className={`font-sans text-base font-medium tracking-wider transition-colors flex items-center gap-1 ${
                       activeMenu === item.label 
                         ? 'text-brand' 
                         : (scrolled || activeMenu || mobileMenuOpen ? 'text-zinc-700 hover:text-brand' : 'text-white/90 hover:text-white')
                    }`}
                  >
                    {language === 'zh' ? item.label : item.en}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 transition-colors duration-500 h-8 relative z-20">
             <button className={`p-2 transition-colors ${scrolled || activeMenu || mobileMenuOpen ? 'text-zinc-600 hover:text-brand' : 'text-white/80 hover:text-white'}`}>
               <Search size={20} />
             </button>
            <button onClick={toggleLanguage} className={`text-sm font-medium tracking-wide transition-colors ${scrolled || activeMenu || mobileMenuOpen ? 'text-zinc-600 hover:text-brand' : 'text-white/80 hover:text-white'}`}>{language === 'zh' ? 'EN' : '中文'}</button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex lg:hidden items-center gap-2 sm:gap-4 relative z-20">
            <button className={`p-2 transition-colors ${scrolled || mobileMenuOpen ? 'text-zinc-600 hover:text-brand' : 'text-white/80 hover:text-white'}`}>
              <Search size={20} />
            </button>
            <button onClick={toggleLanguage} className={`text-xs sm:text-sm font-medium transition-colors ${scrolled || mobileMenuOpen ? 'text-zinc-600 hover:text-brand' : 'text-white/80 hover:text-white'}`}>{language === 'zh' ? 'EN' : '中文'}</button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex items-center justify-center rounded-md p-2 focus:outline-none transition-colors ${scrolled || mobileMenuOpen ? 'text-zinc-900 hover:bg-zinc-100' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
         {activeMenu && (
            <motion.div 
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
               transition={{ duration: 0.3, ease: 'easeOut' }}
               className="hidden lg:block absolute top-[100%] left-0 w-full bg-white/95 backdrop-blur-md border-t border-zinc-100/50 shadow-xl overflow-hidden pointer-events-auto"
            >
               <div className="max-w-7xl mx-auto px-6 py-12 flex justify-center gap-24 relative z-10 w-full bg-transparent">
                  {NAV_ITEMS.find(i => i.label === activeMenu)?.subItems?.map((sub) => (
                     <a 
                        key={sub.label} 
                        href={sub.href}
                        className="group flex flex-col items-center text-center max-w-[120px]"
                     >
                        <span className="text-base font-medium text-zinc-600 group-hover:text-brand transition-colors duration-300">
                           {language === 'zh' ? sub.label : sub.en}
                        </span>
                        <span className="h-px w-0 bg-brand mt-2 group-hover:w-full transition-all duration-300" />
                     </a>
                  ))}
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div 
           initial={{ opacity: 0, height: 0 }}
           animate={{ opacity: 1, height: '100dvh' }}
           exit={{ opacity: 0, height: 0 }}
           className="lg:hidden bg-white/95 backdrop-blur-md border-t border-zinc-100/50 absolute w-full left-0 top-[100%] overflow-y-auto"
           style={{ height: 'calc(100dvh - 5rem)' }}
        >
          <div className="space-y-4 px-6 pt-6 pb-24 relative z-10">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-zinc-100/50 pb-4">
                <a
                  href={item.href}
                  className="block py-2 text-lg font-bold text-zinc-900"
                  onClick={() => !item.subItems && setMobileMenuOpen(false)}
                >
                  {language === 'zh' ? item.label : item.en}
                </a>
                {item.subItems && (
                  <div className="pl-4 pt-2 flex flex-col gap-3 border-l-2 border-zinc-100/50 ml-2">
                    {item.subItems.map(sub => (
                       <a key={sub.label} href={sub.href} className="text-base text-zinc-500 hover:text-brand" onClick={() => setMobileMenuOpen(false)}>
                         {language === 'zh' ? sub.label : sub.en}
                       </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.nav>
  );
}
