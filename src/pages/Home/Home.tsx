import { useGetUsersQuery } from "../../services/api";

export default function Home() {
  const { data, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Failed to fetch users</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
