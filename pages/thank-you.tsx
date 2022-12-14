import { Text } from '@geist-ui/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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

const ThankYou: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 5000);
  }, [router]);

  return (
    <Main orientation="vertical" gap="20" width="100%" height="100%" alignment="center" justifyContent="center">
      <Header>{t('heading.success')}</Header>
      <Text>{t('description.redirectingSoon')}</Text>
    </Main>
  );
};

export default ThankYou;
