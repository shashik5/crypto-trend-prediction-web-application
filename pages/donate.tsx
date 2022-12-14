import { Card, useMediaQuery, Text, Tabs } from '@geist-ui/core';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CryptoWalletInfo, Paypal, Flex } from '../client-helpers';

const Main = styled(Flex)`
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  box-sizing: border-box;
`;

const ContentWrapper = styled(Flex) <{ $isSmallScreen?: boolean }>`
  padding: 0 ${({ $isSmallScreen }) => $isSmallScreen ? '0' : '10px'};
  width: ${({ $isSmallScreen }) => $isSmallScreen ? '100%' : '60%'};
`;

const Donate: NextPage = () => {
  const isXs = useMediaQuery('xs');
  const { t } = useTranslation();
  return (
    <Main orientation="vertical" gap="20" width="100%" height="100%" alignment="center">
      <Header>{t('heading.donate')}</Header>
      <ContentWrapper $isSmallScreen={isXs}>
        <Card>
          <Text p>{t('description.whyDonate')}</Text>
          <Tabs initialValue="1">
            <Tabs.Item label={t('label.crypto')} value="1">
              <CryptoWalletInfo />
            </Tabs.Item>
            <Tabs.Item label={t('label.paypal')} value="2">

              <Paypal />
            </Tabs.Item>
          </Tabs>
        </Card>
      </ContentWrapper>
    </Main>
  );
};

export default Donate;
