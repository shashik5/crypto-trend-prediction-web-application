import { useEffect, useState } from 'react';

interface IClientOnlyProps {
    children?: any;
}

export function ClientOnly(props: IClientOnlyProps) {
    const [canRender, setCanRender] = useState(false);
    useEffect(() => {
        setCanRender(true);
    }, []);
    return canRender ? props.children : null;
}