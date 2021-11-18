import styled from "styled-components";
import css from "@styled-system/css";
import NextImage from "next/image";
import Box from "components/Box";
import Flex from "components/Flex";
import Button from "components/Button";

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

export interface ProductCardProps {
  children: React.ReactNode;
  title: string;
  src: string;
  href: string;
  description: string;
}

export const ProductCard = ({
  description,
  src,
  title,
  href,
}: ProductCardProps) => {
  return (
    <StyledWrapper>
      {/* top half */}
      <Flex
        flexDirection="row"
        px={4}
        justifyContent="center"
        alignItems="center"
      >
        <Flex flexDirection="row" height={100}>
          <NextImage src={src} alt={title} height={80} width={80} />
        </Flex>
      </Flex>

      {/* bottom half */}
      <Flex
        flexDirection="column"
        flexGrow={1}
        alignItems="stretch"
        pt={[3, 2]}
      >
        <Box
          fontSize="text-lg"
          lineHeight="lg"
          color="black"
          fontWeight="bold"
          mb={3}
        >
          {title}
        </Box>
        <Box fontSize="text-md" lineHeight="md" color="darkest" pb={4}>
          {description}
        </Box>
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
      </Flex>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Flex)(
  css({
    width: ["100%", "340px", "auto"],
    flexDirection: "column",
    textDecoration: "none",
    mx: 2,
    justifySelf: "center",
  })
);
