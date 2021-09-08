import './Issue.scss';

import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

const Issue: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <div className="issue issue--current">
      <div className="issue--user-info">
        <span className="issue--status">Current</span>
        <span className="issue--title">Issue 6421</span>
        <span className="issue--prority">Low prority</span>
      </div>
      <div className="issue--action">
        <button className="issue--btn-edit ml-25"></button>
        <button className="issue--btn-remove ml-25"></button>
        <button className="issue--btn-cross ml-25"></button>
      </div>
    </div>
  );
};

export default Issue;
