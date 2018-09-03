import { controller, httpGet, BaseHttpController, request, response } from 'inversify-express-utils';
import { inject } from '../../../../node_modules/inversify';
import { GetUserCommand } from '../../../app/getUser';
import * as express from 'express';
import { ILogger } from '../../../infrastructure/logger/ILogger';
import * as HttpStatus  from 'http-status';

@controller('/')
export class HomeController extends BaseHttpController {
  @inject('getUser') private getUser: GetUserCommand;
  @inject('logger') private logger: ILogger;

  @httpGet('/')
  public async get(@request() req: express.Request, @response() res: express.Response) {
    const { SUCCESS,  ERROR } = this.getUser.outputs;

    this.getUser.on(SUCCESS, response => res.json(response).status(HttpStatus.OK))
    await this.getUser.execute({}, req.connection.remoteAddress);
  }
}