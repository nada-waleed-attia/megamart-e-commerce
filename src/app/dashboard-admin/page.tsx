"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardAdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard-admin/dashboard');
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div style={{ 
        width: '50px', 
        height: '50px', 
        border: '4px solid #e2e8f0',
        borderTopColor: '#3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p>جاري التحويل...</p>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
