export async function getUsers(
  page: number = 1,
  search: string = ""
) {
  const limit = 6;
  const skip = (page - 1) * limit;

  const url = search
    ? `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`
    : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function getUserById(id: string) {
  const response = await fetch(
    `https://dummyjson.com/users/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}