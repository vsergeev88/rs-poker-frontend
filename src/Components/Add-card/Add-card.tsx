import './add-card.scss';

import ControlPointIcon from '@material-ui/icons/ControlPoint';
import React, { FC } from 'react';

const AddCard: FC = () => {
  return (
    <div role="none" className="card_container">
      <ControlPointIcon className="control-icon" />
    </div>
  );
};

export default AddCard;
