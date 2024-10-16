import type { StoryObj, Meta } from '@storybook/react';
import App from '../App';

const meta = {
  title: 'Example/App',
  component: App,
  parameters: {
    layout: 'fullscreen'
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};