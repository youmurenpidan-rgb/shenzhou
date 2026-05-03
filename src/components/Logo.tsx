
export default function Logo({ className, variant = 'default', isScrolled = false }: { className?: string; variant?: 'default' | 'navigation'; isScrolled?: boolean }) {
  return (
    <img 
      src="/logo.png" 
      alt="Shenzhou Logo" 
      className={`object-contain transition-all duration-300 ${variant === 'navigation' && !isScrolled ? 'brightness-0 invert' : ''} ${className}`}
    />
  );
}
