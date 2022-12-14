import { useState } from 'react';
import { useConstructor } from './use-constructor';
import { useUpdateNotifier } from './use-update-notifier';

interface IFetchResult<TResult> {
    result: TResult;
}

export function useGetFetch<TResult, TF extends IFetchResult<TResult> = IFetchResult<TResult>>(url: string, refetchOnUpdate?: boolean): [boolean, TResult | undefined, string | undefined] {
    const [result, setResult] = useState<TResult>();
    const [isFetched, setFetchState] = useState(false);
    const [error, setError] = useState<string>();

    const customFetch = async () => {
        try {
            const res: TF = await (await fetch(url)).json();
            setResult(res.result);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setFetchState(true);
        }
    };

    useConstructor(customFetch);
    useUpdateNotifier(() => {
        if (!refetchOnUpdate) {
            return;
        }
        setFetchState(false);
        customFetch();
    });

    return [isFetched, result, error];
}

export function usePostFetch<TResult, TF extends IFetchResult<TResult> = IFetchResult<TResult>>(url: string, data: { [key: string]: any }, refetchOnUpdate?: boolean): [boolean, TResult | undefined, string | undefined] {
    const [result, setResult] = useState<TResult>();
    const [isFetched, setFetchState] = useState(false);
    const [error, setError] = useState<string>();

    const customFetch = async () => {
        try {
            const res: TF = await (await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })).json();
            setResult(res.result);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setFetchState(true);
        }
    };

    useConstructor(customFetch);
    useUpdateNotifier(() => {
        if (!refetchOnUpdate) {
            return;
        }
        setFetchState(false);
        customFetch();
    });

    return [isFetched, result, error];
}