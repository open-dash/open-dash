import { injectDeps } from 'react-simple-di';

export default class App {

  constructor(context) {
    if (!context) {
      throw new Error('Context is required when creating a new app.');
    }
    this.context = context;
    this.actions = {};
    this._routeFns = [];
  }

  _bindContext(_actions) {
    const actions = {};
    for (const key in _actions) {
      if (_actions.hasOwnProperty(key)) {
        const actionMap = _actions[key];
        const newActionMap = {};
        for (const actionName in actionMap) {
          if (actionMap.hasOwnProperty(actionName)) {
            newActionMap[actionName] = actionMap[actionName].bind(null, this.context);
          }
        }
        actions[key] = newActionMap;
      }
    }

    return actions;
  }

  loadModule(module) {
    this._checkForInit();

    if (!module) {
      throw new Error('Should provide a module to load.');
    }

    if (module.__loaded) {
      throw new Error('This module is already loaded.');
    }

    if (module.routes) {
      if (typeof module.routes !== 'function') {
        throw new Error('Module\'s routes field should be a function.');
      }

      this._routeFns.push(module.routes);
    }

    const actions = module.actions || {};
    this.actions = {
      ...this.actions,
      ...actions
    };

    if (module.load) {
      if (typeof module.load !== 'function') {
        throw new Error('module.load should be a function');
      }

      // This module has no access to the actions loaded after this module.
      const boundedActions = this._bindContext(this.actions);
      module.load(this.context, boundedActions);
    }

    module.__loaded = true;
  }

  init() {
    this._checkForInit();

    for (const routeFn of this._routeFns) {
      const inject = (comp) => {
        return injectDeps(this.context, this.actions)(comp);
      };

      routeFn(inject, this.context, this.actions);
    }

    this._routeFns = [];
    this.__initialized = true;
  }

  _checkForInit() {
    if (this.__initialized) {
      throw new Error('App is already initialized');
    }
  }
}

export const createApp = (...args) => new App(...args);
