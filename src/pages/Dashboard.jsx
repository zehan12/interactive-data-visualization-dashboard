import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import DateRangeSelector from "../components/DateRangeSelector";
import Filter from "../components/Filter";
import BarGraph from "../components/BarGraph";
import LineChart from "../components/LineChart";

const Dashboard = () => {
  const location = useLocation();
  const [searchParam, setSearchParam] = useSearchParams();
  const [data, setData] = useState([]);
  const [filterData, setFilteredData] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const saveUserPreferences = (key, value) => {
    Cookies.set(key, value, { expires: 365 });
  };

  const getUserPreferences = (key) => {
    return Cookies.get(key);
  };

  useEffect(() => {
    setSearchParam({});
    fetchCSVData();
    const savedDateRange = getUserPreferences("dateRange");
    const savedAgeFilter = getUserPreferences("ageFilter");
    const savedGenderFilter = getUserPreferences("genderFilter");

    if (savedDateRange) {
      setSelectedDateRange(JSON.parse(savedDateRange));
    }
    if (savedAgeFilter) {
      setSelectedAge(savedAgeFilter);
    }
    if (savedGenderFilter) {
      setSelectedGender(savedGenderFilter);
    }
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const fetchCSVData = () => {
    const csvUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

    axios
      .get(csvUrl)
      .then((response) => {
        const parsedCsvData = parseCSV(response.data);
        setData(parsedCsvData);
      })
      .catch((error) => {
        console.error("Error fetching CSV data:", error);
      });
  };

  const parseCSV = (csvText) => {
    const rows = csvText.split(/\r?\n/);
    const head = rows[0].split("\t");
    const data = [];
    const title = head[0].split(",");
    let col = [];
    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split("\t");
      col = rowData[0].split(",");
      const newRow = {};
      for (let j = 0; j < title.length; j++) {
        newRow[title[j]] = col[j];
      }
      data.push(newRow);
    }
    return data;
  };

  const handleDateRangeChange = (startDate, endDate) => {
    if (startDate === undefined && endDate === undefined) {
      console.log("un selected");
      setSelectedDateRange(null);
      return;
    }
    setSelectedDateRange([startDate, endDate]);
    setSearchParam((params) => {
      params.set("startDate", startDate);
      params.set("endDate", endDate);
      return params;
    });
  };

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  const isDateInRange = (date, startDate, endDate) => {
    const currentDate = new Date(parseDate(date));
    const start = new Date(parseDate(startDate));
    const end = new Date(parseDate(endDate));
    return currentDate >= start && currentDate <= end;
  };

  const handleAgeFilterChange = (ageFilter) => {
    setSelectedAge(ageFilter);
    setSearchParam((params) => {
      params.set("age", ageFilter);
      return params;
    });
  };

  const handleGenderFilterChange = (genderFilter) => {
    setSelectedGender(genderFilter);
    setSearchParam((params) => {
      params.set("gender", genderFilter);
      return params;
    });
  };

  const handleCategoryChange = (feature) => {
    if (feature) {
      setSearchParam((params) => {
        params.set("feature", feature);
        return params;
      });
      setSelectedCategory(feature);
    }
  };

  useEffect(() => {
    if (selectedDateRange) {
      saveUserPreferences("dateRange", JSON.stringify(selectedDateRange));
    } else {
      Cookies.remove("dateRange");
    }
  }, [selectedDateRange]);

  useEffect(() => {
    if (selectedAge) {
      saveUserPreferences("ageFilter", selectedAge);
    } else {
      Cookies.remove("ageFilter");
    }
  }, [selectedAge]);

  useEffect(() => {
    if (selectedGender) {
      saveUserPreferences("genderFilter", selectedGender);
    } else {
      Cookies.remove("genderFilter");
    }
  }, [selectedGender]);

  useEffect(() => {
    if (location.search) {
      if (
        location.search.includes("age") ||
        location.search.includes("gender")
      ) {
        let dataArray =
          selectedDateRange !== null
            ? data.filter((entry) => {
                if (
                  isDateInRange(
                    entry.Day,
                    selectedDateRange[0],
                    selectedDateRange[1]
                  )
                ) {
                  return true;
                }
                return false;
              })
            : data;
        const filtered = dataArray.filter((entry) => {
          if (
            (!selectedAge || entry.Age === selectedAge) &&
            (!selectedGender || entry.Gender === selectedGender)
          ) {
            return true;
          }

          return false;
        });
        setFilteredData(filtered);
      }
    }
  }, [searchParam, selectedAge, selectedGender]);

  useEffect(() => {
    if (selectedDateRange === null) {
      setFilteredData(data);
    }
    if (
      location.search.includes("startDate") &&
      location.search.includes("endDate")
    ) {
      const filterData =
        selectedDateRange !== null &&
        data.filter((entry) => {
          if (
            isDateInRange(entry.Day, selectedDateRange[0], selectedDateRange[1])
          ) {
            return true;
          }
          return false;
        });
      setFilteredData(filterData);
    }
  }, [selectedDateRange]);

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedDateRange(null);
    setSelectedGender("");
    setSelectedAge("");
    Cookies.remove("dateRange");
    Cookies.remove("ageFilter");
    Cookies.remove("genderFilter");
  };
  
  return (
    <>
      <div className=" font-mono">
        <h1 className="text-4xl text-center p-4">Dashboard</h1>
        <div className="md:flex items-center gap-10">
          <DateRangeSelector onChange={handleDateRangeChange} />
          <Filter
            type="Age"
            options={["15-25", ">25"]}
            onChange={handleAgeFilterChange}
          />
          <Filter
            type="Gender"
            options={["Male", "Female"]}
            onChange={handleGenderFilterChange}
          />
          <div className="w-full md:block flex justify-center items-center">
            <button
              className="w-20 h-10 py-1 px-3 mt-6 m-2 bg-red-600 text-white"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
        {selectedCategory ? (
          <LineChart selectedOption={selectedCategory} data={filterData} />
        ) : (
          <BarGraph data={data} onChange={handleCategoryChange} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
