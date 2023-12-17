import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    fetchCSVData();
  }, []);

  const fetchCSVData = () => {
    const csvUrl = import.meta.env.VITE_GOOGLE_SHEET_URL; // Replace with your Google Sheets CSV file URL

    axios.get(csvUrl)    // Use Axios to fetch the CSV data
        .then((response) => {
            const parsedCsvData = parseCSV(response.data);        // Parse the CSV data into an array of objects
            setCsvData(parsedCsvData);        // Set the fetched data in the component's state
            console.log(parsedCsvData);        // Now you can work with 'csvData' in your component's state.
        })
        .catch((error) => {
            console.error('Error fetching CSV data:', error);
        });
}


  function parseCSV(csvText) {
    const rows = csvText.split(/\r?\n/);
    const head = rows[0].split("\t"); // Assuming the first row contains headers
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
  }

  return (
    <>
      <div>
        <h1 className="text-4xl text-center p-4">Dashboard</h1>
      </div>
    </>
  );
};

export default Dashboard;
