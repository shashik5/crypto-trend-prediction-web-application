import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface IColoredLabelProps {
    className?: string;
    label: string;
}

const COLOR_MAP: { [key: string]: string } = {
    bearish: '#bc0000',
    bullish: 'green'
};

export const ColoredLabel = styled(({ label, className }: IColoredLabelProps) => {
    const { t } = useTranslation();
    return (
        <div className={className}>
            {t(`label.${label}`)}
        </div>
    );
})`
    font-weight: 700;
    color: ${({ label }) => COLOR_MAP[label.toLowerCase()] ?? 'initial'};
`;