import './add-card.scss';

import ControlPointIcon from '@material-ui/icons/ControlPoint';
import React, { FC, useContext, useEffect, useState } from 'react';

import { CARD_DECKS } from '../../config';
import { AppContext } from '../../content/app-state';
import { getAvailableCards, getNewValueCustomCard } from '../card/function';

const AddCard: FC = () => {
  const appState = useContext(AppContext);
  const [showComponent, setShowComponent] = useState(true);

  const currentCardDeckNumber = appState?.settings.cardDeckNumber || 0;
  const fullCardDeck =
    currentCardDeckNumber > 0
      ? CARD_DECKS[currentCardDeckNumber].concat(CARD_DECKS[0])
      : CARD_DECKS[currentCardDeckNumber];
  const currentCardDeck = appState?.cardsDeck || [];

  const isCustomCardDeck = currentCardDeckNumber === 0;

  const handleAddCard = () => {
    const newCard = !isCustomCardDeck
      ? getAvailableCards(fullCardDeck, currentCardDeck)[0]
      : getNewValueCustomCard(currentCardDeck);
    if (appState?.cardsDeck) {
      appState?.setCardsDeck((prev) => [...prev, newCard]);
    }
  };

  useEffect(() => {
    getAvailableCards(fullCardDeck, currentCardDeck).length === 0 && !isCustomCardDeck
      ? setShowComponent(false)
      : setShowComponent(true);
  }, [appState?.cardsDeck]);

  return (
    <>
      {showComponent && (
        <div
          role="none"
          className="add-card_container primary-bg-color primary-color"
          onClick={handleAddCard}>
          <ControlPointIcon className="control-icon" />
        </div>
      )}
    </>
  );
};

export default AddCard;
