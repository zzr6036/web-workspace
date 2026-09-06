import type { HTMLAttributes } from 'react';
function part(name: string) { return function LayoutPart({ className = '', ...props }: HTMLAttributes<HTMLElement>) { return <section className={`ui-layout__${name}${className ? ` ${className}` : ''}`} {...props} />; }; }
export function Layout({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={`ui-layout${className ? ` ${className}` : ''}`} {...props} />; }
export const Header = part('header'); export const Sider = part('sider'); export const Content = part('content'); export const Footer = part('footer');
