import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useGetFetch } from '../hooks';
import { Flex } from '../lib';

interface IFooterProps {
    className?: string;
    isSmallScreen?: boolean;
}

interface IPredictionResult {
    lastUpdateAt: number;
}

function LastUpdateTime({ className }: { className?: string }) {
    const [isReady, studyInfo, error] = useGetFetch<IPredictionResult>('api/get-latest-update-time', true);
    const { t } = useTranslation();
    if (!isReady) {
        return null;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <span className={className}>{t('label.lastUpdatedAt')}: {(new Date(studyInfo?.lastUpdateAt || 0)).toLocaleTimeString()}</span>;
}

const Anchor = styled.a`
    display: inline-block;
    height: 100%;
    line-height: 20px;
    text-decoration: none;
    color: #fefefe;
`;

export const Footer = styled((props: IFooterProps) => {
    const { className } = props;
    const { t } = useTranslation();
    return (
        <Flex className={className} orientation="horizontal" justifyContent="space-between" alignment="center">
            <Anchor href="https://twitter.com/ProInvestopedia" target="_blank" rel="noreferrer">
                <Flex orientation="horizontal" gap="5" alignment="center" inline>
                    <img alt="twitter" src="/assets/images/twitter-white.svg" height="16px" width="16px" />
                    <span>{t('label.followUsOnTwitter')}</span>
                </Flex>
            </Anchor>
            <LastUpdateTime />
        </Flex>
    );
})`
    flex-grow: 0;
    flex-shrink: 0;
    height: 20px;
    padding: 0 ${({ isSmallScreen }) => isSmallScreen ? '3px' : '40px'};
    font-size: ${({ isSmallScreen }) => isSmallScreen ? '10px' : '12px'};
    color: #fefefe;
    background: linear-gradient(0deg, rgba(185,0,80,1) 0%, rgba(151,20,77,1) 100%);
    box-shadow: darkgrey 0px -1px 5px;
`;