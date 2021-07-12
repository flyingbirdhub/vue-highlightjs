import Worker from 'web-worker:./worker.ts';
import type { UpdateType } from '@/common';
import { isString } from 'lodash-es';
import hljs from 'highlight.js';

declare global {
    interface Window {
        hljs: any;
    }
};

window.hljs = hljs;

const worker = new Worker();

export async function formatText(data: UpdateType) {
    if (data.text && isString(data.text)) {
        const promise = new Promise<string>((resolve, reject) => {
            worker.postMessage(JSON.stringify(data));
            worker.onmessage = (e) => {
                resolve(e.data);
            }
            worker.onerror = (e) => {
                e.preventDefault();
                reject(e);
            }
        });
        return promise;
    }
    return Promise.resolve('');
};
