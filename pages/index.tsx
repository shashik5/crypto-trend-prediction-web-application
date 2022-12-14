import { Card, Loading, useMediaQuery } from '@geist-ui/core';
import type { NextPage } from 'next';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { StudyInfo, useGetFetch } from '../client-helpers';
import { Flex } from '../client-helpers/lib';
import { IStudyInfo } from '../types';

const StudyInfoContainer = styled(Flex) <{ $isSmallScreen?: boolean, $isMediumScreen?: boolean }>`
  width: ${({ $isSmallScreen, $isMediumScreen }) => ($isSmallScreen ? '100%' : ($isMediumScreen ? '85%' : '70%'))};
  text-align: center;
  box-sizing: border-box;
`;

const StudyInfoHeader = styled.h4`
  margin-bottom: 0;
  text-align: center;
  box-sizing: border-box;
`;

const Main = styled(Flex) <{ $isSmallScreen?: boolean }>`
  padding: ${({ $isSmallScreen }) => $isSmallScreen ? '10px' : '20px'};
  box-sizing: border-box;
`;

const DisclaimerText = styled(Flex) <{ $isSmallScreen?: boolean }>`
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  width: ${({ $isSmallScreen }) => $isSmallScreen ? '100%' : '70%'};
`;

const DiscriptionWrapper = styled.p<{ $isSmallScreen?: boolean }>`
  margin-top: 0;
  text-align: center;
  width: ${({ $isSmallScreen }) => $isSmallScreen ? '100%' : '80%'};
`;

const Home: NextPage = () => {
  const [isReady, studyInfo, error] = useGetFetch<IStudyInfo[]>('api/get-available-study-info');
  const { t } = useTranslation();
  const isXs = useMediaQuery('xs');
  const isMd = useMediaQuery('md');
  const isSm = useMediaQuery('sm');
  const isLg = useMediaQuery('lg');

  if (!isReady) {
    return <Loading scale={2} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Main gap="20" orientation="vertical" width="100%" height="100%" alignment="center" $isSmallScreen={isXs}>
      <Fragment>
        {
          studyInfo?.map((studyInfoProps) => (
            <StudyInfoContainer
              gap="16"
              key={studyInfoProps.study}
              $isSmallScreen={isXs || isSm}
              $isMediumScreen={isMd || isLg}
              orientation="vertical"
              alignment="center">
              <StudyInfoHeader>{t(`heading.${studyInfoProps.study}`)}</StudyInfoHeader>
              <DiscriptionWrapper>
                {t('description.candleTypePrediction')}
              </DiscriptionWrapper>
              <StudyInfo {...studyInfoProps} />
            </StudyInfoContainer>
          ))
        }
      </Fragment>
      <DisclaimerText justifyContent="center" $isSmallScreen={isXs}>
        <Card>
          {t('description.disclaimer')}
        </Card>
      </DisclaimerText>
    </Main>
  );
};

export default Home;
