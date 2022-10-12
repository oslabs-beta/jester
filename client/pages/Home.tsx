import React, { useEffect } from 'react';
import { CodeGenerator } from './CodeGenerator';
import axios from 'axios';
import { useAppDispatch } from '../redux/hooks';
import { setProjectsInfo } from '../redux/reducers/userInfoSlice';

const Home = () => {
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn')) {
      axios.get('/api/project').then((res) => {
        dispatch(setProjectsInfo(res.data));
      });
    }
  });
  return <CodeGenerator />;
};

export default Home;
