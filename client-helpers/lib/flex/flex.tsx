import { Fragment, Children, useMemo, useCallback, memo } from 'react';
import { FlexBlock } from './flex-styles';
import { IFlexProps } from './types';

const wrapChildren = (children: any, index: number, separator: React.ReactElement | null) => (
    <Fragment key={index}>
        {children}
        {separator}
    </Fragment>
);

const FlexBase = (props: IFlexProps) => {

    const {
        children, separator, height, inline,
        alignment, justify, alignContent, justifyContent, width,
        gap, orientation, flip, wrap, hidden, ...rest
    } = props;

    const childrenCount = useMemo(() => Children.count(children), [children]);
    const separatorElement = useMemo(() => (childrenCount > 1 && separator ? separator({ alignment, gap, orientation }) : null), [childrenCount, separator, alignment, gap, orientation]);

    const wrapChildrenWithSeparators = useCallback((child: any, index: number) => {

        if (!separatorElement || index === childrenCount - 1) {
            return wrapChildren(child, index, null);
        }
        return wrapChildren(child, index, separatorElement);

    }, [childrenCount, separatorElement]);

    return (
        <>
            {hidden ? null :
                <FlexBlock {...rest}
                    $inline={inline}
                    $height={height} $width={width}
                    $flip={flip} $gap={gap} $wrap={wrap} $orientation={orientation}
                    $alignment={alignment} $justify={justify} $alignContent={alignContent} $justifyContent={justifyContent}>
                    {Children.map(children, wrapChildrenWithSeparators)}
                </FlexBlock>}
        </>
    );
};

export const Flex = memo(FlexBase);

Flex.displayName = 'Flex';
