const getAvailableCards2 = (fullCardDeck: string[], currentCardDeck: string[]) => {
  let availableCards: string[] = [];
  fullCardDeck.forEach((card) => {
    if (!currentCardDeck.includes(card)) availableCards.push(card);
  });
  return availableCards;
};

export default getAvailableCards2;
