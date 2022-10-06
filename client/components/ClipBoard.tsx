import axios from 'axios'; // to be used by handleClear
import React, { ChangeEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Box, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  setServer,
  deleteSnippets,
  getSnippets,
  clearClipboardState
} from '../redux/reducers/ClipBoardReducers';
import ClipboardButton from './ClipboardButton';

const ClipBoard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const projectId = Number(useParams().projectId);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const buttonText = (isLoggedIn) ? 'Delete Project' : 'Clear Clipboard'

  const server: string = useAppSelector((state) => state.clipboard.server);
  const codeDisplay: string = useAppSelector((state) => state.clipboard.codeDisplay);
  
  const updateServer = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setServer(e.target.value));
  };

  const handleClear = () => {
    if (sessionStorage.getItem('isLoggedIn')) {
      dispatch(deleteSnippets(projectId));
      navigate('/');
    } else {
      dispatch(clearClipboardState());
    }
  };
  // need to discuss how to implement handleClear to match the back-end

  useEffect(() => {
    dispatch(getSnippets(projectId))
  });

  return (
    <div className="page-body">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          width: 800
        }}
        className="code-container"
      >
        <TextField
          label="Server URL"
          sx={{ width: '300px' }}
          value={ server }
          error={ server === '' }
          onChange={ updateServer }
        ></TextField>
        <TextField
          id="main-clipboard"
          multiline
          rows={ 30 }
          value={ codeDisplay }
          sx={{
            width: 0.95,
            fontFamily: 'Source Code Pro'
          }}
        />
        <ClipboardButton />
        <Button
          onClick={ handleClear }
          sx={{
            flexDirection: 'column'
          }}
        >
          <DeleteForeverIcon /> { buttonText }
        </Button>
      </Box>
    </div>
  );
};

export default ClipBoard;
