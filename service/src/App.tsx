/** @jsxImportSource @emotion/react */
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from '@/styles/global';
import theme from '@/styles/theme';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter } from 'react-router-dom';
import Router from '@/route';
import store from '@/redux/store';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({});

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  const library = new Web3Provider(provider, 'any');
  return library;
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </Web3ReactProvider>
  );
}

export default App;
