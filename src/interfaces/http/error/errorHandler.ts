import { Request, Response, NextFunction } from 'express';
import * as Status from 'http-status';
import { ILogger } from '../../../infrastructure/logger/ILogger';
import  { container } from '../../../inversify.config';

export function errorHandler(err : Error, req : Request, res : Response, next : NextFunction) {
    const logger: ILogger = container.get('logger');

    //TODO : Need to add the log attaching middleware as first middleware
    if (logger) {
        logger.logError(err, 'Internal server error');
    }
    
    if (res.headersSent) {
        return;
    }
    
    res.status(Status.INTERNAL_SERVER_ERROR).json({
        type: 'InternalServerError',
        message: 'The server failed to handle this request'
    });
}