import type { Meta, StoryObj } from '@storybook/react-vite';
import { EventCarousel } from './EventCarousel';

const media = [{ src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900', alt: 'Celebration portrait' }, { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900', alt: 'Wedding details' }];
const meta = { title: 'Media/EventCarousel', component: EventCarousel, tags: ['autodocs'], args: { title: 'Wedding keepsakes', description: 'Swipe through a small collection of event moments.', media } } satisfies Meta<typeof EventCarousel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Images: Story = {};
export const WithVideo: Story = { args: { media: [...media, { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', type: 'video', alt: 'A short celebration video' }] } };
export const WithoutDescription: Story = { args: { description: undefined } };
