"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../lib/api/users";

const UserTable = dynamic(() => import("./UserTable"), {
  loading: () => (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-gray-500">Loading table...</p>
    </div>
  ),
});

export default function DashboardClient() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const currentPage = Math.max(1, Number(params.get("page") || "1"));
  const search = params.get("search") || "";
  const limit = 6;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", currentPage, search],
    queryFn: () => getUsers(currentPage, search),
  });

  const updateQuery = useCallback(
    (next: { page?: number; search?: string }) => {
      const query = new URLSearchParams(params.toString());

      if (next.search !== undefined) {
        if (next.search) {
          query.set("search", next.search);
        } else {
          query.delete("search");
        }
      }

      if (next.page !== undefined) {
        query.set("page", String(next.page));
      }

      router.push(`${pathname}?${query.toString()}`);
    },
    [params, pathname, router]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      updateQuery({ search: value, page: 1 });
    },
    [updateQuery]
  );

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-gray-500">Loading users...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-700">Unable to load users</h2>
          <p className="mt-1 text-sm text-red-600">
            {(error as Error)?.message || "Please refresh and try again."}
          </p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(data.total / limit);
  const pages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (page) => page >= 1 && page <= totalPages
  );

  return (
    <div className="p-8 space-y-6">
      <UserTable
        users={data.users}
        search={search}
        onSearchChange={handleSearchChange}
      />

      <div className="flex justify-center gap-2">
        {currentPage > 1 && (
          <button
            type="button"
            onClick={() => updateQuery({ page: currentPage - 1 })}
            className="px-4 py-2 border rounded-lg"
          >
            Prev
          </button>
        )}

        {pages.map((page) => (
          <button
            type="button"
            key={page}
            onClick={() => updateQuery({ page })}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === page ? "bg-black text-white" : ""
            }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            type="button"
            onClick={() => updateQuery({ page: currentPage + 1 })}
            className="px-4 py-2 border rounded-lg"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
