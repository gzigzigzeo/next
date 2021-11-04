import styled from "styled-components";
import css from "@styled-system/css";
import Section from "components/Section";
import Flex from "components/Flex";
import NextImage from "next/image";
import wavelight from "./assets/wave-light.png";

export interface CenterCardProps {
  src?: string;
  title: string;
  text: string;
}

export const CenterCard = ({ src, title, text }: CenterCardProps) => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      bg="purple"
      justifyContent="center"
      alignItems="center"
      minHeight={[null, 632]}
    >
      <StyledCard>
        {src && (
          <Flex
            justifyContent="center"
            alignItems="center"
            bg="dark-purple"
            border="1px solid white"
            borderRadius="circle"
            height={48}
            width={48}
            boxShadow="0px 8px 16px rgba(12, 12, 14, 0.24)"
            mb={[3, 4]}
          >
            <NextImage src={src} alt="small icon" height={24} width={24} />
          </Flex>
        )}
        <Flex
          as="h2"
          color="black"
          fontSize={["text-lg", "header-1"]}
          lineHeight={["md", "xxl"]}
          mb={[3, 5]}
          mt={0}
          px={5}
          fontWeight="black"
          textAlign="center"
          flexWrap="wrap"
        >
          {title}
        </Flex>
        <Flex
          as="p"
          color="black"
          fontSize={["text-md", "text-xl"]}
          lineHeight={["md", "lg"]}
          mt={0}
          mb={[0, 5]}
          maxWidth={["90%", "75%"]}
          textAlign="center"
        >
          {text}
        </Flex>
      </StyledCard>
    </Section>
  );
};

const StyledCard = styled(Flex)(
  css({
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "74%",
    maxWidth: [null, 1400],
    width: ["86%", "67%"],
    py: [5, 9],
    my: [6, 3],
    borderRadius: "md",
    backgroundColor: "white",
    backgroundImage: `url(${wavelight})`,
    backgroundSize: "cover",
  })
);
