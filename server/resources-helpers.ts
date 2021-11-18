import { PodcastEpisode } from "components/EpisodesList/types";
import { getPagesInfo } from "./pages-helpers";

export const getResourcesData = (type: string) => {
  let podcastsPageInfo = [];

  try {
    podcastsPageInfo = getPagesInfo(`resources/${type}/**/*.mdx`)
      .map(({ data }) => data)
      .filter((episode: PodcastEpisode) => episode.frontmatter.podcastName)
      .sort((a: PodcastEpisode, b: PodcastEpisode) => {
        const aNumberEpisode = Number(a.frontmatter.podcastName.split("-")[0]);
        const bNumberEpisode = Number(b.frontmatter.podcastName.split("-")[0]);
        return bNumberEpisode - aNumberEpisode;
      });
  } catch (e) {
    console.error(e);
  }

  return podcastsPageInfo;
};
