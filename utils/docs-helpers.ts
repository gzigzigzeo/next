import { resolve, join } from "path";
import { loadSiteConfig } from "./config";

const { branches } = loadSiteConfig();
const { NEXT_PUBLIC_GITHUB_DOCS } = process.env;

export const getVersion = (filepath: string) => {
  const result = /content\/([^/]+)\/docs\//.exec(filepath);
  return (result && result[1]) as string;
};

export const getVersionRootPath = (filepath: string) => {
  const version = getVersion(filepath);

  return resolve(`content/${version}`);
};

export const getVersionDocsPath = (filepath: string) => {
  const root = getVersionRootPath(filepath);

  return join(root, "docs");
};

export const getVersionConfigPath = (filepath: string) => {
  const docs = getVersionDocsPath(filepath);

  return resolve(docs, "docs/config.json");
};

export const getGithubURL = (filepath: string) => {
  const current = getVersion(filepath);
  const root = getVersionRootPath(filepath);

  return branches[current]
    ? filepath.replace(
        root,
        `${NEXT_PUBLIC_GITHUB_DOCS}/edit/${branches[current]}`
      )
    : "";
};