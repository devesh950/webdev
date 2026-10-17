'use client';

import React, { createContext, useContext, useState } from 'react';
import { ReservationModal } from '@/components/reservation-modal';

type ReservationContextType = {
  openReservation: () => void;
  closeReservation: () => void;
};

const ReservationContext = createContext<ReservationContextType>({
  openReservation: () => {},
  closeReservation: () => {},
});

export function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ReservationContext.Provider
      value={{
        openReservation: () => setIsOpen(true),
        closeReservation: () => setIsOpen(false),
      }}
    >
      {children}
      <ReservationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  return useContext(ReservationContext);
}
