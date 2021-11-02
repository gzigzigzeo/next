import styled from "styled-components";
import { css, all } from "components/system";
import Box from "components/Box";
import Button from "components/Button";
import Flex from "components/Flex";
import NextImage from "next/image";

interface BaitCardProps {
  img: string;
  imgBG: string;
  logo: string;
  side?: "left" | "right";
  link: string;
  textLink: string;
  description: string;
}

export default function BaitCard({
  img,
  imgBG,
  logo,
  side = "left",
  link,
  textLink,
  description,
}: BaitCardProps) {
  const sideCard = side === "left" ? "row" : "row-reverse";
  return (
    <StyledCard flexDirection={sideCard}>
      <Box
        display={["none", "block"]}
        flexBasis={[0, "50%"]}
        backgroundColor={imgBG}
        position="relative"
      >
        <NextImage src={img} alt="" layout="fill" />
      </Box>
      <StyledInfo>
        <StyledLogo>
          <NextImage src={logo} alt="company logo" layout="fill" />
        </StyledLogo>
        <Box as="p" mt="5" fontSize="text-xl">
          {description}
        </Box>
        <Button as="a" href={link} variant="primary" shape="lg" mt="5">
          {textLink}
        </Button>
      </StyledInfo>
    </StyledCard>
  );
}

const StyledLogo = styled(Box)(
  css({
    height: "48px",
    position: "relative",

    "& img": {
      width: "auto !important",
      minWidth: "initial !important",
      margin: "0 !important",
    },
  }),
  all
);

const StyledInfo = styled(Box)(
  css({
    flexBasis: ["100%", "50%"],
    my: "auto",
    p: "7",
    backgroundColor: ["transparent", "white"],
  })
);

const StyledCard = styled(Flex)(
  css({
    height: ["auto", "500px"],
    "&:nth-child(2n+1)": {
      backgroundColor: ["lightest-gray", "transparent"],
    },
  }),
  all
);
