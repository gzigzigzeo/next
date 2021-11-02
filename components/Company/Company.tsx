import styled from "styled-components";
import css from "@styled-system/css";
import { transition } from "components/system";
import Image from "components/Image";
import Flex, { FlexProps } from "components/Flex";
import Link from "components/Link";
import * as logos from "./logos";
import { CompanyId } from "./types";
import companiesList from "./companiesList";

export type Props = {
  id: CompanyId;
  needLink?: boolean;
} & FlexProps;

export default function Company({ id, needLink, ...props }: Props) {
  const url: string = logos[id];
  const data = companiesList.find(({ id: companyId }) => companyId === id);
  const Wrapper = needLink && data?.caseStudy ? StyledLink : Flex;

  return (
    <Wrapper
      borderRadius="default"
      bg="white"
      height="100%"
      maxWidth="100%"
      overflow="hidden"
      justifyContent="center"
      href={data?.caseStudy}
      {...props}
    >
      <Image
        src={url}
        alt={data?.title}
        title={data?.title}
        loading="lazy"
        width="auto"
        height="100%"
      />
    </Wrapper>
  );
}

const StyledLink = styled(Link)(
  css({
    display: "flex",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "dark-purple",
    transition: transition([["boxShadow", "interaction"]]),
    "&:hover, &:focus": {
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.24)",
    },
  })
);
