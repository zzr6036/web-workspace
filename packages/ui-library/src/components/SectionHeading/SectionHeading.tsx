import type { ReactNode } from 'react';
import { Paragraph } from '../Typography';
import { Title } from '../Typography';

export interface SectionHeadingProps { eyebrow: ReactNode; title: ReactNode; description?: ReactNode; className?: string }
export function SectionHeading({ eyebrow, title, description, className = '' }: SectionHeadingProps) {
  return <div className={`ui-section-heading${className ? ` ${className}` : ''}`}><div><p className="eyebrow">{eyebrow}</p><Title level={2}>{title}</Title></div>{description ? <Paragraph>{description}</Paragraph> : null}</div>;
}
