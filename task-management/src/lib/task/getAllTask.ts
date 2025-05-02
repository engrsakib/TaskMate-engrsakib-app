export default async function getAllTask({ email }: { email: string }) {
  const res = await fetch(`https://task-management-server-alpha-two.vercel.app/tasks/${email}`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}