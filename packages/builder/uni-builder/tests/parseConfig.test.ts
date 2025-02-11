/* eslint-disable max-lines */
import { describe, afterAll, test, expect } from 'vitest';
import { parseCommonConfig } from '../src/shared/parseCommonConfig';

describe('parseCommonConfig', () => {
  const env = process.env.NODE_ENV;

  afterAll(() => {
    process.env.NODE_ENV = env;
  });

  test('output.cssModuleLocalIdentName', async () => {
    expect(
      (
        await parseCommonConfig(
          {
            output: {
              cssModuleLocalIdentName: '[local]-[hash:base64:6]',
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();
  });

  test('output.disableCssModuleExtension', async () => {
    expect(
      (
        await parseCommonConfig(
          {
            output: {
              disableCssModuleExtension: true,
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();
  });

  test('html.metaByEntries', async () => {
    expect(
      (
        await parseCommonConfig(
          {
            html: {
              metaByEntries: {
                foo: {
                  viewport: 'bar',
                },
              },
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();

    expect(
      (
        await parseCommonConfig(
          {
            html: {
              meta: {
                charset: {
                  charset: 'UTF-8',
                },
              },
              metaByEntries: {
                foo: {
                  viewport: 'bar',
                },
              },
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();
  });

  test('html.titleByEntries', async () => {
    expect(
      (
        await parseCommonConfig(
          {
            html: {
              titleByEntries: {
                foo: 'Foo',
              },
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();

    expect(
      (
        await parseCommonConfig(
          {
            html: {
              title: 'Default',
              titleByEntries: {
                foo: 'Foo',
              },
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();
  });

  test('html.faviconByEntries', async () => {
    expect(
      (
        await parseCommonConfig(
          {
            html: {
              faviconByEntries: {
                foo: 'https://www.foo.com/foo.ico',
              },
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();

    expect(
      (
        await parseCommonConfig(
          {
            html: {
              favicon: 'https://www.foo.com/default.ico',
              faviconByEntries: {
                foo: 'https://www.foo.com/foo.ico',
              },
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();
  });

  test('html.faviconByEntries', async () => {
    expect(
      (
        await parseCommonConfig(
          {
            html: {
              injectByEntries: {
                foo: 'head',
              },
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();

    expect(
      (
        await parseCommonConfig(
          {
            html: {
              inject: 'body',
              injectByEntries: {
                foo: 'head',
              },
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();
  });

  test('html.templateByEntries', async () => {
    expect(
      (
        await parseCommonConfig(
          {
            html: {
              templateByEntries: {
                foo: './static/foo.html',
              },
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();

    expect(
      (
        await parseCommonConfig(
          {
            html: {
              template: './static/index.html',
              templateByEntries: {
                foo: './static/foo.html',
              },
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();
  });

  test('html.templateParametersByEntries', async () => {
    expect(
      (
        await parseCommonConfig(
          {
            html: {
              templateParametersByEntries: {
                foo: {
                  name: 'jack',
                },
              },
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();

    expect(
      (
        await parseCommonConfig(
          {
            html: {
              templateParameters: {
                name: 'jack',
              },
              templateParametersByEntries: {
                foo: {
                  name: 'rose',
                },
              },
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();
  });

  test('output.assetsRetry', async () => {
    expect(
      (await parseCommonConfig({}, {})).rsbuildPlugins.some(
        item => item.name === 'rsbuild:assets-retry',
      ),
    ).toBeFalsy();

    expect(
      (
        await parseCommonConfig(
          {
            output: {
              assetsRetry: {},
            },
          },
          {},
        )
      ).rsbuildPlugins.some(item => item.name === 'rsbuild:assets-retry'),
    ).toBeTruthy();
  });

  test('dev.xxx', async () => {
    process.env.NODE_ENV = 'development';
    expect(
      (
        await parseCommonConfig(
          {
            dev: {
              https: {
                key: 'xxxx',
                cert: 'xxx',
              },
              port: 8081,
              host: 'xxx.xxx',
            },
            tools: {
              devServer: {
                compress: false,
                hot: false,
                headers: {
                  'X-Custom-Foo': 'bar',
                },
                historyApiFallback: true,
              },
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();

    process.env.NODE_ENV = 'production';
    expect(
      (
        await parseCommonConfig(
          {
            dev: {
              https: {
                key: 'xxxx',
                cert: 'xxx',
              },
              port: 8081,
              host: 'xxx.xxx',
            },
            tools: {
              devServer: {
                historyApiFallback: true,
              },
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();
  });

  test('output.enableInlineScripts', async () => {
    expect(
      (
        await parseCommonConfig(
          {
            output: {
              enableInlineScripts: true,
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();
  });

  test('output.enableInlineStyles', async () => {
    expect(
      (
        await parseCommonConfig(
          {
            output: {
              enableInlineStyles: true,
            },
          },
          {},
        )
      ).rsbuildConfig,
    ).toMatchSnapshot();
  });

  test('output.overrideBrowserslist', async () => {
    expect(
      (
        await parseCommonConfig(
          {
            output: {
              overrideBrowserslist: ['iOS >= 9', 'Android >= 4.4'],
            },
          },
          {},
        )
      ).rsbuildConfig.output!.overrideBrowserslist,
    ).toMatchInlineSnapshot(`
      {
        "web": [
          "iOS >= 9",
          "Android >= 4.4",
        ],
      }
    `);

    expect(
      (
        await parseCommonConfig(
          {},
          {
            target: ['web', 'node', 'web-worker'],
          },
        )
      ).rsbuildConfig.output!.overrideBrowserslist,
    ).toMatchInlineSnapshot(`
      {
        "node": [
          "node >= 14",
        ],
        "web": [
          "> 0.01%",
          "not dead",
          "not op_mini all",
        ],
        "web-worker": [
          "> 0.01%",
          "not dead",
          "not op_mini all",
        ],
      }
    `);
  });
});
