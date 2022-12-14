import styled from 'styled-components';
import { Flex } from './flex';

interface INameValuePairProps {
    className?: string;
    name: string;
    value: React.ReactNode;
}

export const NameValuePair = (props: INameValuePairProps) => {
    const { name, value, className } = props;
    return (
        <Flex className={className} orientation="horizontal" gap="10">
            <span>{name}:</span>
            <span>{value}</span>
        </Flex>
    );
};