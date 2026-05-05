export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  age: number;
  gender: string;
  phone: string;
  university: string;
  company?: { name?: string; title?: string };
  address?: { address?: string; city?: string };
};

type UsersResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

export async function getUsers(
  page: number = 1,
  search: string = ""
): Promise<UsersResponse> {
  const limit = 6;
  const skip = (page - 1) * limit;

  const url = search
    ? `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`
    : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users. Please try again.");
  }

  return response.json();
}

export async function getUserById(id: string): Promise<User> {
  const response = await fetch(
    `https://dummyjson.com/users/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user details. Please try again.");
  }

  return response.json();
}