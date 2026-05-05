import Link from "next/link";
import UserTable from "../components/UserTable";
import { getUsers } from "../lib/api/users";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;

  const currentPage = Number(params.page || "1");
  const search = params.search || "";
  const limit = 6;

  const data = await getUsers(currentPage, search);

  const users = data.users;
  const totalPages = Math.ceil(data.total / limit);

  const pages = [
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ].filter((p) => p >= 1 && p <= totalPages);

  const buildUrl = (page: number) =>
    `/dashboard?page=${page}${
      search ? `&search=${encodeURIComponent(search)}` : ""
    }`;

  return (
    <div className="p-8 space-y-6">
      <UserTable users={users} />

      <div className="flex justify-center gap-2">
        {currentPage > 1 && (
          <Link
            href={buildUrl(currentPage - 1)}
            className="px-4 py-2 border rounded-lg"
          >
            Prev
          </Link>
        )}

        {pages.map((page) => (
          <Link
            key={page}
            href={buildUrl(page)}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === page
                ? "bg-black text-white"
                : ""
            }`}
          >
            {page}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link
            href={buildUrl(currentPage + 1)}
            className="px-4 py-2 border rounded-lg"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}