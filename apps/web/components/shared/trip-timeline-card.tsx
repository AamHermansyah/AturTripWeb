import { ComponentType } from 'react';
import {
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle
} from '../ui/timeline'
import { IconProps } from '@phosphor-icons/react'

interface TripTimelineCardProps {
  item: {
    icon?: ComponentType<IconProps>;
    title: string;
    sub?: string;
    date: string;
    step: number;
    image?: string;
  };
}

function TripTimelineCard({ item }: TripTimelineCardProps) {
  return (
    <TimelineItem
      step={item.step}
      className="pt-2 group-data-[orientation=vertical]/timeline:ms-5.5 group-data-[orientation=vertical]/timeline:not-last:pb-4"
    >
      <div className="bg-card/70 p-4 rounded-4xl shadow-sm">
        <TimelineHeader>
          <TimelineSeparator className="group-data-[orientation=vertical]/timeline:w-px group-data-[orientation=vertical]/timeline:top-0 group-data-[orientation=vertical]/timeline:-left-4" />
          <TimelineDate className="mb-0 text-primary font-bold tracking-wider">
            {item.date}
          </TimelineDate>
          <TimelineTitle className="font-bold font-heading">{item.title}</TimelineTitle>
          <TimelineIndicator className="group-data-[orientation=vertical]/timeline:-left-4 flex size-6 items-center justify-center border-none bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground">
            {item.icon && <item.icon size={14} />}
          </TimelineIndicator>
        </TimelineHeader>
        {(item.sub || item.image) && (
          <TimelineContent className="text-[13px] text-muted-foreground">
            {item.sub && <p>{item.sub}</p>}
            {item.image && (
              <div className="mt-3 rounded-2xl overflow-hidden border border-border/50 shadow-xs relative h-32 w-full">
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
            )}
          </TimelineContent>
        )}
      </div>
    </TimelineItem>
  )
}

export default TripTimelineCard