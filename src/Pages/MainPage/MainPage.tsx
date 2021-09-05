import './MainPage.scss';

import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

const MainPage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <div className="main-page">
      <div className="main-page-wrapper">Main Page</div>
    </div>
  );
};

export default MainPage;
