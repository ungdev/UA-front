import type { Meta, StoryObj } from '@storybook/react';
import Counter from './Counter';

const meta = {
  title: 'Landing/Counter',
  component: Counter,
  tags: ['autodocs'],
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 200,
    name: 'Utilisateurs',
  },
};

export const WithClassAndValueText: Story = {
  args: {
    value: 200,
    valueText: ' €',
    name: 'Utilisateurs',
    className: 'class',
  },
};
