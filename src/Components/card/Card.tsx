import './Card.scss';

import { MenuItem, Select } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import OfflinePinIcon from '@material-ui/icons/OfflinePin';
import { FC, useState } from 'react';
import React from 'react';

import { deck2 } from '../../data/deck';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  propCardValue: string;
  shortScoreType: string;
  allowEdit: boolean;
}

const Card: FC<CardProps> = ({ propCardValue, shortScoreType, allowEdit }) => {
  const [cardValue, setCardValue] = useState(propCardValue);
  const [editMode, setEditMode] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClose = () => {
    setEditMode(false);
  };

  const handleOpen = () => {
    setEditMode(true);
  };

  return (
    <div
      role="none"
      className={`card_container ${allowEdit ? '' : 'active-card'}`}
      onClick={() => {
        setChecked(!checked);
      }}>
      <div className="top-wrapper">
        <span className="card-value_text">{cardValue}</span>
        {editMode && (
          <>
            <Select
              id="select-label"
              open={editMode}
              onClose={handleClose}
              onOpen={handleOpen}
              value={cardValue}
              onChange={(e) => setCardValue(e.target.value as string)}>
              {deck2.map((el, idx) => (
                <MenuItem value={el} key={idx}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
        {allowEdit && <EditIcon className="edit-icon" onClick={handleOpen} />}
      </div>
      {cardValue === 'Coffee' ? (
        <LocalCafeIcon className="score-type_text" />
      ) : cardValue === '?' ? (
        <span className="score-type_text">?</span>
      ) : (
        <span className="score-type_text">{shortScoreType}</span>
      )}

      <span className="card-value_text rotate">{cardValue}</span>
      {!allowEdit && checked && (
        <>
          <div className="checked-cover"></div>
          <div className="check-icon-wrapper">
            <OfflinePinIcon className="check-icon" />
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
