import TidakDitemukan from "@/components/shared/TidakDitemukan";
import { currentUser } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAllUser } from "@/app/actions/user";
import DeleteButton from "@/components/admin/delete-button";

const Page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const allUser = await getAllUser();

  if (!user.role.includes("ADMIN")) {
    return "You are not authorized to access this page";
  }

  return (
    <>
      <section className="bg-contain p-5 md:pt-10">
        <div className="flex flex-col items-center justify-center text-center gap-5">
          <div>
            <h1 className="text-2xl md:text-5xl uppercase font-bold">User</h1>
            <p className="opacity-50">A list of User </p>
          </div>
        </div>
      </section>

      <section id="participant-table" className="md:w-[1200px] w-screen px-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>points</TableHead>
              <TableHead>role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUser?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="hover:text-primary hover:underline">
                  <Link href={`/profile/${user.username}`} target="_blank">
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell className="hover:text-primary hover:underline">
                  <Link href={`mailto:${user.email}`} target="_blank">
                    {user.email}
                  </Link>
                </TableCell>
                <TableCell>{user.points}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right flex justify-end space-x-5">
                  <Link href={`/profile/${user.username}`}>
                    <button className="opacity-50 hover:text-primary hover:opacity-100">
                      View
                    </button>
                  </Link>
                  <Link href={`/user/${user.username}/edit`}>
                    <button className="text-primary hover:text-white">
                      Edit
                    </button>
                  </Link>
                  <DeleteButton
                    userId={user.id} // Kirimkan ID user ke DeleteButton
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default Page;
