import './Connect-dialog.scss';

import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Input,
  InputLabel,
  Switch,
} from '@material-ui/core';
import React, { FunctionComponent, useState } from 'react';

import { uploadAvatar } from '../../Api/cloudinary';
import { getCapitalLetters } from '../../utils/formatters';
import { Transition } from '../transition';

const ConnectDialog: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [isObserver, setObserver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [imgUrl, setUrl] = useState('');
  const [isNameDirty, setNameDirty] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setName('');
    setLastName('');
    setJobPosition('');
    setObserver(false);
    setOpen(false);
    setSelectedFile(undefined);
    setUrl('');
    setNameDirty(false);
  };

  const setAvatar = async () => {
    let url = await uploadAvatar(selectedFile);
    setUrl(url);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Connect
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        className="dialog-wrapper">
        <DialogContent className="dialog-content">
          <div className="title-wrapper">
            <span className="large-text">Connect to lobby</span>
            <div className="switch-container">
              <span className="switch-text">Connect as observer</span>
              <Switch
                checked={isObserver}
                onChange={() => {
                  setObserver(!isObserver);
                }}
                color="primary"
                name="observer"
              />
            </div>
          </div>
          <div className="content-wrapper">
            <div className="input-wrapper">
              <FormControl required>
                <InputLabel htmlFor="component-simple">Your first name:</InputLabel>
                <Input
                  id="component-simple"
                  value={name}
                  onBlur={() => setNameDirty(true)}
                  onChange={(event) => {
                    setName(event.target.value);
                    setNameDirty(true);
                  }}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">
                  Your last name (optional):
                </InputLabel>
                <Input
                  id="component-simple"
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">
                  Your job position (optional):
                </InputLabel>
                <Input
                  id="component-simple"
                  value={jobPosition}
                  onChange={(event) => {
                    setJobPosition(event.target.value);
                  }}
                />
              </FormControl>
              <div className="choose-file-wrapper">
                <label htmlFor="image_uploads" className="choose-file_label">
                  {selectedFile ? selectedFile.name : `Choose file`}
                </label>
                <input
                  id="image_uploads"
                  className="choose-file_input"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files?.length) setSelectedFile(e.target.files[0]);
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={setAvatar}
                  disabled={!selectedFile}>
                  Upload
                </Button>
              </div>
              <Avatar alt={`${name} ${lastName}`} src={imgUrl}>
                {!imgUrl ? (name ? getCapitalLetters(name, lastName) : 'NN') : ''}
              </Avatar>
            </div>
            <div className="errors-wrapper">
              {isNameDirty && !name && (
                <span className="error-text">Enter your name</span>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Confirm
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConnectDialog;
