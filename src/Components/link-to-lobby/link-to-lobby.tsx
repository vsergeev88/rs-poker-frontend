import './link-to-lobby.scss';

import { Box, Button, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import React from 'react';

import { TitleAdd1 } from '../titles';

interface ILobbyLink {
  value: string;
}

const LinkToLobby: FC<ILobbyLink> = ({ value }) => {
  const [copyText, setCopyText] = useState<string | undefined>(value);
  const [copyTextBtn, setCopyTextBtn] = useState('Copy');

  const { enqueueSnackbar } = useSnackbar();

  const copyUrlLobby = (copyText: string | undefined) => {
    if (copyText) {
      navigator.clipboard.writeText(copyText);
      setCopyTextBtn('Copied');
      enqueueSnackbar('Copied', { variant: 'success' });
    }
  };

  return (
    <Box className="link-to-lobby">
      <TitleAdd1 className="label-link-to-lobby text-center">Lobby ID:</TitleAdd1>
      <Box className="copy-to-lobby">
        <TextField
          disabled
          className="input-link-to-label"
          id="outlined-helperText"
          value={value}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          onChange={(e) => {
            setCopyText(e.target.value);
            setCopyTextBtn('Copy');
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => copyUrlLobby(copyText)}>
          {copyTextBtn}
        </Button>
      </Box>
    </Box>
  );
};

export default LinkToLobby;
