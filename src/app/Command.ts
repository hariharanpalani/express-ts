import { injectable, decorate } from 'inversify';
const EventEmitter = require('events');


@injectable()
export class Command extends EventEmitter {
    outputs: any;

    setOutputs(outputs : string[]) {
        this.outputs = outputs.reduce((obj, output) => {
            obj[output] = output;
            return obj;
        }, Object.create(null));
    }

    on(output : string, handler: (...args : any[]) => void) : any {
        if (this.outputs[output]) {
          return this.addListener(output, handler);
        }
        throw new Error(`Invalid output "${ output }" to command ${this.constructor.name}.`);
    }
}

decorate(injectable(), EventEmitter);