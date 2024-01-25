import React from "react";
import { Story, Meta } from "@storybook/react";
import CounterNumberShowcase from "./CounterNumberShowcase";

export default {
  title: "Prelems/Counter Number Showcase",
  component: CounterNumberShowcase,
} as Meta;

const Template: Story = (args) => <CounterNumberShowcase {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: CounterNumberShowcase.defaultProps.content,
  authoringHelper: CounterNumberShowcase.defaultProps.authoringHelper,
  analytics: CounterNumberShowcase.defaultProps.analytics,
  secondaryArgs: CounterNumberShowcase.defaultProps.secondaryArgs,
};
