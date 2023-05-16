import { notifications } from '@mantine/notifications';
import { IconLoader2, IconX } from '@tabler/icons-react';
import { nanoid } from 'nanoid';
import React from 'react';

export function show(opt: { title?: string; message: string; id?: string; icon?: React.ReactElement, color?: string }) {
    const id = opt?.id ?? nanoid();
    return notifications.show({
        id,
        autoClose: 3000,
        color: opt.color ?? 'blue',
        className: 'custom-notification ' + id,
        title: opt.title,
        message: opt.message,
        icon: opt.icon,
    })
}

export function error(opt: { title?: string; message: string; id?: string;}) {
    const options = {
        icon: <IconX />,
        color: 'red',
        ...opt
    };
    return show(options);
}

export function loading(opt: { title?: string; message: string; id?: string;}) {
    const options = {
        icon: <IconLoader2 />,
        color: 'white',
        ...opt
    };
    return show(options);
}