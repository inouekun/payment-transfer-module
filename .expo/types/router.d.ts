/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/confirmation`; params?: Router.UnknownInputParams; } | { pathname: `/nativewind-env.d`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | ``; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/payment` | `/payment`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/confirmation`; params?: Router.UnknownOutputParams; } | { pathname: `/nativewind-env.d`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}` | ``; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/payment` | `/payment`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/confirmation${`?${string}` | `#${string}` | ''}` | `/nativewind-env.d${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${`?${string}` | `#${string}` | ''}` | `${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/payment${`?${string}` | `#${string}` | ''}` | `/payment${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/confirmation`; params?: Router.UnknownInputParams; } | { pathname: `/nativewind-env.d`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | ``; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/payment` | `/payment`; params?: Router.UnknownInputParams; };
    }
  }
}
