import type { HTMLAttributes } from 'react';
export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> { variant?: 'text' | 'circle' | 'rectangle'; width?: number | string; height?: number | string; animated?: boolean }
export function Skeleton({ variant = 'text', width, height, animated = true, className = '', style, ...props }: SkeletonProps) { return <span aria-hidden="true" className={`ui-skeleton ui-skeleton--${variant}${animated ? ' ui-skeleton--animated' : ''}${className ? ` ${className}` : ''}`} style={{ width, height, ...style }} {...props} />; }
