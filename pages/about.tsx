import { Card, useMediaQuery, Text, Link } from '@geist-ui/core';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Flex } from '../client-helpers';

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
  width: ${({ $isSmallScreen }) => $isSmallScreen ? '100%' : '60%'};
`;

const SocialMedia = styled(Flex)`
  font-size: 14px;
`;

const About: NextPage = () => {
  const isXs = useMediaQuery('xs');
  const { t } = useTranslation();
  return (
    <Main orientation="vertical" gap="20" width="100%" height="100%" alignment="center">
      <Header>{t('heading.about')}</Header>
      <ContentWrapper $isSmallScreen={isXs}>
        <Card>
          <Text p>{t('description.aboutTheProject')}</Text>
          <Link href="https://twitter.com/ProInvestopedia" width="100%" target="_blank">
            <SocialMedia justifyContent="center" alignment="center" width="100%" gap="8">
              <img alt="twitter" src="./assets/images/twitter-blue.svg" style={{ width: '26px' }} />
              <Text span>{t('label.followUsOnTwitter')}</Text>
            </SocialMedia>
          </Link>
        </Card>
      </ContentWrapper>
    </Main>
  );
};

export default About;
