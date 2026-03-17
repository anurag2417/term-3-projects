import { useState, useMemo } from "react";
import useDonors from "./hooks/useDonors";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import DonorList from "./components/DonorList";
import Spinner from "./components/Spinner";
import "./App.css";

const App = () => {
  const { donors, loading, error } = useDonors();

  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All");
  const [citySearch, setCitySearch] = useState("");
  const [sortByAvailability, setSortByAvailability] = useState(false);
  const [requestStatuses, setRequestStatuses] = useState([]);

  const handleRequest = (donorId) => {
    setRequestStatuses((prev) =>
      prev.includes(donorId) ? prev : [...prev, donorId]
    );
  };

  const filteredDonors = useMemo(() => {
    let result = [...donors];

    if (selectedBloodGroup !== "All") {
      result = result.filter((d) => d.bloodGroup === selectedBloodGroup);
    }

    if (citySearch.trim()) {
      result = result.filter((d) =>
        d.city.toLowerCase().includes(citySearch.toLowerCase())
      );
    }

    if (sortByAvailability) {
      result.sort((a, b) => b.available - a.available);
    }

    return result;
  }, [donors, selectedBloodGroup, citySearch, sortByAvailability]);

  const totalAvailable = donors.filter((d) => d.available).length;

  return (
    <div className="app">
      <Header totalAvailable={totalAvailable} />
      <main className="main-content">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="error-message">⚠️ {error}</div>
        ) : (
          <>
            <FilterBar
              selectedBloodGroup={selectedBloodGroup}
              onBloodGroupChange={setSelectedBloodGroup}
              citySearch={citySearch}
              onCitySearchChange={setCitySearch}
              sortByAvailability={sortByAvailability}
              onSortChange={setSortByAvailability}
              totalFiltered={filteredDonors.length}
            />
            <DonorList
              donors={filteredDonors}
              requestStatuses={requestStatuses}
              onRequest={handleRequest}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;