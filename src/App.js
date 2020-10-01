import React from 'react';

import GlobalStyle from './styles/globalStyles.js'
import {ThemeProvider} from 'styled-components'

import BillCalculation from './components/BillCalculation.js'

function App() {
  return (
    <ThemeProvider theme= {theme}>
      <GlobalStyle />
      <BillCalculation />
    </ThemeProvider>
  );
}

const theme = {
  bgColor: 'white',
  headingFont: 'Arial' 
}

export default App;
