import type { ReactNode } from "react";
import { ActionLinkButton } from "../ActionLinkButton";
import type { ButtonSize, ButtonVariant } from "../Button";

export interface WhatsAppButtonProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
  target?: string;
  rel?: string;
}
export function WhatsAppButton({
  href,
  children,
  icon,
  size = "large",
  variant = "primary",
  className,
  target = "_blank",
  rel = "noreferrer",
}: WhatsAppButtonProps) {
  return (
    <ActionLinkButton
      href={href}
      target={target}
      rel={rel}
      size={size}
      variant={variant}
      className={className}
      icon={icon}
    >
      {children}
    </ActionLinkButton>
  );
}
