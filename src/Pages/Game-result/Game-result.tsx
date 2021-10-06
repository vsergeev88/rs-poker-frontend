import './Game-result.scss';

import { Box, CircularProgress, Container } from '@material-ui/core';
import React, { FC, Suspense, useContext } from 'react';

import { Card, Issue } from '../../Components';
import { TitleAdd3 } from '../../Components/titles';
import { AppContext } from '../../content/app-state';

const ExportToExcel = React.lazy(
  () => import('../../Components/export-to-excel/export-to-excel'),
);

const GameResult: FC = () => {
  const appState = useContext(AppContext);

  return (
    <Box className="game-results">
      <Container className="game-results__wrapper">
        <TitleAdd3>Game is finished. See results below.</TitleAdd3>
        <div className="export_btn">
          <Suspense fallback={<CircularProgress />}>
            <ExportToExcel />
          </Suspense>
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
  const appState = useContext(AppContext);

  const votesNumber = Object.keys(data).length;
  const votedStats: Record<string, number> = {};
  for (let keys in data) {
    votedStats[data[keys]] = votedStats[data[keys]] + 1 || 1;
  }
  const displayData = Object.entries(votedStats);

  return (
    <>
      {displayData.map((el) => {
        let [card, number] = el;
        if (Number.isInteger(+card)) card += ` ${appState?.settings.scoreTypeShort}`;
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
