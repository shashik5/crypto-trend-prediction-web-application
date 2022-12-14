import { Button, Input, Loading, Text, useClipboard, useMediaQuery, useToasts } from '@geist-ui/core';
import { Copy } from '@geist-ui/icons';
import { Fragment, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ICryptoWalletInfo } from '../../types';
import { useGetFetch } from '../hooks';
import { Flex } from '../lib';

interface IWalletInfoProps extends ICryptoWalletInfo {
    className?: string;
}

const WalletInfo = styled((props: IWalletInfoProps) => {
    const { address, name, network, className } = props;
    const { copy } = useClipboard();
    const { setToast } = useToasts();
    const isXs = useMediaQuery('xs');
    const { t } = useTranslation();

    const tokenName = t(`cryptoToken.${name}`);

    const onClick = useCallback(() => {
        copy(address);
        setToast({ text: t('message.coppiedAddress').replace('${name}', tokenName), type: 'secondary' });
    }, [copy, address, setToast, t, tokenName]);

    return (
        <div className={className}>
            <Text h6>{tokenName}</Text>
            <Flex orientation="horizontal" gap="10" alignment="center">
                <Input width={isXs ? 16 : 40} disabled value={address} label={network} readOnly scale={0.8} />
                <span />
                <Button auto scale={0.3} onClick={onClick} icon={<Copy />} title={t('label.copyToClipboard')} />
            </Flex>
        </div>
    );
})`
    border-radius: 4px;
    padding: 10px;
    background-color: #fefefe;
    box-shadow: #cfcfcf 0px 0px 3px;
`;

export function CryptoWalletInfo(props: { className?: string }) {
    const [isReady, walletInfo, error] = useGetFetch<ICryptoWalletInfo[]>('api/get-crypto-wallet-info');
    const { t } = useTranslation();
    if (!isReady) {
        return <Loading scale={2} />;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (!walletInfo || walletInfo.length === 0) ? (
        <div>{t('message.noWallets')}</div>
    ) : (
        <Flex className={props.className} gap="12" orientation="vertical" width="100%" alignment="center">
            <Fragment>
                {
                    walletInfo.map(wallet => (
                        <WalletInfo {...wallet} key={wallet.name} />
                    ))
                }
            </Fragment>
        </Flex>
    );
}