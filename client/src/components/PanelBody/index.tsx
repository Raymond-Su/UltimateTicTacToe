import React, { FC, ReactNode } from 'react';
import './PanelBody.scss';

interface PanelBodyProps {
  children: ReactNode;
}

const PanelBody: FC<PanelBodyProps> = ({ children }: PanelBodyProps) => (
  <div className="panel-body">{children}</div>
);

export default PanelBody;
