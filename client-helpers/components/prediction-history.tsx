import { Loading, Table } from '@geist-ui/core';
import { Fragment, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { usePostFetch } from '../hooks';
import { toTimeString } from '../utils';
import { ColoredLabel } from '../lib';
import styled from 'styled-components';

interface IPredictionHistoryProps {
    study: string;
    interval: string;
    symbol: string;
    onRenderValue(prediction: any): JSX.Element;
}

interface IPredictionHistoryResult {
    prediction: any;
    openTime: number;
    result: string;
}

const TimeWrapper = styled.span`
    display: inline-block;
    width: 120px;
`;

export function PredictionHistory(props: IPredictionHistoryProps) {
    const { study, interval, symbol, onRenderValue } = props;
    const [isReady, predictionHistory = [], error] = usePostFetch<IPredictionHistoryResult[]>('api/get-prediction-history', { study, interval, symbol }, true);
    const { t } = useTranslation();

    const onRenderTime = useCallback((value: number) => <TimeWrapper>{toTimeString(value)}</TimeWrapper>, []);

    if (!isReady) {
        return <Loading scale={2} />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Table data={predictionHistory}>
            <Table.Column prop="closeTime" label={t(`label.closeTime`)} render={onRenderTime} />
            <Table.Column prop="prediction" label={t(`label.prediction`)} render={onRenderValue} />
            <Table.Column prop="result" label={t(`label.result`)} render={onRenderValue} />
        </Table>
    );
}