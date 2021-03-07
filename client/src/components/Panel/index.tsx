import './Panel.scss';

import React, { FC, ReactNode } from 'react';

interface PanelProps {
  children: ReactNode;
}

const Panel: FC<PanelProps> = ({ children }: PanelProps) => (
  <div className="panel panel-default">{children}</div>
);

export default Panel;
