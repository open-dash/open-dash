import 'babel-polyfill';
import { App } from '/client/api';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import deviceModule from './modules/devices';
import emailModule from './modules/email';
import jobsModule from './modules/jobs';
import panelModule from './modules/panel';
import settingsModule from './modules/settings';
import smartthingsModule from './modules/smartthings';
import usersModule from './modules/users';

// init context
const context = initContext();

// create app
const app = new App(context);
app.loadModule(coreModule);
app.loadModule(deviceModule);
app.loadModule(emailModule);
app.loadModule(jobsModule);
app.loadModule(panelModule);
app.loadModule(settingsModule);
app.loadModule(smartthingsModule);
app.loadModule(usersModule);
app.init();
