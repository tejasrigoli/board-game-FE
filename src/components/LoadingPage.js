import styled from 'styled-components';
import React from 'react';
import loader from '../images/loading.gif'

const LoadingPage = () =>(
    <Loader className="loader">
      <img  src={loader} alt="loading..." />
    </Loader>
);

const Loader = styled.div`
display: flex;
height: 100vh;
width: 100vw;
align-items: center;
justify-content: center;
`

export default LoadingPage;