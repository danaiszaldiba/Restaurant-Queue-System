import React from 'react';
import { useTheme } from '../context/ThemeContext';

const VersaillesLogo: React.FC<{ size?: number }> = ({ size = 48 }) => {
  const { theme } = useTheme();
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield background */}
      <path
        d="M20 25 L50 15 L80 25 L80 60 Q80 80 50 90 Q20 80 20 60 Z"
        fill={theme.primary}
      />
      
      {/* Crown */}
      <path
        d="M35 15 L50 5 L65 15 L60 20 L50 15 L40 20 L35 15"
        fill={theme.secondary}
      />
      <circle cx="50" cy="8" r="2" fill={theme.secondary} />
      <circle cx="35" cy="15" r="2" fill={theme.secondary} />
      <circle cx="65" cy="15" r="2" fill={theme.secondary} />
      
      {/* Inner shield border */}
      <path
        d="M25 28 L50 20 L75 28 L75 58 Q75 75 50 83 Q25 75 25 58 Z"
        stroke={theme.secondary}
        strokeWidth="2"
        fill="none"
      />
      
      {/* Ornate V */}
      <path
        d="M40 35 L50 65 L60 35"
        stroke={theme.secondary}
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M37 35 Q50 33 63 35"
        stroke={theme.secondary}
        strokeWidth="2"
        fill="none"
      />
      
      {/* Fleur-de-lis elements */}
      <path
        d="M45 70 Q50 68 55 70 Q50 75 45 70"
        fill={theme.secondary}
      />
      <path
        d="M35 40 Q40 38 45 40 Q40 45 35 40"
        fill={theme.secondary}
      />
      <path
        d="M55 40 Q60 38 65 40 Q60 45 55 40"
        fill={theme.secondary}
      />
      
      {/* Text banner */}
      <path
        d="M30 75 Q50 73 70 75 Q50 77 30 75"
        fill={theme.secondary}
      />
      <text
        x="50"
        y="76"
        fill={theme.primary}
        fontSize="6"
        fontFamily="serif"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        EST. 1971
      </text>
    </svg>
  );
};

export default VersaillesLogo;