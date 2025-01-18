"use client";
import React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full text-center">
        <AlertTriangle
          className="mx-auto mb-6 text-red-500"
          size={80}
          strokeWidth={1.5}
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you are looking for seems to have wandered off into the
          digital wilderness.
        </p>
        <div className="flex justify-center space-x-4">
          <Button>
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
