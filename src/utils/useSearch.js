// useSearch.js
import { useState, useEffect } from "react";
import { mockData } from "../data/mockData";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState([
    { name: "all", status: true },
    {
      name: "files",
      status: true,
      icon: "https://img.icons8.com/fluency-systems-filled/48/attach.png",
    },
    {
      name: "people",
      status: true,
      icon: "https://img.icons8.com/pastel-glyph/64/person-male--v2.png",
    },
    {
      name: "chats",
      status: false,
      icon: "https://img.icons8.com/fluency-systems-regular/48/speech-bubble--v2.png",
    },
    {
      name: "lists",
      status: false,
      icon: "https://img.icons8.com/ios-filled/50/menu--v2.png",
    },
  ]);
  const [currentFilter, setCurrentFilter] = useState(filters[0]);
  const [copiedId, setCopiedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  // Handle search with loading simulation
  useEffect(() => {
    // Return empty array when query is empty
    if (!query.trim()) {
      setFilteredResults([]);
      setIsLoading(false);
      return;
    }

    // Set loading state
    setIsLoading(true);

    // Simulate API call with delay
    const timer = setTimeout(() => {
      const results = mockData.filter((item) => {
        const matchesQuery = item.name
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesQuery;
      });

      setFilteredResults(results);
      setIsLoading(false);
    }, 1000); // 1 second delay to simulate API call

    // Cleanup function to clear timeout if component unmounts or query changes
    return () => clearTimeout(timer);
  }, [query]);

  const handleCopyLink = (id, copied) => {
    const item = mockData.find((i) => i.id === id);
    if (item?.url || item?.avatar) {
      navigator.clipboard.writeText(item.url || item?.avatar);
      setCopiedId(id);
      copied();
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const toggleFilter = (type) => {
    setFilters((prev) => {
      const updated = prev.map((item) =>
        item.name === type ? { ...item, status: !item.status } : item
      );

      // if currentFilter was just deactivated
      const currentStillActive = updated.find(
        (f) => f.name === currentFilter.name && f.status
      );

      if (!currentStillActive) {
        // fallback to last active filter (or "all" if none)
        const lastActive = [...updated].reverse().find((f) => f.status);
        setCurrentFilter(lastActive || updated[0]);
      }

      return updated;
    });
  };

  const handleClear = () => {
    setQuery("");
  };

  const handleCurrentfilter = (item) => {
    setCurrentFilter(item);
  };

  return {
    query,
    setQuery,
    filters,
    toggleFilter,
    filteredResults,
    handleCopyLink,
    copiedId,
    handleClear,
    isLoading,
    handleCurrentfilter,
    currentFilter,
  };
};

export default useSearch;
