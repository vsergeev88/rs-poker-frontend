import './Game-result.scss';

import { Box, Container } from '@material-ui/core';
import React, { FC, useContext } from 'react';

import { Card, ExportToExcel, Issue } from '../../Components';
import { TitleAdd3 } from '../../Components/titles';
import { AppContext } from '../../content/app-state';

const GameResult: FC = () => {
  const appState = useContext(AppContext);

  return (
    <Box className="game-results">
      <Container className="game-results__wrapper">
        <TitleAdd3>Game is finished. See results below.</TitleAdd3>
        <div className="export_btn">
          <ExportToExcel />
        </div>
        <Box className="issues__wrapper">
          <Box className="cards-wrapper_column mb-20">
            {appState?.issues &&
              appState?.issues.map((el) => (
                <Box key={el.issueID}>
                  <Issue issue={el} isLobby={false} />
                  <Box className="cards-wrapper justify-content-start mb-20">
                    {appState?.cardsDeck.length
                      ? appState?.cardsDeck.map((el, key) => (
                          <Card
                            propCardValue={el}
                            shortScoreType={'SP'}
                            allowEdit={false}
                            cardIndex={key}
                            key={key}
                          />
                        ))
                      : ''}
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default GameResult;
