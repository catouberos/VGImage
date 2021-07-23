import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { subtext, category, summary, score, image } = (query || {});

    if (Array.isArray(subtext)) {
        throw new Error('Expected a single summary');
    }
    if (Array.isArray(summary)) {
        throw new Error('Expected a single summary');
    }
    if (Array.isArray(category)) {
        throw new Error('Expected a single summary');
    }
    if (Array.isArray(score)) {
        throw new Error('Expected a single summary');
    }
    if (Array.isArray(image)) {
        throw new Error('Expected a single summary');
    }
    
    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    let text = '';
    if (arr.length === 0) {
        text = '';
    } else if (arr.length === 1) {
        text = arr[0];
    } else {
        extension = arr.pop() as string;
        text = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        subText: subtext || '',
        category: category || '',
        summary: summary || '',
        score: score || '',
        image: image || '',
    };
    return parsedRequest;
}
