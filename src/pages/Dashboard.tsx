import axios from "axios";
import { FC, useEffect, useState } from "react"

interface CsvDataRow {
    date: string;
    ageGroup: string;
    gender: string;
    value1: number;
    value2: number;
    value3: number;
    value4: number;
    value5: number;
    value6: number;
}


const Dashboard: FC = () => {
    const [csvData, setCsvData] = useState<unknown[]>([]);

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

    function parseCSV(csvText: string): CsvDataRow[] {
        const rows = csvText.split(/\r?\n/);
        const headers = rows[0].split('\t'); // Assuming the first row contains headers
        const data: CsvDataRow[] = [];

        for (let i = 1; i < rows.length; i++) {
            const rowData = rows[i].split('\t');
            console.log(rowData)
            const rowObject: Partial<CsvDataRow> = {};

            headers.forEach((header, index) => {
                const key = header.trim() as keyof CsvDataRow;
                console.log(key)
                if (key === 'date' || key === 'ageGroup' || key === 'gender') {
                    rowObject[key] = rowData[index];
                } else {
                    rowObject[key] = parseFloat(rowData[index]);
                }
            });

            data.push(rowObject as CsvDataRow);
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