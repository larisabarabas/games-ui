import React from "react";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

const SearchBar = ({
  value,
  placeholder,
  onInputChange,
}: {
  value: string;
  placeholder: string;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <form className="w-full">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          className="w-full appearance-none bg-background pl-8 shadow-none"
          value={value}
          onChange={onInputChange}
        />
      </div>
    </form>
  );
};

export default SearchBar;
