import React, { useCallback, useEffect, useRef, useState } from 'react';

const MagicCard = ({
  children,
  className = '',
  gradientSize = 200,
  gradientColor = '#262626',
  gradientOpacity = 0.8,
  gradientFrom = '#9E7AFF',
  gradientTo = '#FE8BBB',
}) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -gradientSize, y: -gradientSize });

  const handleMouseMove = useCallback((e) => {
    if (cardRef.current) {
      const { left, top } = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - left,
        y: e.clientY - top,
      });
    }
  }, []);

  const handleMouseOut = useCallback((e) => {
    if (!e.relatedTarget) {
      document.removeEventListener('mousemove', handleMouseMove);
      setMousePosition({ x: -gradientSize, y: -gradientSize });
    }
  }, [handleMouseMove, gradientSize]);

  const handleMouseEnter = useCallback(() => {
    document.addEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseEnter, handleMouseMove, handleMouseOut]);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-[#1f2937] flex w-full h-full rounded-xl ${className}`}
    >
      <div className="absolute inset-px z-10 rounded-xl bg-background" />
      <div className="relative z-30">{children}</div>
      <div
        className="pointer-events-none absolute inset-px z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${gradientSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${gradientColor}, transparent 100%)`,
          opacity: gradientOpacity,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-xl bg-border duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${gradientSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${gradientFrom}, ${gradientTo}, hsl(var(--border)) 100%)`,
        }}
      />
    </div>
  );
};

export default MagicCard;
