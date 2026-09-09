import type { ReactNode } from 'react';
import { Button, type ButtonSize, type ButtonVariant } from '../Button';

export interface ActionLinkButtonProps { href: string; children: ReactNode; icon?: ReactNode; size?: ButtonSize; variant?: ButtonVariant; className?: string; target?: string; rel?: string }
export function ActionLinkButton({ href, children, icon, size = 'medium', variant = 'primary', className, target, rel }: ActionLinkButtonProps) {
  return <a href={href} target={target} rel={rel}><Button size={size} variant={variant} className={className} style={{ columnGap: 10 }}>{icon}{children}</Button></a>;
}
