import { Story } from "@storybook/react";
import StatsContainer from "./StatsContainer";
import { StatsCard, StatsCardProps } from "./StatsCard";

export default {
  component: StatsContainer,
  title: "Site/StatsContainer",
};

const CardWrapper: Story<StatsCardProps> = (args) => <StatsCard {...args} />;

const Card = CardWrapper.bind({});

export const Default = () => {
  return (
    <StatsContainer>
      <Card title="3/5" description="top crypto exchanges" />
      <Card title="$5T" description="trillion in market cap" />
      <Card title="3" description="of 2020's largest IPOs" />
      <Card title="2" description="mobile gaming giants" />
    </StatsContainer>
  );
};
