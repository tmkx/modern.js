---
sidebar_position: 4
---

# createSubProject

Create subprojects and only support Monorepo engineering solutions.

This method is available on the `onForged` API parameter.

Its type is defined as:

```ts
export enum SubSolution {
  MWA = 'mwa',
  MWATest = 'mwa_test',
  Module = 'module',
  InnerModule = 'inner_module',
}
export type ForgedAPI = {
  createSubProject: (
    solution: SubSolution,
    params: Record<string, unknown>,
  ) => Promise<void>;
  ...
};
```

## solution

Sub-project engineering solution name.

## params

For other parameters of creating subprojects, please refer to[Monorepo Create Sub Project](/docs/guides/topic-detail/generator/config/monorepo).