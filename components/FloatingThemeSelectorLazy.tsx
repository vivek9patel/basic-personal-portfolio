import dynamic from 'next/dynamic';
import { FloatingThemeSelectorProps } from './FloatingThemeSelector';

// Lazy load the FloatingThemeSelector to avoid SSR issues and improve performance
const FloatingThemeSelector = dynamic(() => import('./FloatingThemeSelector'), {
  ssr: false, // Disable server-side rendering to avoid hydration mismatch
  loading: () => (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-10 h-10 border-2 border-muted border-t-primary rounded-full animate-spin" />
    </div>
  ),
});

export default FloatingThemeSelector;
export type { FloatingThemeSelectorProps };
