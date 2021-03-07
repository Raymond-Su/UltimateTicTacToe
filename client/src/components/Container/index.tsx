import './Container.scss';

import React, { FC, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }: ContainerProps) => (
  <div className="container">{children}</div>
);

export default Container;
