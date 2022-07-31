import React from 'react';
import styled from "styled-components";
import Filter from "../pages/HomePage/filter";
import Intro from   "../pages/HomePage/intro";
import About from '../pages/HomePage/about';
import School from '../pages/HomePage/school';
import StudSec from '../pages/HomePage/studSec';
import Review from '../pages/HomePage/Review';

import {Room,Instagram,Twitter} from '@mui/icons-material';
import {Flex,Text,Center} from '@chakra-ui/react';
import styles from '../styles/Home.module.css'

export default function Index(){
  return(
      <StyledContainer className={styles.scrollbar} >
        <Filter />
        <Intro/>
        <About/>
        <School/>
        <StudSec />
      </StyledContainer>
  )
}

//Styled components 

const StyledContainer = styled.div`
  width: 100vw;
  overflow-y: ;
`