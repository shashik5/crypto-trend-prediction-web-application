import styled, { css } from 'styled-components';
import { Property } from 'csstype';
import { FlexOrientation, FlexGap } from './types';

interface IFlexBlockProps {
    $height?: string;
    $width?: string;
    $gap?: FlexGap;
    $alignment?: Property.AlignItems;
    $justify?: Property.JustifyItems;
    $alignContent?: Property.AlignContent;
    $justifyContent?: Property.JustifyContent;
    $orientation?: FlexOrientation;
    $flip?: boolean;
    $wrap?: boolean;
    $inline?: boolean;
}

const commonGapStyle = css<IFlexBlockProps>`
    ${({ $orientation, $gap, $wrap }) => $orientation === 'horizontal' && css`
        margin-right:  ${$gap}px;
        ${$wrap && css`margin-bottom: ${$gap}px;`}
    `}

    ${({ $orientation, $gap, $wrap }) => $orientation === 'vertical' && css`
        margin-bottom: ${$gap}px;
        ${$wrap && css`margin-right: ${$gap}px;`}
    `}
`;

const wrappedGapStyle = css<IFlexBlockProps>`
    ${({ $orientation, $gap, $wrap }) => $orientation === 'horizontal' && css`
        ${$wrap && css`margin-bottom:  ${$gap}px;`}
    `}

    ${({ $orientation, $gap, $wrap }) => $orientation === 'vertical' && css`
        ${$wrap && css`margin-right: ${$gap}px;`}
    `}
`;

const defaultGapStyle = css`
    &:not(:last-child) {
        ${commonGapStyle}
    }
    ${wrappedGapStyle}
`;

const flippedGapStyle = css`
    &:not(:first-child) {
        ${commonGapStyle}
    }
    ${wrappedGapStyle}
`;

export const FlexBlock = styled.div<IFlexBlockProps>`
    display: ${({ $inline }) => ($inline ? 'inline-flex' : 'flex')};
    align-items: ${({ $alignment }) => $alignment};
    flex-shrink: 0;
    flex-grow: 0;
    ${({ $height }) => $height && css`height: ${$height};`}
    ${({ $width }) => $width && css`width: ${$width};`}
    ${({ $wrap, $flip }) => ($wrap && css`
        flex-wrap: ${$flip ? 'wrap-reverse' : 'wrap'};
    `)}
    ${({ $justify }) => ($justify && css`
        justify-items: ${$justify};
    `)}
    ${({ $alignContent }) => ($alignContent && css`
        align-content: ${$alignContent};
    `)}
    ${({ $justifyContent }) => ($justifyContent && css`
        justify-content: ${$justifyContent};
    `)}
    flex-direction: ${({ $orientation, $flip }) => (
        ($orientation === 'vertical')
            ? ($flip ? 'column-reverse' : 'column')
            : ($flip ? 'row-reverse' : 'row')
    )};
    
    >* {
        ${({ $flip }) => ($flip ? flippedGapStyle : defaultGapStyle)}
    }
`;

FlexBlock.defaultProps = {
    $orientation: 'horizontal',
    $gap: '8',
    $alignment: 'baseline',
    $inline: true
};

FlexBlock.displayName = 'FlexBlock';
