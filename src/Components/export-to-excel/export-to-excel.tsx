import './export-to-excel.scss';

import { Button } from '@material-ui/core';
import { saveAs as fileSaverSaveAs } from 'file-saver';
import React, { FC, useContext, useEffect, useState } from 'react';
import { utils as XLSXUtils, write as XLSXWrite } from 'xlsx';

import { AppContext } from '../../content/app-state';

const exportSettings = {
  fileType:
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  fileExtension: '.xlsx',
  fileName: 'planing-results',
};

type TExportData = {
  name: string;
  link: string;
  priority: string;
};

const ExportToExcel: FC = () => {
  const [results, setResults] = useState<TExportData[]>([]);
  const { fileType, fileExtension, fileName } = exportSettings;
  const appState = useContext(AppContext);

  useEffect(() => {
    if (appState?.issues.length) {
      const data = appState?.issues.map((el) => {
        const { name, link, priority, poolResults } = el;
        const voted = poolResults?.isVotingPassed ? 'yes' : 'no';

        const votes = poolResults?.votes;
        const votesData: Record<string, number> = {};

        appState?.cardsDeck.forEach((el) => {
          votesData[el] = 0;
          for (let key in votes) {
            if (votes[key] === el) votesData[votes[key]] = votesData[votes[key]] + 1 || 1;
          }
        });

        return { name, link, priority, voted, ...votesData };
      });
      setResults(data);
    }
  }, []);

  const exportToCSV = () => {
    const ws = XLSXUtils.json_to_sheet(results, {
      header: ['name', 'link', 'priority', 'voted'],
    });
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSXWrite(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    fileSaverSaveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <Button className="p-10" variant="contained" color="primary" onClick={exportToCSV}>
        Download Results
      </Button>
    </>
  );
};

export default ExportToExcel;
