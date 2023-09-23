import type { Meta, StoryObj } from '@storybook/react';
import CookieConsent from './CookieConsent';

const meta = {
  title: 'Main/CookieConsent',
  component: CookieConsent,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CookieConsent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialDisplay: true,
  },
};
