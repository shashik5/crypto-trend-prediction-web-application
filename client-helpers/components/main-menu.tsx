import { Popover, useMediaQuery } from '@geist-ui/core';
import Link from 'next/link';
import { Fragment } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Flex } from '../lib';

interface IMainMenuProps {
    className?: string;
}

const MenuLabel = styled.span`
    font-size: 16px;
    text-decoration: none;
    cursor: pointer;
`;

const MenuLabelColored = styled(MenuLabel)`
    color: #bc0000;
`;

const LogoWrapper = styled(Flex)`
    cursor: default;
    font-size: 20px;
`;

const PopoverMenuWrapper = styled(Flex)`
    padding: 0 5px;
`;

function renderPopoverMenu(t: TFunction) {
    return (
        <PopoverMenuWrapper orientation="vertical" gap="10" inline>
            <Popover.Item><Link href="/"><MenuLabelColored>{t('menu.home')}</MenuLabelColored></Link></Popover.Item>
            <Popover.Item><Link href="/donate"><MenuLabelColored>{t('menu.donate')}</MenuLabelColored></Link></Popover.Item>
            <Popover.Item><Link href="/about"><MenuLabelColored>{t('menu.about')}</MenuLabelColored></Link></Popover.Item>
        </PopoverMenuWrapper>
    );
}

export const MainMenu = styled((props: IMainMenuProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const isXS = useMediaQuery('xs');
    return (
        <Flex className={className} orientation="horizontal" justifyContent="space-between" alignment="center">
            <LogoWrapper orientation="horizontal" gap="10" alignment="center">
                <img alt="logo" src="./assets/images/logo-white.svg" width="32px" height="32px" />
                <span>{t('heading.title')}</span>
            </LogoWrapper>
            <Fragment>
                {
                    isXS ? (
                        <Popover content={renderPopoverMenu(t)} hideArrow offset={0}>
                            {t('menu.menu')}
                        </Popover>
                    ) : (
                        <Flex orientation="horizontal" gap="40" height="100%" inline alignment="center">
                            <Link href="/"><MenuLabel>{t('menu.home')}</MenuLabel></Link>
                            <Link href="/donate"><MenuLabel>{t('menu.donate')}</MenuLabel></Link>
                            <Link href="/about"><MenuLabel>{t('menu.about')}</MenuLabel></Link>
                        </Flex>
                    )
                }
            </Fragment>
        </Flex>
    );
})`
    padding: 0 40px;
    flex-grow: 0;
    flex-shrink: 0;
    height: 44px;
    color: #fefefe;
    background: linear-gradient(0deg, rgba(185,0,80,1) 0%, rgba(151,20,77,1) 100%);
    box-shadow: darkgrey 0px 1px 5px;
`;