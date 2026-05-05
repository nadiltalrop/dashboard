"use client";

import { useEffect, useState } from "react";

type SearchBarProps = {
  value: string;
  onDebouncedChange: (value: string) => void;
};

export default function SearchBar({ value, onDebouncedChange }: SearchBarProps) {
  const [search, setSearch] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onDebouncedChange(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search, onDebouncedChange]);

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search users..."
      className="px-4 py-2 border rounded-xl w-72"
    />
  );
}