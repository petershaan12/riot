import { useRouter } from "next/navigation";
import { User, Settings } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Image from "next/image";
import { searchAll } from "@/app/actions/settings";
import debounce from "lodash.debounce";

const SearchRiotCommand = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ users: any[]; events: any[] }>({
    users: [],
    events: [],
  });

  // Debounced function to handle search queries
  const fetchResults = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery) {
        try {
          const searchResults = await searchAll(searchQuery);
          setResults(searchResults);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setResults({ users: [], events: [] });
        }
      } else {
        setResults({ users: [], events: [] });
      }
    }, 300), // Adjust debounce delay as needed
    []
  );

  useEffect(() => {
    fetchResults(query);
  }, [query, fetchResults]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1a1c1d]/70 backdrop-blur-md z-[100]">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative md:w-[500px] bg-black text-white rounded-lg shadow-lg">
        <Command className="rounded-lg bg-black shadow-md p-4">
          <input
            placeholder="Search event or user..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 bg-transparent text-white rounded-md focus:border-none focus:outline-none"
          />
          <CommandList className="mt-2">
            {results.users.length === 0 && results.events.length === 0 ? (
              <CommandEmpty className="text-gray-400">
                No results found.
              </CommandEmpty>
            ) : (
              <>
                {results.users.length > 0 && (
                  <CommandGroup heading="Profiles">
                    {results.users.map((user) => (
                      <CommandItem
                        key={user.id}
                        onSelect={() =>
                          handleNavigate(`/profile/${user.username}`)
                        }
                        className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer"
                      >
                        <Image
                          src={user.image || "/default-avatar.png"}
                          width={40}
                          height={40}
                          alt="Profile Image"
                          className="mr-3 rounded-full"
                        />
                        <span>{user.username}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                {results.events.length > 0 && (
                  <CommandGroup heading="Events">
                    {results.events.map((event) => (
                      <CommandItem
                        key={event.id}
                        onSelect={() => handleNavigate(`/event/${event.slug}`)}
                        className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer"
                      >
                        <Image
                          src={event.image || "/default-event.png"}
                          width={40}
                          height={40}
                          alt="Event Image"
                          className="mr-3 rounded-md"
                        />
                        <span>{event.title}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
            <CommandSeparator />
            <CommandGroup heading="Suggestions">
              <CommandItem
                onSelect={() => handleNavigate("/events")}
                className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer"
              >
                <Image
                  src="/assets/icons/file.svg"
                  width={15}
                  height={15}
                  alt="Search Events"
                  className="mr-2"
                />
                <span>Search Events</span>
              </CommandItem>
              <CommandItem
                onSelect={() => handleNavigate("/rank")}
                className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer"
              >
                <Image
                  src="/assets/icons/diagram.svg"
                  width={15}
                  height={15}
                  alt="Rank"
                  className="mr-2"
                />
                <span>Rank</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem
                onSelect={() => handleNavigate("/profile")}
                className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer"
              >
                <User className="mr-2 h-5 w-5" />
                <span>Profile</span>
              </CommandItem>
              <CommandItem
                onSelect={() => handleNavigate("/profile/ubahProfile")}
                className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer"
              >
                <Settings className="mr-2 h-5 w-5" />
                <span>Settings Profile</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
};

export default SearchRiotCommand;
