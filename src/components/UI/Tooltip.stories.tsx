import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Survolez ce texte !',
    tooltip: 'Ceci est une toolbox',
    className: 'myClass',
  },
};

export const Disabled: Story = {
  args: {
    children: "Il n'y aura pas de tooltip",
    tooltip: 'Je vous avais prévenu',
    enabled: false,
  },
};

export const Centered: Story = {
  args: {
    children: 'Survolez ce texte !',
    tooltip: 'Ceci est une toolbox',
    center: true,
  },
};
