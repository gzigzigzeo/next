import styled from "styled-components";
import css from "@styled-system/css";
import Head from "components/Head";
import NextImage from "next/image";
import Link from "components/Link";
import Box from "components/Box";
import Flex from "components/Flex";
import Logo from "components/Logo";
import { MarketoBrowserForm } from "components/MarketoForm";
import { transition } from "components/system";
import pam from "./assets/get-in-touch@2x.png";
import webBackground from "./assets/newsletter_web.png";
import mobBackground from "./assets/newsletter_mob.png";
import wavelight from "sharedAssets/images/wave-light.png";

/**
 *
 * @returns a standalone, full-page component with email subscription form.
 * ***Not intended to be used within an MDX file.***
 * The button text must be changed in marketo.
 */

const ContactCard = () => {
  return (
    <>
      <Head
        title="Contact Us | Contact Sales"
        description="Contact Teleport, get pricing and sales questions answered, or schedule a demo"
      />
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        minHeight="100vh"
        backgroundImage={[`url(${mobBackground})`, `url(${webBackground})`]}
        px={[2, 4]}
      >
        <Box as="header" mt={[5, 9]} mb={[5, 5]} color="white">
          <Logo width={["120px", "180px"]} height={["24px", "38px"]} />
        </Box>

        <StyledCard as="section">
          {/* Image Side, currently hidden on mobile, mobile styles remain for reference */}
          <StyledPamCard width={["100%", 356]}>
            <Flex
              flexDirection="column"
              justifyContent="center"
              width="100%"
              maxWidth={["420px", "initial"]}
            >
              <Flex
                position="relative"
                width="auto"
                height={[200, 348]}
                mb={5}
                p={5}
                mt={[6, null]}
              >
                <NextImage
                  src={pam}
                  alt="Pam the wonder robot"
                  layout="fill"
                  objectFit="contain"
                />
              </Flex>
            </Flex>
          </StyledPamCard>

          {/* Side with email form */}
          <StyledForm width={["100%", 488]} maxWidth={[420, 488]}>
            <Flex
              justifyContent="center"
              flexDirection="column"
              alignItems="flex-start"
              px={[3, 5]}
              pt={[4, 6]}
            >
              <Box
                as="h1"
                fontSize={["header-2", "header-2"]}
                lineHeight={["lg", "lg"]}
                pb={[2, 3]}
                fontWeight={["bold", "black"]}
              >
                Get in Touch
              </Box>
              <Box
                fontSize="text-lg"
                lineHeight="md"
                pb={[0, 3]}
                color="darkest"
              >
                Please provide us with your information and how we can help you.
                Our team will get back to you with information you need.
              </Box>
            </Flex>

            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxWidth={["420px", "initial"]}
              px={[3, 5]}
              pt={[6, 0]}
              pb={[0, 4]}
            >
              <Flex
                backgroundColor="white"
                alignItems="stretch"
                flexDirection="column"
                mb={[5, 0]}
                width="100%"
                minHeight="44px"
                minWidth={["auto", "400px"]}
              >
                <MarketoBrowserForm id="1126" />
              </Flex>
            </Flex>
          </StyledForm>
        </StyledCard>

        {/* Footer: hidden on mobile */}
        <Box as="footer" mb={9}>
          <StyledCopyright>
            © 2021 GRAVITATIONAL, INC. ALL RIGHTS RESERVED
          </StyledCopyright>
          <Box
            display={["none", "flex"]}
            flexDirection="row"
            justifyContent="center"
          >
            <StyledLink href="/tos/">TERMS OF SERVICE</StyledLink>
            <StyledLink href="/privacy/">PRIVACY POLICY</StyledLink>
            <StyledLink href="/security/">SECURITY POLICY</StyledLink>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

const StyledPamCard = styled(Flex)(
  css({
    display: ["none", "flex"],
    borderTopLeftRadius: [0, "md"],
    borderBottomLeftRadius: "md",
    borderBottomRightRadius: ["md", 0],
    justifyContent: "center",
    backgroundImage: `url(${wavelight})`,
    backgroundPosition: "30% 150%",
    backgroundSize: "300%",
    backgroundRepeat: "no-repeat",
    backgroundColor: "lightest-gray",
  })
);

const StyledForm = styled(Flex)(
  css({
    flexDirection: "column",
    justifyContent: "center",
    background: "white",
    borderRadius: "md",
    boxSizing: "border-box",
  })
);

const StyledCard = styled(Flex)(
  css({
    maxWidth: "944px",
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: "md",
    marginBottom: [8, 5],
    boxShadow: "0 0 24px rgba(0, 0, 0, 0.32)",
  })
);

const StyledCopyright = styled("div")(
  css({
    display: ["none", "block"],
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "text-sm",
    textAlign: "center",
    textTransform: "uppercase",
  })
);

const StyledLink = styled(Link)(
  css({
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "text-sm",
    textAlign: "center",
    textDecoration: "underline",
    textTransform: "uppercase",
    mx: 1,
    mt: 2,
    padding: 1,
    cursor: "pointer",
    transition: transition([["color", "interaction"]]),
    "&:hover": {
      color: "white",
      textDecoration: "none",
    },
    "&:focus, &:active": {
      color: "white",
      outline: "none",
    },
  })
);

export default ContactCard;
