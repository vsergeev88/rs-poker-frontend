import './card.scss';

import { MenuItem, Select, TextField } from '@material-ui/core';
import {
  CheckCircle,
  DeleteOutlined,
  EditOutlined,
  LocalCafe,
  OfflinePin,
} from '@material-ui/icons/';
import { useSnackbar } from 'notistack';
import { FC, useContext, useEffect, useState } from 'react';
import React from 'react';

import { CARD_DECKS, DECK_ACTION, SETTING_CARD_DECK_NUM_DEF } from '../../config';
import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { getAvailableCards, isNewValueCustomCardWell } from './function';

interface IProps {
  propCardValue: string;
  shortScoreType: string;
  allowEdit: boolean;
  cardIndex: number;
}

const Card: FC<IProps> = ({ propCardValue, shortScoreType, allowEdit, cardIndex }) => {
  const [editMode, setEditMode] = useState(false);
  const [checked, setChecked] = useState(false);
  const [menuItems, setMenuItems] = useState<string[]>(
    CARD_DECKS[SETTING_CARD_DECK_NUM_DEF],
  );
  const [showEditBtn, setShowEditBtn] = useState(allowEdit);
  const [showDoneBtn, setShowDoneBtn] = useState(false);

  const [prevCardValue, setPrevCardValue] = useState('');
  const [newCardValue, setNewCardValue] = useState('');

  const appState = useContext(AppContext);
  const socket = useContext(SocketContext);
  const { enqueueSnackbar } = useSnackbar();

  const currentCardDeckNumber = appState?.settings.cardDeckNumber || 0;
  const fullCardDeck =
    currentCardDeckNumber > 0
      ? CARD_DECKS[currentCardDeckNumber].concat(CARD_DECKS[0])
      : CARD_DECKS[currentCardDeckNumber];
  const currentCardDeck = appState?.cardsDeck || [];

  const isCustomCardDeck = currentCardDeckNumber === 0;

  const isCardAction = DECK_ACTION.indexOf(propCardValue) !== -1;

  useEffect(() => {
    setMenuItems(getAvailableCards(fullCardDeck, currentCardDeck));
    if (!menuItems.length && !isCustomCardDeck) {
      setShowEditBtn(false);
      setEditMode(false);
    } else {
      setShowEditBtn(true);
    }
  }, [appState?.cardsDeck, menuItems.length]);

  useEffect(() => {
    const currentIssue = appState?.issues.find((el) => el.current === true);
    if (socket?.id && currentIssue?.poolResults?.votes[socket?.id]) {
      setChecked(propCardValue === currentIssue?.poolResults?.votes[socket?.id]);
    } else {
      setChecked(false);
    }
  }, [appState?.issues]);

  const handleClose = () => {
    setEditMode(false);
    setShowDoneBtn(false);
  };

  const handleDone = () => {
    if (
      newCardValue &&
      newCardValue !== prevCardValue &&
      isNewValueCustomCardWell(newCardValue, currentCardDeck)
    ) {
      const prevCardValueIndex = currentCardDeck.indexOf(prevCardValue);
      const newCardDeck = currentCardDeck.slice();
      newCardDeck[prevCardValueIndex] = newCardValue;
      appState?.setCardsDeck(newCardDeck);
      setNewCardValue('');
      enqueueSnackbar('Success: Card value saved!', { variant: 'success' });
    } else {
      if (newCardValue === prevCardValue) {
        enqueueSnackbar(`Warning: The value has not changed`, { variant: 'warning' });
      } else if (!newCardValue) {
        enqueueSnackbar(`Warning: New value was empty. Try to set new value again`, {
          variant: 'warning',
        });
      } else enqueueSnackbar(`Error: Invalid value`, { variant: 'error' });
    }

    setEditMode(false);
    setShowDoneBtn(false);
    setShowEditBtn(true);
  };

  const handleOpen = () => {
    setEditMode(true);
    currentCardDeckNumber === 0
      ? (setShowEditBtn(false), setShowDoneBtn(true))
      : setEditMode(true);
  };

  const deleteCard = () => {
    if (appState?.cardsDeck) {
      let tempArr = [...appState?.cardsDeck];
      tempArr.splice(cardIndex, 1);
      appState?.setCardsDeck(tempArr);
    }
  };

  const handleCheckCard = () => {
    if (appState?.settings.isRoundStarted) {
      const currentIssue = appState?.issues.find((el) => el.current === true);
      socket?.emit(
        'setIssueVote',
        socket?.id,
        currentIssue?.issueID,
        !checked ? propCardValue : 'NONE',
        (error: string) => {
          if (error) console.error('Error: ' + error);
        },
      );
    }
  };

  return (
    <div
      role="none"
      className={`card_container ${
        allowEdit || !appState?.settings.isRoundStarted ? '' : 'active-card'
      }`}
      onClick={handleCheckCard}>
      <div className="top-wrapper">
        {!editMode && (
          <span className={`card-value_text ${isCardAction ? 'action-card' : ''}`}>
            {propCardValue}
          </span>
        )}
        {editMode && isCustomCardDeck && showDoneBtn && (
          <>
            <TextField
              id={propCardValue}
              size="small"
              defaultValue={Number(propCardValue) || 0}
              variant="outlined"
              className="edit-card-value mt-5 ml-5"
              onChange={(e) => {
                setPrevCardValue(propCardValue);
                setNewCardValue(e.target.value);
              }}
              type="number"
            />
          </>
        )}
        {editMode && !isCustomCardDeck && (
          <>
            <Select
              id="select-label"
              open={editMode}
              onClose={handleClose}
              onOpen={handleOpen}
              value={propCardValue}
              onChange={(e) => {
                appState?.setCardsDeck((prev) => [
                  ...prev.map((el, indx) =>
                    indx === cardIndex ? (e.target.value as string) : el,
                  ),
                ]);
              }}>
              {menuItems.map((el, idx) => (
                <MenuItem value={el} key={idx}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
        {allowEdit && (
          <div>
            {showDoneBtn && <CheckCircle onClick={handleDone} className="done-icon" />}
            {showEditBtn && (
              <EditOutlined className="edit-card_icon" onClick={handleOpen} />
            )}
            {!showDoneBtn && (
              <DeleteOutlined className="delete-card_icon" onClick={deleteCard} />
            )}
          </div>
        )}
      </div>
      {propCardValue === 'Coffee' ? (
        <LocalCafe className="score-type_text" />
      ) : propCardValue === 'Inf' ? (
        <span className="score-type_text">Inf</span>
      ) : propCardValue === '?' ? (
        <span className="score-type_text">?</span>
      ) : (
        <span className="score-type_text">{shortScoreType}</span>
      )}

      <span className={`card-value_text rotate ${isCardAction ? 'action-card' : ''}`}>
        {propCardValue}
      </span>
      {!allowEdit && checked && (
        <>
          <div className="checked-cover"></div>
          <div className="check-icon-wrapper">
            <OfflinePin className="check-icon" />
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
