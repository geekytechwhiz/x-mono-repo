import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import ImageCrop from './ImageCrop';

const meta: Meta<typeof ImageCrop> = {
  component: ImageCrop,
  title: 'ImageCrop',
};
export default meta;
type Story = StoryObj<typeof ImageCrop>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ImageCrop!/gi)).toBeTruthy();
  },
};
