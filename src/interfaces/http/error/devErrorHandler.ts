import { Request, Response, NextFunction } from 'express';
import * as Status from 'http-status';
import { ILogger } from '../../../infrastructure/logger/ILogger';
import  { container } from '../../../inversify.config';

export function devErrorHandler(err : Error, req : Request, res : Response, next : NextFunction) {
    const logger: ILogger = container.get('logger');
    
    if (logger) {
        logger.logError(err, 'Internal server error');
    }
    
    
    if (res.headersSent) {
        return;
    }
    
    res.status(Status.INTERNAL_SERVER_ERROR).json({
        type: 'InternalServerError',
        stack : err.stack,
        message: err.message
    });
}