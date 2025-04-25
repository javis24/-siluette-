'use client';

import dynamic from 'next/dynamic';

const CalendarioCitas = dynamic(() => import('@/components/CalendarioCitas'), { ssr: false });

export default function CalendarioPage() {
  return <CalendarioCitas />;
}
