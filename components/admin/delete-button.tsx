"use client";

import { deleteUserAdmin } from "@/app/actions/admin";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DeleteButton = ({ userId }: any) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      await deleteUserAdmin(userId); // Panggil server action untuk menghapus user
      router.refresh(); // Refresh halaman setelah penghapusan
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-red-400 hover:text-red-600">Delete</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-500">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
