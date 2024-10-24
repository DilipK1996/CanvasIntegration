import axios from "axios";
import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearchComplete }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    // Validation check
    if (query.trim().length === 0) {
      setError("Please enter something!");
      return; // Prevent the API call if the input is empty
    }

    const API_KEY = "46677376-bcb288f05635bdb082e19d962";
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}`; // Ensure query is encoded

    try {
      const response = await axios.get(url);

      // Handle empty results
      if (response.data.hits.length === 0) {
        setError("No images found. Try another search term.");
      } else {
        setError(""); // Clear error if the search is successful
        onSearchComplete(response.data.hits);
      }
    } catch (error) {
      console.error("Error fetching images", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim().length > 0) {
      setError(""); // Clear error when valid input is entered
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for images..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default SearchBar;
