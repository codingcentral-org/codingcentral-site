'use client';

import { useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TiltPanelProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltPanel({ children, className, maxTilt = 10 }: TiltPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1400px) rotateX(0deg) rotateY(0deg) translateZ(0)',
  });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;

    setStyle({
      transform: `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(18px)`,
    });
  };

  const handleLeave = () => {
    setStyle({
      transform: 'perspective(1400px) rotateX(0deg) rotateY(0deg) translateZ(0)',
    });
  };

  return (
    <div
      ref={ref}
      className={cn('tilt-panel will-change-transform', className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
    >
      {children}
    </div>
  );
}
