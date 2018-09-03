import { Server } from '../interfaces/http/startup';
import { inject, injectable } from 'inversify';


@injectable()
export class Application {
    constructor(
        @inject('server') private server: Server
    ) {

    }

    async start() {
        await this.server.Start();
    }
}
