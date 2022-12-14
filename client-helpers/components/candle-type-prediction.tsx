import { Button, Card, Loading } from '@geist-ui/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePostFetch } from '../hooks';
import { toTimeString } from '../utils';
import { ColoredLabel, NameValuePair, Flex } from '../lib';
import { PredictionHistory } from './prediction-history';

interface IPredictionProps {
    className?: string;
    study: string;
    interval: string;
    symbol: string;
}

interface IPredictionResult {
    prediction: number;
    closeTime: number;
    openTime: number;
}

const onRenderPrediction = (value: any) => (
    <ColoredLabel label={value === 1 ? 'bullish' : 'bearish'} />
);

export const CandleTypePrediction = (props: IPredictionProps) => {
    const { study, interval, symbol, className } = props;
    const [isReady, studyInfo, error] = usePostFetch<IPredictionResult>('api/get-latest-prediction', { study, interval, symbol }, true);
    const [viewHistory, setViewHistoryState] = useState(false);
    const { t } = useTranslation();

    if (!isReady) {
        return <Loading scale={2} />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const toggleHistoryView = () => setViewHistoryState(!viewHistory);

    return (
        <Card className={className} shadow>
            <Flex orientation="vertical" gap="5">
                <NameValuePair name={t('label.latestCandleTypePrediction')} value={studyInfo ? onRenderPrediction(studyInfo.prediction) : t('message.noPrediction')} />
                <NameValuePair name={t('label.tradingPair')} value={t(`label.${symbol}`)} />
                <NameValuePair name={t('label.timeframe')} value={t(`label.${interval}`)} />
                <NameValuePair name={t('label.predictedAt')} value={toTimeString(studyInfo?.openTime ?? 0)} />
                <NameValuePair name={t('label.closesAt')} value={toTimeString(studyInfo?.closeTime ?? 0)} />
                {
                    viewHistory ? <>
                        <span>{t('label.history')}:</span>
                        <PredictionHistory study={study} interval={interval} symbol={symbol} onRenderValue={onRenderPrediction} />
                    </> : <></>
                }
                <Button onClick={toggleHistoryView}>{t(`button.${viewHistory ? 'hideHistory' : 'showHistory'}`)}</Button>
            </Flex>
        </Card>
    );
};