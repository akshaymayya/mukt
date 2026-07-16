'use client';
import React from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import DashboardApp from '../../Dashboard';
import { useRouter } from 'next/navigation';

export default function DashboardRoute() {
  const router = useRouter();
  
  return (
    <ProtectedRoute>
      <DashboardApp onBack={() => router.push('/')} />
    </ProtectedRoute>
  );
}
