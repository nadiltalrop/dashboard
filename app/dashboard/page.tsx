import Link from "next/link";
import UserTable from "../components/UserTable";

async function fetchUsers(page: number = 1) {
  const limit = 6;
  const skip = (page - 1) * limit;

  const response = await fetch(
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
    { cache: "no-store" }
  );

  return response.json();
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;

  const currentPage = Number(params.page || "1");
  const limit = 6;

  const data = await fetchUsers(currentPage);

  const users = data.users;
  const totalPages = Math.ceil(data.total / limit);

  const pages = [
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ].filter((p) => p >= 1 && p <= totalPages);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Users Table</h1>

      <UserTable users={users} />

      <div className="flex justify-center gap-2">
        {currentPage > 1 && (
          <Link
            href={`/dashboard?page=${currentPage - 1}`}
            className="px-4 py-2 border rounded-lg"
          >
            Prev
          </Link>
        )}

        {pages.map((page) => (
          <Link
            key={page}
            href={`/dashboard?page=${page}`}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === page ? "bg-black text-white" : ""
            }`}
          >
            {page}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link
            href={`/dashboard?page=${currentPage + 1}`}
            className="px-4 py-2 border rounded-lg"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}