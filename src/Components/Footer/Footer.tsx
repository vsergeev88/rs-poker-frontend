import './Footer.scss';

import type { FunctionComponent } from 'react';
import React from 'react';

const Footer: FunctionComponent = () => (
  <div className="footer">
    <div className="footer-container">
      {' '}
      <div className="footer-text">2021</div>
      <a
        className="link-footer"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/dinosavr">
        <img src="src/assets/png/github-logo.png" alt="github"></img>
        <span>dinosavr</span>
      </a>
      <a
        className="link-footer"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/micolka">
        <img src="src/assets/png/github-logo.png" alt="github"></img>
        <span>micolka</span>
      </a>
      <a
        className="link-footer"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/dashaostrikova">
        <img src="src/assets/png/github-logo.png" alt="github"></img>
        <span>dashaostrikova</span>
      </a>
      <a
        className="school-link"
        target="_blank"
        rel="noreferrer"
        href="https://rs.school/js/">
        <img src="https://rs.school/images/rs_school_js.svg" alt="rs_school" />
      </a>
    </div>
  </div>
);

export default Footer;
