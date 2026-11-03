// index.d.ts
import { FC, ReactNode } from 'react';

export interface TimelineEvent {
  /** Date shown on the card badge (any value accepted by `new Date()`) */
  dateTime: string | number | Date;
  title: ReactNode;
  /** Always visible under the title */
  shortDescription?: ReactNode;
  /** Shown when the card's "Read More" button is clicked */
  description?: ReactNode;
  image?: string;
  /** Defaults to `title` */
  imageAlt?: string;
  imageCaption?: ReactNode;
  tags?: ReactNode[];
  /** Card background color (default: '#ffffff') */
  backgroundColor?: string;
}

export interface HorizontalTimelineProps {
  events?: TimelineEvent[];
  /** Card width in px (default: 320) */
  cardWidth?: number;
  /** Card minimum height in px (default: 400) */
  cardHeight?: number;
  /** Space between cards in px (default: 20) */
  spacing?: number;
  /** Show bullet navigation (default: true) */
  showBullets?: boolean;
  /** Show previous/next arrows (default: true) */
  showArrows?: boolean;
  /** Move to the next card automatically (default: false) */
  autoPlay?: boolean;
  /** Auto-play interval in ms (default: 3000) */
  autoPlayInterval?: number;
  /** Allow dragging/swiping the timeline (default: true) */
  dragEnabled?: boolean;
  /** Timeline background color (default: '#f5f5f5') */
  backgroundColor?: string;
  /** Color of the line, date badges, bullets, tags and buttons (default: '#1976d2') */
  accentColor?: string;
  /** Extra content per card, keyed by event index */
  customComponents?: Record<number, ReactNode>;
}

export const HorizontalTimeline: FC<HorizontalTimelineProps>;

// Demo component
export const TimelineDemo: FC;
