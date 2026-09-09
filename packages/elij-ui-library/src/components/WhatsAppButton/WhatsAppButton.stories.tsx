import type { Meta, StoryObj } from "@storybook/react-vite";
import { WhatsAppButton } from "./WhatsAppButton";
import { WhatsAppIcon } from "../../icons/WhatsAppIcon";

const meta = {
  title: "Actions/WhatsAppButton",
  component: WhatsAppButton,
  tags: ["autodocs"],
  args: {
    href: "#whatsapp",
    children: "WhatsApp enquire",
    icon: <WhatsAppIcon title="WhatsApp" />,
  },
} satisfies Meta<typeof WhatsAppButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Small: Story = { args: { size: "small" } };
export const Secondary: Story = { args: { variant: "secondary" } };
