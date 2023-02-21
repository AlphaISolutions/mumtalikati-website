
export function assetUrl(url: string): string {
  const publicPath = 'https://d2og5lryw1ajtt.cloudfront.net/';
  const publicPathSuffix = publicPath.endsWith('/') ? '' : '/';
   return `${publicPath}${publicPathSuffix}${url}`;
}

