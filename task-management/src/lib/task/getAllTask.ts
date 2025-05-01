export default async function getAllTask({ email }: { email: string }) {
  const res = await fetch(`http://localhost:5000/tasks/${email}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}