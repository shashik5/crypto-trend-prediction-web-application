import { GeistProvider, CssBaseline, useMediaQuery } from '@geist-ui/core';
import { useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import backend from 'i18next-http-backend';
import Head from 'next/head';
import { ClientOnly, EventManagerContext, Footer, MainMenu, UpdateNotifier } from '../client-helpers';
import { EventName } from '../types';
import { EventManager } from '../utils/event-manager';


const GlobalStyles = createGlobalStyle`
    html, body {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        font-family: "Helvetica Neue", "Helvetica", "Arial", "sans-serif";
    }

    body {
        overflow: hidden;
        background-size: auto;
        background-image: url("./assets/images/dots.svg");
    }
`;

const Root = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    color: #3B4455;
    background-image: url("./assets/images/poly-lumi-light.svg");
    background-size: cover;
  `;

const ContentWrapper = styled.div`
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
`;

i18n
    .use(detector)
    .use(backend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',

        interpolation: {
            escapeValue: false
        }
    });

const App = ({ Component, pageProps }: any) => {
    const emRef = useRef(new EventManager<EventName>());
    const isXs = useMediaQuery('xs');
    return (
        <GeistProvider>
            <EventManagerContext.Provider value={emRef.current}>
                <Head>
                    <title>Investopedia Pro</title>
                    <meta name="description" content="An application to predict Crypto market trends using Machine learning models." />
                    <meta name="keywords" content="Bitcoin, Crypto Market, Ethereum, BTC, ETH, USDT, Prediction, Machine Learning" />
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"></meta>
                    <link rel="icon" href="/favicon.ico?v=M44lzPylqQ" />
                </Head>
                <GlobalStyles />
                <CssBaseline />
                <UpdateNotifier eventName={EventName.newUpdateAvailable} />
                <Root>
                    <ClientOnly>
                        <MainMenu />
                        <ContentWrapper>
                            <Component {...pageProps} />
                        </ContentWrapper>
                        <Footer isSmallScreen={isXs} />
                    </ClientOnly>
                </Root>
            </EventManagerContext.Provider>
        </GeistProvider>
    );
};

export default App;