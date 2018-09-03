import { injectable, inject, decorate } from 'inversify';
import { Command } from './Command';
import { ILogger } from '../infrastructure/logger/ILogger';


@injectable()
export class GetUserCommand extends Command {
    constructor(@inject('logger') private logger: ILogger) {
        super();
        this.setOutputs(['SUCCESS', 'ERROR']);
    }

    async execute(opts: any, ip: string | undefined) {
        const { SUCCESS, ERROR } = this.outputs;

        try {
            this.emit(SUCCESS, {
                message: 'User created successfully'
            });
        }
        catch(error) {
            this.emit(ERROR, error);
        }
    }
}

