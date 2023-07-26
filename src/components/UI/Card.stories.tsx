import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    className: 'class',
    onClick: () => {
      console.log('onClick');
    }
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dark: false,
    imgSrc: 'https://via.placeholder.com/150',
    content: 'Content',
    buttonContent: 'Button',
    href: 'https://www.google.com/',
    target: '_blank',
    classNameImg: 'class',
    alt: 'alt',
    divider: 'bottom',
  },
};

export const Dark: Story = {
  args: {
    dark: true,
    imgSrc: 'https://via.placeholder.com/150',
    content: 'Content',
    buttonContent: 'Button',
    href: 'https://www.google.com/',
    target: '_blank',
    classNameImg: 'class',
    alt: 'alt',
    divider: 'belowImage',
  },
};

export const NoImage: Story = {
  args: {
    dark: false,
    content: 'Content',
    buttonContent: 'Button',
    href: 'https://www.google.com/',
    target: '_blank',
    classNameImg: 'class',
    alt: 'alt',
    divider: 'bottom',
  },
};