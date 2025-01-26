'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Wifi, Home, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Offline = () => {
  const router = useRouter();

  const handleReturnHome = () => {
    router.push('/dashboard');
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center">
        <Wifi className="h-16 w-16 text-yellow-500 mx-auto" />
        <h1 className="text-3xl font-bold mt-4">No Internet Connection</h1>
        <p className="text-gray-600 mt-2">Please check your network and try again.</p>
        
        <div className="flex justify-center space-x-4 mt-6">
          <Button onClick={handleReturnHome}>
            <Home className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Button>
          <Button variant="outline" onClick={handleRetry}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry Connection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Offline;