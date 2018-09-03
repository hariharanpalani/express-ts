import { Container } from 'inversify';
import { Server } from './interfaces/http/startup';
import { BunyanLogger } from './infrastructure/logger/BunyanLogger';
import { ILogger } from './infrastructure/logger/ILogger';
import { Application } from './app/Application';

import './interfaces/http/controllers/home';
import { GetUserCommand } from './app/getUser';

const config = require('../config');
let container = new Container();

container.bind<Container>('container').toConstantValue(container);
container.bind('config').toConstantValue(config);
container.bind<Server>('server').to(Server);
container.bind<ILogger>('logger').to(BunyanLogger).inSingletonScope();
container.bind<GetUserCommand>('getUser').to(GetUserCommand);
container.bind<Application>('app').to(Application);

export { container };