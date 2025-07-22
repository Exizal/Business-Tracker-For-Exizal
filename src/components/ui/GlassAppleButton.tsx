import React, { useRef } from 'react';

export function GlassAppleButton({ children, className = '', ...props }: React.PropsWithChildren<{ className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btn.style.setProperty('--x', `${x}%`);
    btn.style.setProperty('--y', `${y}%`);
  };

  return (
    <button
      ref={btnRef}
      className={`glass-apple-btn ${className}`}
      onPointerMove={handlePointerMove}
      {...props}
    >
      {children}
    </button>
  );
}

export function GlassAppleCard({ children, className = '', ...props }: React.PropsWithChildren<{ className?: string } & React.HTMLAttributes<HTMLDivElement>>) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--x', `${x}%`);
    card.style.setProperty('--y', `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      className={`glass-apple-card ${className}`}
      onPointerMove={handlePointerMove}
      {...props}
    >
      {children}
    </div>
  );
} 