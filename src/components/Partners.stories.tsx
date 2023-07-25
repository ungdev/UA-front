import type { Meta, StoryObj } from '@storybook/react';
import Partners from './Partners';
import { Providers } from '@/lib/provider';

const meta = {
    title: 'Main/Partners',
    component: Partners,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    render: (args: any) => (
        <Providers>
            <Partners {...args} />
        </Providers>
    ),
} satisfies Meta<typeof Partners>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

};
