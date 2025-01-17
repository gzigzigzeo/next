import { existsSync, readFileSync } from "fs";
import probe from "probe-image-size";
import { resolve, dirname } from "path";

export const getValidAssetPath = (
  source: string,
  path: string
): string | undefined => {
  const src = resolve(dirname(source), path);

  return existsSync(src) ? src : undefined;
};

const imgSizeRegExp = /@([0-9.]+)x/; // E.g. image@2x.png

export const getScaleRatio = (src: string): number => {
  if (imgSizeRegExp.test(src)) {
    const match = src.match(imgSizeRegExp);

    return parseFloat(match[1]);
  } else {
    return 1;
  }
};

export const getDimensions = (
  source: string,
  path: string
): { width: string; height: string } => {
  const src = getValidAssetPath(source, path);

  if (src) {
    const file = readFileSync(src);

    try {
      const { width, height } = probe.sync(file);
      const scaleRatio = getScaleRatio(src);
      return {
        width: Math.round(width / scaleRatio).toString(),
        height: Math.round(height / scaleRatio).toString(),
      };
    } catch (e) {
      console.error(`Error while processing file ${path} at ${source}`);
      return { width: "0", height: "0" };
    }
  }
};
