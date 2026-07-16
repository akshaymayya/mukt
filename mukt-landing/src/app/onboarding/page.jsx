'use client';
import React from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import OnboardingPage from '../../views/OnboardingPage';

export default function OnboardingRoute() {
  return (
    <ProtectedRoute>
      <OnboardingPage />
    </ProtectedRoute>
  );
}
