"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function DetailsPageMenu({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://task-management-server-alpha-two.vercel.app/delete/task/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res.ok) {
          await Swal.fire("Deleted!", "Task deleted successfully.", "success");
          router.push("/dashboard");
        } else {
          const data = await res.json();
          throw new Error(data.message || "Delete failed");
        }
      } catch (err) {
        console.error("Error deleting task", err);
        Swal.fire("Error", "Could not delete task. Please try again.", "error");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Deletion cancelled.", "info");
    }
  };

  const handleEdit = async () => {
    const result = await Swal.fire({
      title: "Edit this task?",
      text: "You'll be taken to the edit form.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, edit it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      router.push(`/dashboard/task/edit-task/edit/${id}`);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Edit cancelled.", "info");
    }
  };

  return (
    <div>
      <div className="border-b border-gray-600 h-[100px] p-4 flex justify-between items-center">
        <h1 className="text-2xl text-black">Task Details</h1>
        <div className="flex items-center gap-x-2">
          <button onClick={handleEdit} className="btn btn-primary">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-secondary">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
