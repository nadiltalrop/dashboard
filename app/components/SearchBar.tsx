"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(params.get("search") || "");

  function handleSearch(value: string) {
    setSearch(value);

    const query = new URLSearchParams(params.toString());

    if (value) {
      query.set("search", value);
    } else {
      query.delete("search");
    }

    query.set("page", "1");

    router.push(`/dashboard?${query.toString()}`);
  }

  return (
    <input
      value={search}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search users..."
      className="px-4 py-2 border rounded-xl w-72"
    />
  );
}