import type { Meta, StoryObj } from '@storybook/react';
import PanelHeader from './PanelHeader';
const meta = {
  title: 'Dashboard/PanelHeader',
  component: PanelHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof PanelHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pathname: '/dashboard',
    links: () => [
      { title: 'Dashboard', href: '/dashboard' },
      { title: 'Settings', href: '/settings' },
    ],
    title: 'Dashboard',
  }
};
