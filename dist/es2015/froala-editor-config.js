
export let Config = class Config {

  constructor() {
    this._config = {};
  }

  get(key) {
    return this._config[key];
  }

  options(obj) {
    if (typeof obj != 'undefined') {
      Object.assign(this._config, obj);
    } else {
      return this._config;
    }
  }

  set(key, value) {
    this._config[key] = value;
    return this._config[key];
  }
};