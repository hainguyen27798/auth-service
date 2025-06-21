import { Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as pkg from 'package.json';
import { join } from 'path';

import { ENV_MODE } from '@/pkg/constants';
import type { TConfig } from '@/types';

export class Configuration {
  private static _config: TConfig;

  static init(): TConfig {
    let envMode = process.env['NODE_ENV'] as ENV_MODE;

    if (!Object.values(ENV_MODE).includes(envMode)) {
      envMode = ENV_MODE.DEV;
    }

    if (!Configuration._config) {
      try {
        Configuration._config = yaml.load(
          readFileSync(join(__dirname, `../../config.${envMode}.yml`), 'utf8'),
        ) as TConfig;
        Configuration._config.server.env = envMode;
      } catch (error) {
        Logger.error(`config.${envMode}.yml not found`, error.stack, 'Configuration.init');
        throw error;
      }
    }

    Configuration._config.server.version = pkg.version || '0.0.0';

    return Configuration._config;
  }

  static get instance(): TConfig {
    return Configuration._config;
  }
}
