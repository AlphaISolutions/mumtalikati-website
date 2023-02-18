// In single-spa, the assets need to be loaded from a dynamic location,
// instead of hard coded to `/assets`. We use webpack public path for this.
// See https://webpack.js.org/guides/public-path/#root

export function assetUrl(url: string): string {
  // @ts-ignore
  const publicPath = 'https://d2og5lryw1ajtt.cloudfront.net/';
  const publicPathSuffix = publicPath.endsWith('/') ? '' : '/';
   return `${publicPath}${publicPathSuffix}${url}`;
}

