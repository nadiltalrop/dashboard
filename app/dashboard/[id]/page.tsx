import Link from "next/link";
import { getUserById } from "../../lib/api/users";


export default async function UserDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await getUserById(id);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center px-4 py-2 border rounded-xl hover:bg-gray-100"
      >
        ← Back to Dashboard
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 rounded-full bg-white text-black flex items-center justify-center text-3xl font-bold">
              {user.firstName.charAt(0)}
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                {user.firstName} {user.lastName}
              </h1>

              <p className="text-gray-200 mt-1">
                @{user.username}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500 mb-1">Phone</p>
            <p className="font-medium">{user.phone}</p>
          </div>

          <div>
            <p className="text-gray-500 mb-1">Age</p>
            <p className="font-medium">{user.age}</p>
          </div>

          <div>
            <p className="text-gray-500 mb-1">Gender</p>
            <p className="font-medium capitalize">
              {user.gender}
            </p>
          </div>

          <div>
            <p className="text-gray-500 mb-1">University</p>
            <p className="font-medium">{user.university}</p>
          </div>

          <div>
            <p className="text-gray-500 mb-1">Company</p>
            <p className="font-medium">
              {user.company?.name}
            </p>
          </div>

          <div>
            <p className="text-gray-500 mb-1">Address</p>
            <p className="font-medium">
              {user.address?.address}, {user.address?.city}
            </p>
          </div>

          <div>
            <p className="text-gray-500 mb-1">Role</p>
            <p className="font-medium">
              {user.company?.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}