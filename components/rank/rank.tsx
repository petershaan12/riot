"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useState } from "react";

type User = {
  id: string;
  image: string | null;
  name: string | null;
  username: string | null;
  points: number;
};

type RankComponent = {
  users: User[];
};

const Rank = ({ users }: RankComponent) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const allUsersDisplayed = visibleCount >= users.length;

  const getOpacity = (index: number) => {
    if (allUsersDisplayed) return "opacity-100";
    if (index < visibleCount - 2) return "opacity-100";
    if (index === visibleCount - 2) return "opacity-50 ";
    if (index === visibleCount - 1) return "opacity-20 ";
    return "opacity-100"; // Default to 100 if more than 5 items are visible
  };

  return (
    <>
      <ul className="space-y-2 mb-12">
        {users.slice(0, visibleCount).map((user, index) => (
          <li
            key={user.id}
            className={`flex items-center justify-between p-3 ${getOpacity(
              index
            )}`}
          >
            <div className="flex items-center gap-3 md:w-[500px]">
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback>
                  <p className="font-bold uppercase">
                    {user?.name?.substring(0, 2)}
                  </p>
                </AvatarFallback>
              </Avatar>
              <span className="md:text-lg font-semibold">
                {index + 1}.
                <Link
                  href={`/${user.username}`}
                  className="hover:underline hover:text-primary px-2"
                >
                  {user.username}
                </Link>
              </span>
            </div>
            <span className="md:text-lg text-sm flex justify-end">
              <span className="opacity-50">Total Score:</span>{" "}
              <span className="font-bold ml-2">{user.points}</span>
            </span>
          </li>
        ))}
      </ul>

      {visibleCount < users.length && (
        <div className="flex justify-center mt-5 mb-24">
          <button
            onClick={handleShowMore}
            className="bg-white/20 rounded-full text-white py-2 px-4 text-sm"
          >
            Show More...
          </button>
        </div>
      )}
    </>
  );
};

export default Rank;
