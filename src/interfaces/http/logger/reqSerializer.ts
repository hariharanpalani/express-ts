import { Request } from 'express';


export function reqSerializer(req : Request) {
    return {
        method: req.method,
        url: req.url,
        headers: req.headers
    };
}