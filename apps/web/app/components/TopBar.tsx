'use client';

import { useEffect, useState } from 'react';
import LocalizedLink from './LocalizedLink';

type TopBarProps = {
  enabled?: boolean;
  businessHoursOnly?: boolean;
  text?: string | null;
  linkLabel?: string | null;
  linkHref?: string | null;
};

const isBusinessHours = (now: Date) => {
  const day = now.getDay();
  const hour = now.getHours();
  const isWeekday = day >= 1 && day <= 5;
  return isWeekday && hour >= 9 && hour < 18;
};

export default function TopBar({
  enabled = false,
  businessHoursOnly = true,
  text,
  linkLabel,
  linkHref,
}: TopBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      return;
    }
    if (!businessHoursOnly) {
      setVisible(true);
      return;
    }
    setVisible(isBusinessHours(new Date()));
  }, [enabled, businessHoursOnly]);

  if (!visible) return null;
  if (!text && !linkLabel) return null;

  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between text-xs">
        <span className="text-gray-500">{text}</span>
        {linkLabel && linkHref && (
          <LocalizedLink href={linkHref} className="font-semibold text-accent hover:text-primaryDark">
            {linkLabel}
          </LocalizedLink>
        )}
      </div>
    </div>
  );
}
