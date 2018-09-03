import { Response } from 'express';


export function resSerializer(res : Response) {
    return {
       status : res.statusMessage,       
       data : (<any>res).data || ''
    };
}