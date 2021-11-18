import styled from "styled-components";
import css from "@styled-system/css";
import NextImage from "next/image";
import Box from "components/Box";
import Flex from "components/Flex";
import Button from "components/Button";
import { core, enterprise, whitepaper, tutorial, webinar } from "./assets";

/**
 * Component for use in a GridDisplay.
 *
 * GridTiles are clickable, have hover functionality, and no "Learn More" button.
 * The href prop will be passed to the Link wrapper.
 *
 * GridCards are not clickable or hoverable. The optional href prop
 * will be passed to a "Learn More" button.
 * 
 * ProductCards exist just below the Hero on the homepage. They have no border, 
 * no hover, just an icon, title/text and Learn More button.
 * 
 * BenefitCards are similar to GridCards but with a different display logic,
 * contents, and an optional title above the card (outside its borders)

 */

export interface GridCardProps {
  children: React.ReactNode;
  title: string;
  src: string;
  href?: string;
  cardBG: string;
  smallIcon?: boolean;
  caption?: string;
}

const cardBackgrounds = {
  enterprise,
  core,
  whitepaper,
  tutorial,
  webinar,
};

export const GridCard = ({
  children,
  src,
  title,
  cardBG,
  href,
  smallIcon = false,
  caption,
}: GridCardProps) => {
  //add additional backgrounds to cardBackgrounds
  const backgroundImage = cardBackgrounds[cardBG];

  return (
    <StyledWrapper>
      {/* top half */}
      <Flex
        flexDirection="row"
        py={3}
        px={4}
        backgroundImage={`url("${backgroundImage}")`}
        backgroundPosition="center"
        backgroundSize="cover"
        borderRadius="8px 8px 0 0"
      >
        {!smallIcon ? (
          <NextImage src={src} alt={title} height={193} width={282} />
        ) : (
          <Flex
            flexDirection="row"
            alignItems="center"
            height={140}
            justifyContent="flex-start"
          >
            <NextImage src={src} alt={title} height={32} width={32} />
            {caption && (
              <Box color="white" fontWeight="bold" fontSize="header-3" pl={2}>
                {caption}
              </Box>
            )}
          </Flex>
        )}
      </Flex>

      {/* bottom half */}
      <Flex
        flexDirection="column"
        flexGrow={1}
        alignItems="stretch"
        pb={4}
        pt={3}
        px={4}
        borderRadius="0 0 8px 8px"
      >
        <Box fontSize="text-md" lineHeight="md" color="black" fontWeight="bold">
          {title}
        </Box>
        <Box fontSize="13px" lineHeight="md" color="gray" pb={href ? 3 : 0}>
          {children}
        </Box>
        {href && (
          <Button
            variant="secondary"
            mt="auto"
            shape="outline"
            as="a"
            href={href}
            width="100%"
          >
            Learn More
          </Button>
        )}
      </Flex>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Flex)(
  css({
    width: ["340px", "auto", "auto"],
    flexDirection: "column",
    borderRadius: "md",
    textDecoration: "none",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.24)",
    bg: "white",
  })
);
