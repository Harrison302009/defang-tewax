"use client";
import { getServerSession } from '@/modules/lib/get-server-session/get-server-session';
import { prisma } from '@/modules/lib/prisma-client/prisma-client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await signOut({
        callbackUrl: "/",
      });
    })();
  }, [router]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">You are logging out</h1>
        <p className="text-gray-600 mb-6">
          Thank you for using our chat app. We hope to see you again soon!
        </p>
      </div>
    </div>
  );
};

export default LogoutPage;
