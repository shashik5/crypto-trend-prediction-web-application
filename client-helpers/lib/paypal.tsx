import { Input, Modal, Spacer, Text, useModal } from '@geist-ui/core';
import { DollarSign } from '@geist-ui/icons';
import { CreateOrderActions, CreateOrderData, PayPalScriptOptions } from '@paypal/paypal-js';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Fragment, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Flex } from './flex';

const StyledPayPalButtons = styled(PayPalButtons)`
    width: 250px;
`;

const initialOptions: PayPalScriptOptions = {
    // 'client-id': 'AaOMk8GWMtNt_Fu2c17ZJZD5aTknYuaF-x_35wLbVoRFy7lWO2rTHBgsYis5ozHHav4U8gqV6dWZeKZ2',
    'client-id': 'Ac-MmscRf2yUxyKqAao9WTXGZvVQhfbQ_baGTeZ0lF2JQn661epAHxEo34xq5IbdWaLRy3ogpw1aGOPM',
    currency: 'USD'
};

export function Paypal({ min = 5 }: { min?: number }) {
    const [amount, setAmount] = useState(min.toString());
    const amountRef = useRef(amount);
    const { bindings, setVisible } = useModal(false);
    const { t } = useTranslation();
    amountRef.current = amount;

    const _onChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(ev.target.value);
    }, []);

    const _onCreateOrder = useCallback((data: CreateOrderData, actions: CreateOrderActions) => {
        return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    value: amountRef.current,
                    currency_code: 'USD'
                }
            }]
        });
    }, []);

    const _onError = useCallback((err: Record<string, unknown>) => {
        console.log(err);
        setVisible(true);
    }, [setVisible]);

    const _onBlur = useCallback(() => {
        setAmount(Number(amountRef.current) >= min ? amountRef.current : min.toString());
    }, [min]);

    return (
        <Fragment>
            <PayPalScriptProvider options={initialOptions}>
                <Flex orientation="vertical" justifyContent="center" alignment="center" width="100%">
                    <Input label={t('label.amount')} onChange={_onChange} min={5} value={amount} onBlur={_onBlur} icon={<DollarSign />} htmlType="number" />
                    <Spacer />
                    <StyledPayPalButtons style={{ layout: 'vertical', color: 'white', height: 36 }} createOrder={_onCreateOrder}
                        onError={_onError} />
                </Flex>
            </PayPalScriptProvider>
            <Modal {...bindings}>
                <Modal.Title>{t('heading.paymentFailed')}</Modal.Title>
                <Modal.Content>
                    <Text>{t('description.paymentFailed')}</Text>
                </Modal.Content>
                <Modal.Action onClick={() => setVisible(false)}>{t('button.close')}</Modal.Action>
            </Modal>
        </Fragment>
    );
}