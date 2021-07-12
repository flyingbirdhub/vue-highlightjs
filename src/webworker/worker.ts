import { isString } from 'lodash-es';
import { FormatUtil } from '@/common';

const formatter = new FormatUtil({});

onmessage = (e: MessageEvent) => {
    const data = JSON.parse(e.data);
    let formatted = '';
    if (data.text && isString(data.text)) {
        formatter.update(data);
        formatted = formatter.content;
    }
    postMessage(formatted);
};
