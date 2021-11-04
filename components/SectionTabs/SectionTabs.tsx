import { Children, isValidElement, useState } from "react";
import css from "@styled-system/css";
import styled from "styled-components";
import Box from "components/Box";
import Flex from "components/Flex";
import HeadlessButton from "components/HeadlessButton";
import Image from "components/Image";
import { Centrator } from "components/Layout";
import { transition, variant } from "components/system";

interface SectionTabsItemProps {
  children: React.ReactNode;
  description: React.ReactNode;
  id?: number;
  selected?: boolean;
  src: string;
  title: string;
  alignment?: "tabsLeft" | "tabsRight";
  narrowTabs?: boolean;
  onChange?: (id: number) => void;
}

const SectionTabsItem = ({
  children,
  alignment,
  description,
  id = 0,
  selected = false,
  src,
  title,
  narrowTabs,
  onChange = () => undefined,
}: SectionTabsItemProps) => {
  return (
    <>
      <StyledTab selected={selected} onClick={() => onChange(id)}>
        {/* Icon */}
        <Image
          src={src}
          width="24px"
          height="24px"
          position="absolute"
          top={["4px", "20px"]}
          left={["0", "16px"]}
          alt=""
        />
        <Box
          as="h3"
          ml={6}
          fontSize="text-xl"
          fontWeight="black"
          lineHeight="lg"
        >
          {title}
        </Box>
        <Box mt={2} fontSize="text-md" lineHeight="md" color="darkest">
          {description}
        </Box>
      </StyledTab>
      <Flex
        zIndex={selected ? 1 : 0}
        pointerEvents={selected ? "none" : "auto"}
        opacity={["1", selected ? "1" : "0"]}
        transition={transition([["opacity", "slow"]])}
        position={["static", "absolute"]}
        top="0"
        right={alignment === "tabsLeft" ? 0 : narrowTabs ? 400 : 490}
        bottom="0"
        left={alignment === "tabsRight" ? 0 : narrowTabs ? 400 : 490}
        alignItems="stretch"
      >
        {children}
      </Flex>
    </>
  );
};

export interface SectionTabsProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  alignment?: "tabsLeft" | "tabsRight";
  narrowTabs?: boolean;
}

export const SectionTabs = ({
  children,
  title,
  subtitle,
  description,
  narrowTabs = false,
  alignment = "tabsLeft",
}: SectionTabsProps) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const onChange = (index: number) => setCurrentTab(index);

  const childTabProps = Children.toArray(children)
    .filter(
      (c) =>
        isValidElement(c) &&
        c.props.title &&
        c.props.children &&
        c.props.src &&
        c.props.description
    )
    .map(
      (c) => (c as React.ReactComponentElement<typeof SectionTabsItem>).props
    ) as SectionTabsItemProps[];

  return (
    <Centrator py={[4, 11]}>
      <Box minWidth="100%">
        {subtitle && (
          <Box
            mb={[3, 5]}
            fontSize={["text-lg", "text-xl"]}
            fontWeight="bold"
            lineHeight="md"
            color="light-purple"
          >
            {subtitle}
          </Box>
        )}
        {title && (
          <Box
            mb={[1, 3]}
            fontSize={["26px", "header-1"]}
            fontWeight="black"
            lineHeight="xl"
            color="black"
          >
            {title}
          </Box>
        )}
        {description && (
          <Box
            mb={[3, 5]}
            fontSize="text-xl"
            width={[null, "90%"]}
            lineHeight="lg"
            color="darkest"
          >
            {description}
          </Box>
        )}
        <Flex
          position="relative"
          flexDirection="column"
          alignItems={alignment === "tabsRight" ? "flex-end" : "flex-start"}
        >
          <Box maxWidth={narrowTabs ? ["100%", "340px"] : ["auto", "400px"]}>
            {childTabProps.map((props, id) => (
              <SectionTabsItem
                alignment={alignment}
                narrowTabs={narrowTabs}
                key={id}
                {...props}
                onChange={onChange}
                id={id}
                selected={id === currentTab}
              />
            ))}
          </Box>
        </Flex>
      </Box>
    </Centrator>
  );
};

SectionTabs.Item = SectionTabsItem;

const StyledTab = styled(HeadlessButton)<{ selected: boolean }>(
  css({
    display: "block",
    border: ["none", "2px solid"],
    borderRadius: "default",
    position: "relative",
    textAlign: "left",
    px: [0, 3],
    pt: [0, 3],
    pb: 2,
    willChange: "transform",
    transition: transition([
      ["backgroundColor", "interaction"],
      ["borderColor", "interaction"],
      ["boxShadow", "interaction"],
    ]),
    "&:nth-of-type(1n+2)": { mt: 3 },
  }),
  variant({
    prop: "selected",
    variants: {
      true: {
        borderColor: ["auto", "dark-purple"],
        boxShadow: ["auto", "0 1px 4px rgba(0,0,0,.24)"],
      },
      false: {
        borderColor: ["auto", "lightest-gray"],
        boxShadow: ["auto", "auto"],
        "&:hover, &:active, &:focus": {
          bg: "lightest-gray",
          borderColor: "gray",
          boxShadow: "0 2px 8px rgba(0,0,0,.24)",
        },
      },
    },
  })
);
