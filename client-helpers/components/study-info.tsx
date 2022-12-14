import { useMediaQuery } from '@geist-ui/core';
import { Fragment } from 'react';
import styled from 'styled-components';
import { IStudyInfo } from '../../types';
import { Flex } from '../lib';
import { CandleTypePrediction } from './candle-type-prediction';

interface IStudyInfoProps extends IStudyInfo {
}

const Container = styled.div`
    flex-grow: 0;
    flex-shrink: 0;
    min-width: 340px;
    max-width: 360px;

    .card {
        box-shadow: #c9c9c9 0px 0px 5px !important;
    }
`;

export function StudyInfo(props: IStudyInfoProps) {
    const { study, intervals, symbols } = props;
    const isXs = useMediaQuery('xs');

    return (
        <Flex gap="16" orientation={isXs ? 'vertical' : 'horizontal'} justifyContent="center" alignment="flex-start" alignContent="space-between" wrap={!isXs}>
            <Fragment>
                {
                    symbols.map((symbol) => {
                        return intervals.map((interval) => {
                            return (
                                <Container key={`${study}_${symbol}_${interval}`}>
                                    <CandleTypePrediction study={study} interval={interval} symbol={symbol} />
                                </Container>
                            );
                        });
                    })
                }
            </Fragment>
        </Flex>
    );
}