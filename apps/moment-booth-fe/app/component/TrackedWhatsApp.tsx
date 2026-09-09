"use client";

import type { AnchorHTMLAttributes } from "react";
import { track } from "@vercel/analytics";
import { WhatsAppButton, type WhatsAppButtonProps } from "elij-ui-library";

type WhatsAppLocation = "header" | "hero" | "contact" | "floating" | "footer";

type TrackedLocationProps = {
  location: WhatsAppLocation;
};

export function TrackedWhatsAppButton({
  location,
  ...props
}: WhatsAppButtonProps & TrackedLocationProps) {
  return (
    <span onClick={() => track("whatsapp_click", { location })}>
      <WhatsAppButton {...props} />
    </span>
  );
}

export function TrackedWhatsAppLink({
  location,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & TrackedLocationProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) track("whatsapp_click", { location });
      }}
    />
  );
}
