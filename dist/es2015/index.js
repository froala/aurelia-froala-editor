import { Config } from './froala-editor-config';

export function configure(aurelia, configCallback) {
  const instance = aurelia.container.get(Config);

  if (configCallback !== undefined && typeof configCallback === 'function') {
    configCallback(instance);
  }

  aurelia.globalResources('./froala-editor');
}