import type { Meta, StoryObj } from '@storybook/react';
import Title from './Title';

const meta = {
    title: 'UI/Title',
    component: Title,
    tags: ['autodocs'],
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Level1: Story = {
    args: {
        level: 1,
        children: 'Title',
        gutterBottom: false,
        align: 'center',
        className: 'class',
        id: 'id'
    }
};

export const Level2: Story = {
    args: {
        level: 2,
        children: 'Title',
        gutterBottom: false,
        align: 'center',
        className: 'class',
        id: 'id'
    }
};

export const Level3: Story = {
    args: {
        level: 3,
        children: 'Title',
        gutterBottom: false,
        align: 'center',
        className: 'class',
        id: 'id'
    }
};

export const Level4: Story = {
    args: {
        level: 4,
        children: 'Title',
        gutterBottom: false,
        align: 'center',
        className: 'class',
        id: 'id'
    }
};