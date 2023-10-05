import type { Meta, StoryObj } from '@storybook/react';
import VerticalDivider from './VerticalDivider';

const meta = {
  title: 'UI/VerticalDivider',
  component: VerticalDivider,
  tags: ['autodocs'],
} satisfies Meta<typeof VerticalDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
