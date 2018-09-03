export interface ILogger {
    logInfo(message : string | object) : void;

    logError(error : Error, message : string | object) : void;

    logWarn(message : string | object) : void;

    logTrace(message : string | object) : void;

    log(level : 'TRACE' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL', error: Error | null, message : string | object) : void;
}