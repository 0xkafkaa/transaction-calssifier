"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center max-w-2xl px-4">
        {/* Heading */}
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to the{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Transaction Classifier
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg text-gray-600 mb-8">
          Easily classify your transactions with our powerful and intuitive
          tool. Upload your UPI transactions and get insights in seconds!
        </p>

        {/* Call-to-Action Button */}
        <Button
          onClick={() => router.push("/upload")}
          className="px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
        >
          <span>Get Started</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
