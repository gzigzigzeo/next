import { Centrator } from "components/Layout";
import Box from "components/Box";
import Flex from "components/Flex";
import wavelight from "/sharedAssets/images/wave-light.png";

export interface HIWHeaderProps {
  subtitle?: string;
  title: string;
  description: string;
}
const bg = {
  backgroundImage: `url(${wavelight}), linear-gradient(125deg ,#F0F2F460,#FFFFFF)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top",
  backgroundSize: "100%",
  borderBottom: "1px solid #F0F2F4",
};

export const HIWHeader = ({ subtitle, title, description }: HIWHeaderProps) => {
  return (
    <Flex pt={[3, 0]} {...bg}>
      <Centrator
        justifyContent={["auto", "space-between"]}
        alignItems="stretch"
        flexDirection={["column", "row"]}
      >
        <Box flex="1 1 auto" py={[4, 6]} order={[1, 0]}>
          <Flex flexDirection="column" alignItems="flexStart">
            {subtitle && (
              <Box
                mb={3}
                color="dark-purple"
                fontWeight="bold"
                fontSize="text-xl"
                lineHeight="md"
              >
                {subtitle}
              </Box>
            )}
            {title && (
              <Box
                mt={2}
                as="h1"
                color="black"
                fontSize={["header-1", "54px"]}
                lineHeight={["xl", "xxl"]}
                fontWeight="black"
                textAlign="left"
              >
                {title}
              </Box>
            )}
          </Flex>
          <Box
            mt={[3, 6]}
            fontSize="text-xl"
            lineHeight="lg"
            color="darkest"
            maxWidth="100%"
          >
            {description}
          </Box>
        </Box>
      </Centrator>
    </Flex>
  );
};
