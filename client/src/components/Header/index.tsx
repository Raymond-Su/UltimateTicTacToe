import './Header.scss';

import classNames from 'classnames';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { v1 as uuidv1 } from 'uuid';

import Logo from '../../assets/logo.png';

const Header: FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className={classNames('header', { 'show-menu-toggle': showMenu })}>
      <Link to="/" className="logo">
        <img src={Logo} className="logo-img" />
        <span className="logo-name">Ultimate TTT</span>
      </Link>
      <div className="menu-icon" onClick={() => setShowMenu((state) => !state)}>
        <span className="navicon" />
      </div>
      <div className="menu" onClick={() => setShowMenu((state) => !state)}>
        <Link to="/">Local</Link>
        <Link to={`/online/${uuidv1()}`}>Online</Link>
      </div>
    </header>
  );
};

export default Header;
