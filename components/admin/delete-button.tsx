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
import { toast } from "sonner";

const DeleteButton = ({ userId }: any) => {
  const router = useRouter();

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting...");
    try {
      await deleteUserAdmin(userId); // Panggil server action untuk menghapus user
      toast.success("User deleted", { id: toastId });
      router.refresh(); // Refresh halaman setelah penghapusan
    } catch (error) {
      toast.error("Failed to delete user", { id: toastId });
      console.error(error);
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
