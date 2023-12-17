import axios from "axios";
import { FC, useEffect, useState } from "react"


const Dashboard = () => {
    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        fetchCSVData();
    }, []);

    const fetchCSVData = () => {
        const csvUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

        axios.get(csvUrl)
            .then((response) => {
                const parsedCsvData = parseCSV(response.data);
                setCsvData(parsedCsvData);
                console.log(parsedCsvData);
            })
            .catch((error) => {
                console.error('Error fetching CSV data:', error);
            });
    }

    function parseCSV(csvText) {
        const rows = csvText.split(/\r?\n/);
        const headers = rows[0].split('\t');
        const data = [];

        for (let i = 1; i < rows.length; i++) {
            const rowData = rows[i].split('\t');
            console.log(rowData)
            const rowObject = {};

            headers.forEach((header, index) => {
                const key = header.trim();
                console.log(key)
                if (key === 'date' || key === 'ageGroup' || key === 'gender') {
                    rowObject[key] = rowData[index];
                } else {
                    rowObject[key] = parseFloat(rowData[index]);
                }
            });

            data.push(rowObject);
        }

        return data;
    }

    return (
        <>
            <div>
                <h1 className="text-4xl text-center p-4">Dashboard</h1>
            </div>
        </>
    )
}

export default Dashboard;