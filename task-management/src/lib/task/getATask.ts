export default async function getATask({ id }: { id: string }) {
    const res = await fetch(`https://task-management-server-alpha-two.vercel.app/task/${id}`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }