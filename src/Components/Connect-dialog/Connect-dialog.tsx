import './connect-dialog.scss';

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
import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { uploadAvatar } from '../../Api/cloudinary';
import { SocketContext } from '../../content/socket';
import { getCapitalLetters } from '../../utils/formatters';
import { Transition } from '../transition';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  roomId?: string;
  createMode?: boolean;
}

const ConnectDialog: FC<IProps> = ({ roomId, createMode }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [isObserver, setObserver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [imgUrl, setUrl] = useState('');
  const [isNameDirty, setNameDirty] = useState(false);
  const socket = useContext(SocketContext);
  const history = useHistory();

  const handleSubmit = () => {
    if (createMode) {
      socket?.emit(
        'createRoom',
        { name, lastName, position: jobPosition, observer: isObserver, imgUrl },
        (tmp: string) => {
          console.log('room created: ' + tmp);
        },
      );
    } else {
      socket?.emit(
        'login',
        { name, lastName, jobPosition, isObserver, imgUrl },
        roomId,
        (name1: string, tmp: string) => {
          console.log(name1 + ' logged to room: ' + tmp);
        },
      );
    }
    history.push('/lobby');
    handleClose();
  };

  const handleClickOpen = () => {
    if (createMode) {
      setOpen(true);
    } else {
      socket?.emit('checkRoom', roomId, (isMatched: boolean) => {
        isMatched ? setOpen(true) : setOpen(false);
      });
    }
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
        {createMode ? 'Start new game' : 'Connect'}
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
            <span className="large-text">
              {createMode ? 'Start new game' : 'Connect to lobby'}
            </span>
            {!createMode && (
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
            )}
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
                <label
                  htmlFor={createMode ? 'image_master' : 'image_user'}
                  className="choose-file_label">
                  {selectedFile ? selectedFile.name : `Choose file`}
                </label>
                <input
                  id={createMode ? 'image_master' : 'image_user'}
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
              <Avatar alt={`${name} ${lastName}`} src={imgUrl} className="avatar">
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
          <Button variant="contained" onClick={handleSubmit} color="primary">
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
