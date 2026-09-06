import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> { children: ReactNode; interactive?: boolean }
export function Card({ children, interactive = false, className = '', ...props }: CardProps) { return <div className={`ui-card${interactive ? ' ui-card--interactive' : ''}${className ? ` ${className}` : ''}`} {...props}>{children}</div>; }
export function CardHeader({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={`ui-card__header${className ? ` ${className}` : ''}`} {...props} />; }
export function CardBody({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={`ui-card__body${className ? ` ${className}` : ''}`} {...props} />; }
export function CardFooter({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={`ui-card__footer${className ? ` ${className}` : ''}`} {...props} />; }
