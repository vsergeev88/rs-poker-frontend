import './issue.scss';

import { Radio, TextField } from '@material-ui/core';
import { CheckCircle, Delete, DeleteOutline, Edit } from '@material-ui/icons';
import React, { FC, useState } from 'react';

import { TIssue, TPriority } from '../../data/game';
import CustomDialog from '../dialog';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  issue: TIssue;
  isLobby: boolean;
}

const Issue: FC<IProps> = ({ issue, isLobby }) => {
  const { issueID, name, current, priority } = issue;
  const [editMode, setEditMode] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [openDelDialog, setDelDialog] = useState(false);
  const [checkedPriority, setPriority] = useState(priority);
  const [changedName, setName] = useState(name);

  const handleOpen = () => {
    setEditMode(true);
  };

  const handleClose = () => {
    setEditMode(false);
    //TODO!! change ISSUE info on server
    console.log(
      `Edit issue ${issueID}: name-${changedName}, priority-${checkedPriority}`,
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(event.target.value as TPriority);
  };

  const closeDelDialog = () => {
    setTimeout(() => {
      setDelDialog(false);
    }, 500);
  };

  const deleteIssue = () => {
    closeDelDialog();
    //TODO!! delete ISSUE on server
    console.log(`Delete Issue: ${issueID}`);
  };

  return (
    <div role="none" className="issue_container">
      {current && <div className="current-cover"></div>}
      <div className="player-info_container">
        {current && <span className="current-issue_text">current</span>}
        <span className="issue-name_text">{name}</span>
        <span className="issue-priority_text">{priority} priority</span>
      </div>
      {isLobby && (
        <>
          <Edit className="edit-icon" onClick={handleOpen} />
          <div hidden={mouseOver}>
            <DeleteOutline
              className="delete-icon"
              onMouseOver={() => {
                setMouseOver(true);
              }}
              onMouseLeave={() => {
                setMouseOver(false);
              }}
            />
          </div>
          <div hidden={!mouseOver}>
            <Delete
              className="delete-icon"
              onMouseOver={() => {
                setMouseOver(true);
              }}
              onMouseLeave={() => {
                setMouseOver(false);
              }}
              onClick={() => {
                setDelDialog(true);
              }}
            />
            {openDelDialog && (
              <CustomDialog
                handleNegative={() => {
                  closeDelDialog();
                }}
                handlePositive={() => {
                  deleteIssue();
                }}
                isOpen={openDelDialog}>
                <span className="large-text">Delete issue?</span>
                <div className="message-text">
                  <span> Do you want to erase issue </span>
                  <span className="colored-text">{name}</span>
                  <span> ?</span>
                </div>
              </CustomDialog>
            )}
          </div>
        </>
      )}
      {editMode && (
        <div className="edit-issue_wrapper">
          <div className="edit-captions_wrapper">
            <div className="edit_caption">Issue:</div>
            <div className="edit_caption">Priority:</div>
          </div>
          <div className="edit-group_container">
            <TextField
              id="standard-basic"
              size="small"
              defaultValue={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="radio-group_container">
              <Radio
                className="radio"
                checked={checkedPriority === 'Low'}
                onChange={handleChange}
                value="Low"
                name="radio-button-demo"
                size="small"
              />
              <span className="radio_label">low</span>
              <Radio
                className="radio"
                checked={checkedPriority === 'Middle'}
                onChange={handleChange}
                value="Middle"
                name="radio-button-demo"
                size="small"
              />
              <span className="radio_label">middle</span>
              <Radio
                className="radio"
                checked={checkedPriority === 'Hight'}
                onChange={handleChange}
                value="Hight"
                name="radio-button-demo"
                size="small"
              />
              <span className="radio_label">hight</span>
            </div>
          </div>
          <CheckCircle onClick={handleClose} className="done-icon" />
        </div>
      )}
    </div>
  );
};

export default Issue;
