import { MAX_VALUE_CUSTOM_CARD } from '../../config';

export const getAvailableCards = (fullCardDeck: string[], currentCardDeck: string[]) => {
  let availableCards: string[] = [];
  fullCardDeck.forEach((card) => {
    if (!currentCardDeck.includes(card)) availableCards.push(card);
  });
  return availableCards;
};

export const getNewValueCustomCard = (currentCardDeck: string[]) => {
  const initalCastomCardValue = 1;
  const stepToNextNumValue = 1;
  const numArr = currentCardDeck.map(Number).filter((num) => num > 0);
  return numArr.length
    ? String(Math.max(...numArr) + stepToNextNumValue)
    : String(initalCastomCardValue);
};

export const isNewValueCustomCardWell = (newValue: string, currentDeck: string[]) => {
  return currentDeck.indexOf(newValue) < 0 && Number(newValue) < MAX_VALUE_CUSTOM_CARD;
};
