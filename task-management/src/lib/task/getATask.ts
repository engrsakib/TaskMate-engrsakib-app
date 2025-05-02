export default async function getATask({ id }: { id: string }) {
    const res = await fetch(`http://localhost:5000/task/${id}`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }