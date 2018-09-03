import 'reflect-metadata';
import { Application } from './app/Application';
import { container } from './inversify.config';

container.get<Application>('app').start();