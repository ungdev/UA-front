import type { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';

const meta = {
  title: 'UI/Loader',
  component: Loader,
  tags: ['autodocs'],
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
