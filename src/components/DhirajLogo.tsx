import React from 'react';
import { LOGO_DARK, LOGO_LIGHT } from '../data/logoPaths';

interface DhirajLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'on-dark' | 'on-light';
  title?: string;
}

/**
 * Dhiraj Kumar Vector Logo
 * variant="dark": for dark backgrounds (charcoal badge, footer) - uses lighter fill (#f5ede3)
 * variant="light": for light backgrounds - uses deep charcoal fill (#3f443f)
 */
export const DhirajLogo: React.FC<DhirajLogoProps> = ({ 
  className = "w-6 h-6", 
  variant = 'dark',
  title = "Dhiraj Kumar Logo"
}) => {
  if (variant === 'light' || variant === 'on-light') {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 750 750" 
        className={className}
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-label={title}
      >
        <title>{title}</title>
        {(['ball', 'pot', 'bat'] as const).map((part) => {
          const { fill, strokeWidth, transform, d } = LOGO_LIGHT[part];
          return (
            <path key={part} strokeLinecap="butt" transform={transform} fillOpacity="1" fill={fill} fillRule="nonzero" strokeLinejoin="miter" d={d} stroke={fill} strokeWidth={strokeWidth} strokeOpacity="1" strokeMiterlimit="4"/>
          );
        })}
      </svg>
    );
  }

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 750 750" 
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-label={title}
    >
      <title>{title}</title>
      {(['ball', 'pot', 'bat'] as const).map((part) => {
        const { fill, strokeWidth, transform, d } = LOGO_DARK[part];
        return (
          <path key={part} strokeLinecap="butt" transform={transform} fillOpacity="1" fill={fill} fillRule="nonzero" strokeLinejoin="miter" d={d} stroke={fill} strokeWidth={strokeWidth} strokeOpacity="1" strokeMiterlimit="4"/>
        );
      })}
    </svg>
  );
};
