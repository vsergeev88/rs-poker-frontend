import './add-card.scss';

import ControlPointIcon from '@material-ui/icons/ControlPoint';
import React, { FC, useContext, useEffect, useState } from 'react';

import { CARD_DECKS } from '../../config';
import { AppContext } from '../../content/app-state';
import getAvailableCards2 from '../card/function';

const AddCard: FC = () => {
  const appState = useContext(AppContext);
  const [showComponent, setShowComponent] = useState(true);

  const handleAddCard = () => {
    if (appState?.cardsDeck) {
      appState?.setCardsDeck((prev) => [
        ...prev,
        getAvailableCards2(fullCardDeck, currentCardDeck)[0],
      ]);
    }
  };

  const currentCardDeckNumber = appState?.settings.cardDeckNumber || 0;
  const fullCardDeck =
    currentCardDeckNumber > 0
      ? CARD_DECKS[currentCardDeckNumber].concat(CARD_DECKS[0])
      : CARD_DECKS[currentCardDeckNumber];
  const currentCardDeck = appState?.cardsDeck || [];

  useEffect(() => {
    getAvailableCards2(fullCardDeck, currentCardDeck).length === 0
      ? setShowComponent(false)
      : setShowComponent(true);
  }, [appState?.cardsDeck]);

  return (
    <>
      {showComponent && (
        <div
          role="none"
          className="card_container primary-bg-color primary-color"
          onClick={handleAddCard}>
          <ControlPointIcon className="control-icon" />
        </div>
      )}
    </>
  );
};

export default AddCard;
