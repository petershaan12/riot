"use client";

import { logout } from "@/app/actions/auth";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
      <div onClick={handleLogout} className="hover:cursor-pointer">
        <p>Logout</p>
      </div>
    </>
  );
};

export default Logout;
