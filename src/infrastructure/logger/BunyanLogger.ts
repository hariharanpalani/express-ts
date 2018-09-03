import { inject, injectable } from 'inversify';
import * as Logger from 'bunyan';
import { ILogger } from './ILogger';
import { AppContextManager } from '../context/AppContextManager';

@injectable()
class WrapperLogger implements ILogger {    

    constructor(protected logger :  Logger) {
    }

    logInfo(message: string | object): void {
        this.logger.info(this.formatMessage(message));
    }

    logError(error: Error, message: string | object): void {
        this.logger.error(error, this.formatMessage(message));
    }

    logWarn(message: string | object): void {
        this.logger.warn(this.formatMessage(message));
    }

    logTrace(message: string | object): void {
        this.logger.trace(this.formatMessage(message));
    }

    log(level: 'TRACE' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL', error : Error | null, message: string | object): void {
        switch (level) {
            case 'TRACE':
                return this.logTrace(message);
            case 'INFO':
                return this.logInfo(message);
            case 'WARN':
                return this.logWarn(message);
            case 'ERROR':
                return this.logError(error || new Error('Unknown error'), message);
            case 'FATAL':
                return this.logger.fatal(error || new Error('Unknown Fatal Error'), this.formatMessage(message));            
        }
    }

    private formatMessage(message: string | object) : string | object {
        const context = AppContextManager.getContext();
        const messageObj = typeof message === 'string' ? {message : message} : message;
        return context && context.requestId ? { reqId: context.requestId, ...messageObj} : message;
        
    }
}

@injectable()
export class BunyanLogger extends WrapperLogger {   
   
    constructor(@inject('config') config : any) {
        super(new Logger(config.logger));
    }

    childLogger(opts : object) : ILogger {
        return new WrapperLogger(this.logger.child(opts));
    }
}

