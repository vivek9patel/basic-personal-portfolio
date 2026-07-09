import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface ListenToPostProps {
  text: string;
  slug: string;
}

export function ListenToPost({ text, slug }: ListenToPostProps) {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggle = () => {
    if (!supported || typeof window === 'undefined') return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      trackEvent('blog_listen_toggle', { slug, action: 'stop' });
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
    trackEvent('blog_listen_toggle', { slug, action: 'start' });
  };

  if (!supported) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-label={speaking ? 'Stop listening' : 'Listen to this post'}
      data-cursor={true}
    >
      {speaking ? (
        <Pause className="mr-2 h-4 w-4" />
      ) : (
        <Play className="mr-2 h-4 w-4" />
      )}
      {speaking ? 'Stop' : 'Listen'}
    </Button>
  );
}
