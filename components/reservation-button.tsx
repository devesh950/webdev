'use client';

import { Sparkles, Utensils } from 'lucide-react';
import { useReservation } from '@/components/reservation-context';

type ReservationButtonProps = {
  className?: string;
  variant?: 'primary' | 'ghost';
  children?: React.ReactNode;
};

export function ReservationButton({
  className = '',
  variant = 'primary',
  children,
}: ReservationButtonProps) {
  const { openReservation } = useReservation();

  const baseClass =
    variant === 'primary'
      ? 'btn btn-primary'
      : 'btn btn-ghost';

  return (
    <button
      type="button"
      onClick={openReservation}
      className={`${baseClass} ${className}`}
    >
      <Utensils size={15} aria-hidden="true" />
      {children || 'Book a Table'}
    </button>
  );
}
