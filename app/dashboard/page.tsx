import UserTable from '../components/UserTable';

async function fetchUsers() {
  const response = await fetch('https://dummyjson.com/users');
    const users = await response.json();
    console.log(users);
    return users;
}


async function Dashboard() {
  const data = await fetchUsers();
  const users = data.users;
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Users Table</h1>

      <UserTable users={users} />
    </div>
  );
}

export default Dashboard
