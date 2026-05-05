"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-8">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">
          Something went wrong in dashboard
        </h2>
        <p className="mt-1 text-sm text-red-600">
          Please retry. If the issue continues, refresh the page.
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="mt-4 rounded-lg border px-4 py-2 text-sm"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
