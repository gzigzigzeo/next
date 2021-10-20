import { Story } from "@storybook/react";
import { MDXProvider } from "@mdx-js/react";
import { components } from "layouts/SitePage";
import { SplitCode, SplitCodeProps } from "./SplitCode";

const StoryComponent: Story<SplitCodeProps> = (args) => (
  <MDXProvider components={components}>
    <SplitCode {...args} />
  </MDXProvider>
);

export default {
  component: StoryComponent,
  title: "Site/SplitCode",
};

export const Default = StoryComponent.bind({});

Default.args = {
  children: (
    <>
      <SplitCode.Item title="Example Title 1">
        Some example code. In .mdx files it needs to be wrapped in triple
        backticks.
      </SplitCode.Item>
      <SplitCode.Item title="Example Title 2">
        Some example code. In .mdx files it needs to be wrapped in triple
        backticks.
      </SplitCode.Item>
    </>
  ),
};
