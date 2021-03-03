import React, { FC, ReactNode } from 'react';
import './PanelHeading.scss';

interface PanelHeadingProps {
  children: ReactNode;
}

const PanelHeading: FC<PanelHeadingProps> = ({
  children
}: PanelHeadingProps) => {
  return (
    <div className="panel-heading">
      <h1 className="panel-title">{children}</h1>
    </div>
  );
};

export default PanelHeading;
