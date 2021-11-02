import { ReactElement } from "react";
import css from "@styled-system/css";
import styled from "styled-components";
import { StatsCard } from "./StatsCard";

type CardElement = ReactElement<typeof StatsCard>;

interface IStatsContainer {
  children: CardElement | Array<CardElement | Array<CardElement>>;
}

function StatsContainer({ children }: IStatsContainer) {
  return <StyledContainer as="ul">{children}</StyledContainer>;
}

const StyledContainer = styled("ul")(
  css({
    width: "100%",
    display: "grid",
    gridTemplateColumns: ["1fr", "repeat(auto-fill, minmax(199px, 20%))"],
    columnGap: [0, 4],
    rowGap: [2, 0],
    pl: 0,
  })
);

StatsContainer.Card = StatsCard;

export default StatsContainer;
