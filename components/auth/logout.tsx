"use client";

import { logout } from "@/app/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await logout();
      toast.success("Logout Success", {
        id: toastId,
      });
      router.refresh();
    } catch (error: any) {
      toast.error("Logout Gagal", {
        id: toastId,
      });
    }
  };
  return (
    <>
      <div onClick={handleLogout} className="hover:cursor-pointer flex">
        <LogOut className="w-4 mr-2" />
        <p>Logout</p>
      </div>
    </>
  );
};

export default Logout;
