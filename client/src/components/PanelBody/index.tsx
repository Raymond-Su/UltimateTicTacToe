import './PanelBody.scss';

import React, { FC, ReactNode } from 'react';

interface PanelBodyProps {
  children: ReactNode;
}

const PanelBody: FC<PanelBodyProps> = ({ children }: PanelBodyProps) => (
  <div className="panel-body">{children}</div>
);

export default PanelBody;
