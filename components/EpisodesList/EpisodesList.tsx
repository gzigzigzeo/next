import styled from "styled-components";
import css from "@styled-system/css";
import { GridTile } from "components/GridDisplay";
import Grid from "components/Grid";
import Flex from "components/Flex";
import Box from "components/Box";
import { CARD_DATA } from "./constants";
import type { PodcastEpisode, EpisodeKind } from "./types";
import { ResourcesDropdown } from "./ResourcesDropdown";

interface EpisodesListProps {
  episodes: PodcastEpisode[];
  kind: EpisodeKind;
  needSizeLimit?: boolean;
}

export default function EpisodesList({
  episodes,
  kind: typeEpisode,
  needSizeLimit,
}: EpisodesListProps) {
  const card = CARD_DATA[typeEpisode];
  const Wrapper = needSizeLimit ? StyledGridTile : GridTile;

  return (
    <Flex justifyContent="center" flexDirection="column">
      <Box>
        <Box as="p" textTransform="uppercase">
          FILTER BY
        </Box>
        <ResourcesDropdown />
      </Box>
      <Grid
        mt="5"
        gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr) )"
        gridGap={[3, 5]}
      >
        {episodes.map(({ frontmatter, uri }) => (
          <Wrapper
            width="auto"
            key={uri}
            title={frontmatter.title}
            cardBG={card.cardBG}
            cardBC={card.cardBC}
            href={uri}
            smallIcon={true}
            src={card.src}
            caption={card.caption}
            resourcesCard
          >
            <Box as="p">{frontmatter.description}</Box>
          </Wrapper>
        ))}
      </Grid>
    </Flex>
  );
}

const StyledGridTile = styled(GridTile)(
  css({
    maxHeight: "460px",
    overflow: "hidden",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      height: ["55px", "65px"],
      backgroundImage: "linear-gradient(180deg, transparent, white 50%)",
    },
  })
);
