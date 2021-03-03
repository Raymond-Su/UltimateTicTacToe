import React, { FC, ReactNode } from 'react';
import './Panel.scss';

interface PanelProps {
  children: ReactNode;
}

const Panel: FC<PanelProps> = ({ children }: PanelProps) => (
  <div className="panel panel-default">{children}</div>
);

export default Panel;
