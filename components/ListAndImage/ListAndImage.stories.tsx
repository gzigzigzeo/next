import { Story } from "@storybook/react";
import { ListAndImage, ListAndImageProps } from "./ListAndImage";
import Flex from "components/Flex";
import Link from "components/Link";
import NextImage from "next/image";
import security from "./assets/security-illustration@2x.png";

const StoryComponent: Story<ListAndImageProps> = (args) => (
  <ListAndImage {...args} />
);

export default {
  component: StoryComponent,
  title: "Site/ListAndImage",
};

export const Default = StoryComponent.bind({});

Default.args = {
  title: "Security Team",
  listHeading:
    "Teleport maintains a cross functional security team dedicated to:",
  listItems: [
    "Teleport code, dependency, and supply chain vulnerability detection and response",
    "Teleport Cloud Security",
    "Corporate IT Security",
  ],
  outro: (
    <Flex flexDirection={["column", "row"]}>
      <Flex>You can reach this team by email:&nbsp;</Flex>
      <Link scheme="site" href="mailto:security@goteleport.com">
        security@goteleport.com
      </Link>
    </Flex>
  ),
  children: (
    <NextImage src={security} alt="Security Team" height={219} width={328} />
  ),
};
