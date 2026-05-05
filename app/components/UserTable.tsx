import Link from "next/link";
import SearchBar from "./SearchBar";
import { User } from "../lib/api/users";

type UserTableProps = {
  users: User[];
  search: string;
  onSearchChange: (value: string) => void;
};

export default function UserTable({
  users,
  search,
  onSearchChange,
}: UserTableProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-gray-50 to-white">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Users</h2>
          <p className="text-sm text-gray-500">
            Manage and view all registered users
          </p>
        </div>
        <div>
          <SearchBar
            key={search}
            value={search}
            onDebouncedChange={onSearchChange}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Username</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 font-medium text-gray-700">
                    <Link
                        href={`/dashboard/${user.id}`}
                        className="text-blue-600 hover:underline"
                    >
                        {user.id}
                    </Link>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
                      {user.firstName.charAt(0)}
                    </div>

                    <div>
                        <Link
                            href={`/dashboard/${user.id}`}
                            className="text-blue-600 hover:underline"
                        >
                            <p className="font-medium text-gray-800">
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-gray-500">
                                User Profile
                            </p>  
                        </Link>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  @{user.username}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="px-6 py-8 text-center text-gray-500">
            No users found for this search.
          </p>
        )}
      </div>
    </div>
  );
}