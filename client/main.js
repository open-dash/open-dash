import { App } from '/client/api';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import panelModule from './modules/panel';
import settingsModule from './modules/settings';
import smartthingsModule from './modules/smartthings';
import usersModule from './modules/users';

// init context
const context = initContext();

// create app
const app = new App(context);
app.loadModule(coreModule);
app.loadModule(panelModule);
app.loadModule(settingsModule);
app.loadModule(smartthingsModule);
app.loadModule(usersModule);
app.init();
