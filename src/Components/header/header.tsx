import './header.scss';

import type { FC } from 'react';
import React from 'react';

import pngUrl from '../../assets/png/logo.png';

const Header: FC = () => {
  return (
    <div className="header-menu">
      <img src={pngUrl} alt="logo"></img>
      <div className="header-menu_bottom"></div>
    </div>
  );
};

export default Header;
