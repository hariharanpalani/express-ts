import { injectable, Container, inject } from "inversify";
import { InversifyExpressServer } from 'inversify-express-utils';
import { ILogger } from "../../infrastructure/logger/ILogger";
import { Request, NextFunction, Application, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as Status from 'http-status';
import { AppContextManager } from "../../infrastructure/context/AppContextManager";
import { devErrorHandler } from "./error/deverrorhandler";
import { errorHandler } from "./error/errorHandler";
import { AddressInfo } from "net";

@injectable()
export class Server {
    private server: InversifyExpressServer;

    constructor(
        @inject('container') container : Container,
        @inject('config') private config : any,
        @inject('logger') private logger : ILogger
    ) {
        const context = AppContextManager.initContext();

        this.server = new InversifyExpressServer(container, null, { rootPath : `/api/v${this.config.version}/`}, null, null);

        this.server.setConfig((app: Application) => {
            app.disable("x-powered-by");
            app.use(require('cors')());
            app.use(bodyParser.urlencoded({
                extended: true
              }));
        
            app.use(bodyParser.json()); 
            
            //Middleware to inject the request context.
            app.use((req : Request, res : Response, next : NextFunction) => {        
                context.run(() => {          
                  AppContextManager.setContext({requestId: require('uuid/v4')()});
                  next();
                });
            });

            //Middleware to log request
            app.use((req : Request, res : Response , next : NextFunction) => {        
                this.logger.logTrace({req});
                next();
            });

            //TODO - Middleware to log the response before sending to client
        });

        this.server.setErrorConfig((app: Application) => {
            app.use('*', (req : Request, res: Response) => {
                res.status(Status.NOT_FOUND).json({message : 'API not found'});
              });
              
              if (this.config.development) {
                app.use(devErrorHandler);
                return;
              }
              app.use(errorHandler);
        });
    }

    async Start() {
        return new Promise(async (resolve: any) => {
            const app = this.server.build();

            const http = app.listen( this.config.server.port, () => {
                const { port } = <AddressInfo>http.address();
                this.logger.logInfo(`Listening at port ${port}`);
            });       
        });
    }
}