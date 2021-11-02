import getConfig from "../server/config-site";

export const relatify = (href: unknown) => {
  if (typeof href !== "string") {
    return;
  }

  return !/\.\.?\//.test(href) ? `./${href}` : href;
};

export const host = process.env.NEXT_PUBLIC_HOST;
interface URLParts {
  anchor?: string;
  path: string;
  query: Record<string, string>;
}

export const splitAsPath = (asPath: string): URLParts => {
  const [rest, anchor] = asPath.split("#");
  const [path, search] = rest.split("?");
  const query: Record<string, string> = !search
    ? {}
    : search.split("&").reduce((result, segment) => {
        const [key, value] = segment.split("=");

        result[key] = value;

        return result;
      }, {});

  return { anchor, path, query };
};

export const buildAsPath = (parts: URLParts): string => {
  let result = parts.path;

  const search = Object.entries(parts.query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  if (search) {
    result = `${result}?${search}`;
  }

  if (parts.anchor) {
    result = `${result}#${parts.anchor}`;
  }

  return result;
};

export const getExtension = (href: string): string | undefined => {
  const parts = href.split("/");
  const filename = parts[parts.length - 1];

  if (filename.indexOf(".") !== -1) {
    // should catch double extensions like `.tag.gz` and `.gitignore`
    return /[^.]*\.(.+)/.exec(filename)[1];
  }
};

export const isExternalLink = (href: string): boolean =>
  href.startsWith("//") || href.startsWith("mailto:") || href.includes("://");

export const isHash = (href: string): boolean => href.startsWith("#");

export const isMdxLink = (href: string): boolean => /\.md(x)?(#|$)/.test(href);

export const isPage = (href: string): boolean =>
  isMdxLink(href) || !getExtension(href);

export const getVersionAsPath = (href: string) => {
  const { latest } = getConfig();

  return href.replace(`/ver/${latest}`, "");
};

export const getDocPath = (asPath: string) => {
  const base = getVersionAsPath(splitAsPath(asPath).path);

  // In SSR mode next ignores trailingSlsh option in asPath
  return base.endsWith("/") ? base : `${base}/`;
};

export const buildCanonicalUrl = (asPath: string) => {
  const path = getVersionAsPath(asPath);

  return `${host}${path}`;
};

interface IsLocalAssetFileProps {
  extWhiteList?: string[];
  extBlackList?: string[];
}

export const isLocalAssetFile = (
  href: unknown,
  options: IsLocalAssetFileProps = {}
) => {
  if (typeof href !== "string") {
    return false;
  }

  const { extWhiteList = [], extBlackList = [] } = options;

  const { path } = splitAsPath(href);
  const ext = getExtension(path);

  return (
    !isExternalLink(path) &&
    !path.startsWith("/") &&
    !!ext &&
    (extBlackList.length ? !extBlackList.includes(ext) : false) &&
    (extWhiteList.length ? extWhiteList.includes(ext) : true)
  );
};
