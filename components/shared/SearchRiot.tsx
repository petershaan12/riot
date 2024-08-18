"use client";

import React, { useState } from "react";
import { SearchIcon } from "lucide-react";
import SearchRiotCommand from "./SearchRiotCommand";

const SearchRiot = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div>
      <SearchIcon
        className="w-4 opacity-50  cursor-pointer"
        strokeWidth={3}
        onClick={toggleSearch}
      />
      {isSearchOpen && <SearchRiotCommand onClose={toggleSearch} />}
    </div>
  );
};

export default SearchRiot;
