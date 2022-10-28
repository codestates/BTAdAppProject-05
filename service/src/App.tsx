/** @jsxImportSource @emotion/react */
import { ThemeProvider} from '@emotion/react';
import GlobalStyle from '@/styles/global';
import theme from '@/styles/theme';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import Router from '@/route';
import store from '@/redux/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;