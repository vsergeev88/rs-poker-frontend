import './header.scss';

import type { FC } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

import pngUrl from '../../assets/png/logo.png';

const Header: FC = () => {
  return (
    <div className="header-menu">
      <img src={pngUrl} alt="logo"></img>
      <ul>
        <li>
          <Link to="/" className="header-link">
            Main
          </Link>
        </li>
        <li>
          <Link to="/lobby" className="header-link">
            Lobby
          </Link>
        </li>
        <li>
          <Link to="/game" className="header-link">
            Game
          </Link>
        </li>
        <li>
          <Link to="/test" className="header-link">
            Test
          </Link>
        </li>
      </ul>
      <div className="header-menu_bottom"></div>
    </div>
  );
};

export default Header;
