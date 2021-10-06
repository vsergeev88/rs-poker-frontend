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
              appState?.issues.map((issue) => (
                <Box key={issue.issueID}>
                  <Issue issue={issue} isLobby={false} />
                  <Box className="cards-wrapper justify-content-start mb-20">
                    {issue.poolResults?.isVotingPassed ? (
                      <DisplayData data={issue.poolResults?.votes} />
                    ) : (
                      <span className="results-card__text">Not voted</span>
                    )}
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

interface IProps {
  data: Record<string, string>;
}

const DisplayData: FC<IProps> = ({ data }) => {
  const votesNumber = Object.keys(data).length;
  console.log(votesNumber);
  const votedStats: Record<string, number> = {};
  for (let keys in data) {
    votedStats[data[keys]] = votedStats[data[keys]] + 1 || 1;
  }
  const displayData = Object.entries(votedStats);
  console.log(displayData);

  return (
    <>
      {displayData.map((el) => {
        let [card, number] = el;
        if (Number.isInteger(+card)) card += ' SR';
        return (
          <div className="results-card__info" key={card}>
            <Card propCardValue={card} shortScoreType={'SP'} allowEdit={false} />
            <span className="results-card__text">
              {((number / votesNumber) * 100).toFixed(1)}%
            </span>
          </div>
        );
      })}
    </>
  );
};
