import React from 'react';

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text = 'Loading...' }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <svg
        width={50}
        height={50}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        style={{ background: 'none', display: 'block', shapeRendering: 'auto' }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          strokeWidth="6"
          stroke={'#f23000'}
          strokeDasharray="62.83185307179586 62.83185307179586"
          fill="none"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
};

export default Loading;
