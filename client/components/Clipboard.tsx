import React, { ChangeEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Box, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  setServer,
  getSnippets,
  clearClipboardState,
} from '../redux/reducers/clipboardSlice';
import ClipboardButton from './ClipboardButton';
import { deleteProject } from '../redux/reducers/userInfoSlice';

/*
This component will display code snippets from a given project in the database if a 
user is logged in, or from state if a user is not logged in
*/

const Clipboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const projectId = Number(useParams().projectId);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const buttonText = isLoggedIn ? 'Delete Project' : 'Clear Clipboard';

  const server: string = useAppSelector((state) => state.clipboard.server);
  const codeDisplay: string = useAppSelector(
    (state) => state.clipboard.codeDisplay
  );

  const elementArr: JSX.Element[] = [];
  codeDisplay.split('\n').forEach((el) => {
    elementArr.push(
      <pre>
        { el }
      </pre>
    );
  });
  

  const updateServer = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setServer(e.target.value));
  };

  const handleClear = () => { 
    if (isLoggedIn) {
      dispatch(deleteProject(projectId));
      navigate('/');
    } else {
      dispatch(clearClipboardState());
    }
  };

  useEffect(() => {
    if (isLoggedIn) { 
      // fetch code snippets from db if user logged in
      dispatch(getSnippets(projectId));
    }
  });

  return (
    <div className="page-body">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          width: 800,
        }}
        className="code-container"
      >
        <TextField
          className="text-display"
          label="Server URL"
          sx={{ width: 300 }}
          value={ server }
          error={ server === '' }
          onChange={ updateServer }
        ></TextField>
        <Box 
          sx={{ 
            width: 800, 
            height: 500,
            overflow: 'auto',
            color: 'white',
            backgroundColor: '#011E3C',
            p: 3,
          }}
        >
          <div id="main-clipboard">
            { elementArr }
          </div>
        </Box> 
        <ClipboardButton />
        <Button
          onClick={ handleClear }
          sx={{ flexDirection: 'column' }}
        >
          <DeleteForeverIcon /> 
          { buttonText }
        </Button>
      </Box>
    </div>
  );
};

export default Clipboard;