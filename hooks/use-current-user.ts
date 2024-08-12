import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export const useCurrentUser = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      // Session is being loaded
      setIsLoading(true);
    } else if (status === "authenticated") {
      // Session is authenticated
      setUser(session.user);
      setIsLoading(false);
    } else {
      // Session is not authenticated
      setUser(null);
      setIsLoading(false);
    }
  }, [status, session]);

  return { user, isLoading };
};
