import { createRspackBuilder } from './rspack';
import { createWebpackBuilder } from './webpack';
import type { CreateUniBuilderOptions } from './types';

export type { CreateUniBuilderOptions };
export type { BundlerChain, RsbuildPlugin } from '@rsbuild/shared';
export type { BuilderConfig } from './types';
export type { StartDevServerOptions } from './shared/devServer';

export async function createUniBuilder(options: CreateUniBuilderOptions) {
  return options.bundlerType === 'rspack'
    ? createRspackBuilder(options)
    : createWebpackBuilder(options);
}

export { logger } from '@rsbuild/core';
export { RUNTIME_CHUNK_NAME } from './shared/constants';
