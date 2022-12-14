import { Property } from 'csstype';

export type FlexGap = '4' | '8' | '12' | '16' | string;
export type FlexOrientation = 'horizontal' | 'vertical';

export interface IFlexProps extends
    Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    className?: string;
    gap?: FlexGap;
    orientation?: FlexOrientation;
    alignment?: Property.AlignItems;
    justify?: Property.JustifyItems;
    alignContent?: Property.AlignContent;
    justifyContent?: Property.JustifyContent;
    children: React.ReactElement | React.ReactElement[];
    flip?: boolean;
    wrap?: boolean;
    height?: string;
    width?: string;
    inline?: boolean;
    hidden?: boolean;
    separator?: (props: {
        gap?: FlexGap;
        orientation?: FlexOrientation;
        alignment?: Property.AlignItems;
    }) => React.ReactElement;
}
