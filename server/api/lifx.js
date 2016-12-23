import { HTTP } from 'meteor/http';
import { Settings } from '/lib/collections';
import Logger from './logger';

export default class Lifx {

  constructor(apiKey) {
    this.apiLightsUrl = 'https://api.lifx.com/v1/lights/';
    this.apiScenesUrl = 'https://api.lifx.com/v1/scenes/';

    this.apiKey = apiKey || Settings.get('lifx.apiKey');

    if (!this.apiKey) {
      throw new Meteor.Error('Missing Lifx API key.');
    }

    this.headers = {
      Authorization: `Bearer ${this.apiKey}`
    };
  }

  /**
   * Set the state of a single selector
   * @param {String} selector - Lifx API selector string
   * @return {Object} returns the change status of lights that changed
   */
  listLights(selector = 'all') {
    return HTTP.call('GET', this.apiLightsUrl + selector, {
      headers: this.headers
    });
  }

  /**
   * Set the state of a single selector
   * @param {String} selector - Lifx API selector string
   * @param {Object} params   - object with power, color, brightness, duration
   * @return {Object} returns the change status of lights that changed
   */
  setState(selector, params) {
    return HTTP.call('PUT', this.apiLightsUrl + selector + '/state', {
      headers: this.headers,
      params
    });
  }

  /**
   * Set the state of an array of selectors
   * @param {Array} states  - array of state objects with format { selector, power }
   * @param {Object} defaults - object with default power, color, brightness, duration
   * @return {Object} returns the change status of lights that changed
   */
  setStates(states, defaults) {
    const params = { states, defaults };
    return HTTP.call('PUT', this.apiLightsUrl + '/states', {
      headers: this.headers,
      params
    });
  }

  /**
   * Toggle the power of a given selector
   * @param {String} selector - Lifx API selector string
   * @param {String} duration - length of transition in seconds
   * @return {Object} returns the change status of lights that changed
   */
  togglePower(selector = 'all', duration = '1') {
    return HTTP.call('POST', this.apiLightsUrl + selector + '/toggle', {
      headers: this.headers,
      params: { duration }
    });
  }

  /**
   * Set the state of a single selector
   * @return {Array} returns an array of available scene presets
   */
  listScenes() {
    return HTTP.call('GET', this.apiScenesUrl, {
      headers: this.headers
    });
  }

  /**
   * Activate a scene preset
   * @param {String} uuid - UUID of the scene to activate
   * @return {Object} returns the change status of lights that changed
   */
  activateScene(uuid) {
    return HTTP.call('PUT', this.apiScenesUrl + uuid + '/activate', {
      headers: this.headers
    });
  }
}
