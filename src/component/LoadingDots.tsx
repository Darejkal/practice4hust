import * as React from 'react';
import "./LoadingDots.css"
interface LoadingProps {}

const LoadingDots: React.FC<LoadingProps> = props => {
  return (
    <div className="Loading">
      <div className="three-balls">
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
      </div>
    </div>
  );
};

export default LoadingDots;
