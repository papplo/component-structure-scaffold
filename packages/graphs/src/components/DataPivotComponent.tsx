// src/components/DataPivotComponent.tsx

import React, { useState, useEffect } from 'react';

// Define the data models
type Series = {
  mtu: number; // 1..24
  edate: number; // e.g., 241121
  prop1: number;
  prop2: number;
  prop3: number;
};

type DataResponse = {
  data: Record<string, Series[]>;
};

type RequestBody = {
  query: string[];
};

// Define the pivoted data structure
type PivotedData = {
  prop: string;
  [key: string]: number[] | string;
};

// Component Props
interface DataPivotComponentProps {
  endpoint: string; // The API endpoint to fetch data from
}

// The DataPivotComponent
const DataPivotComponent: React.FC<DataPivotComponentProps> = ({ endpoint }) => {
  const [queries, setQueries] = useState<string[]>(['a', 'b']); // Initial queries
  const [pivotedData, setPivotedData] = useState<PivotedData[]>([]);
  const [rawData, setRawData] = useState<DataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPivoted, setIsPivoted] = useState<boolean>(true); // Toggle state

  // Function to fetch data from the API
  const fetchData = async (requestBody: RequestBody): Promise<DataResponse> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate mock data based on queries
    const mockData: Record<string, Series[]> = {};

    requestBody.query.forEach((query, index) => {
      mockData[query] = Array.from({ length: 24 }, (_, i) => ({
        mtu: i + 1,
        edate: 241121,
        prop1: Math.floor(Math.random() * 100),
        prop2: Math.floor(Math.random() * 100),
        prop3: Math.floor(Math.random() * 100),
      }));
    });

    return { data: mockData };
  };

  // Function to pivot the data
  const pivotData = (data: DataResponse, queries: string[]): PivotedData[] => {
    const pivoted: PivotedData[] = [];

    // Define the properties to pivot
    const props = ['prop1', 'prop2', 'prop3'];

    props.forEach((prop) => {
      const row: PivotedData = { prop };

      queries.forEach((query) => {
        const seriesArray = data.data[query] || [];
        const propValues = seriesArray.map((series) => series[prop]);

        row[query] = propValues;
      });

      pivoted.push(row);
    });

    return pivoted;
  };

  // Function to handle data fetching and pivoting
  const handleFetchAndPivot = async () => {
    setLoading(true);
    setError(null);

    try {
      const requestBody: RequestBody = { query: queries };
      const data = await fetchData(requestBody);
      setRawData(data);
      const pivoted = pivotData(data, queries);
      setPivotedData(pivoted);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch and pivot data on component mount or when queries change
  useEffect(() => {
    handleFetchAndPivot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  // Handler to update queries (for demonstration purposes)
  const handleAddQuery = () => {
    const newQuery = prompt('Enter new query string:');
    if (newQuery && !queries.includes(newQuery)) {
      setQueries([...queries, newQuery]);
    }
  };

  // Handler to toggle table view
  const handleToggleView = () => {
    setIsPivoted((prev) => !prev);
  };

  return (
    <div>
      <h2>Data Pivot Component</h2>

      {/* Query Management */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Queries:</h3>
        <ul>
          {queries.map((query, index) => (
            <li key={index}>{query}</li>
          ))}
        </ul>
        <button onClick={handleAddQuery}>Add Query</button>
      </div>

      {/* Toggle Button */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleToggleView}>
          {isPivoted ? 'Show Normal Table' : 'Show Pivoted Table'}
        </button>
      </div>

      {/* Loading and Error States */}
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Pivoted Data Table */}
      {!loading && !error && isPivoted && pivotedData.length > 0 && (
        <div>
          <h3>Pivoted Data</h3>
          <table border={1} cellPadding={5} cellSpacing={0}>
            <thead>
              <tr>
                <th>Property</th>
                {queries.map((query, index) => (
                  <th key={index}>{query}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pivotedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{row.prop}</td>
                  {queries.map((query, colIndex) => (
                    <td key={colIndex}>
                      {Array.isArray(row[query])
                        ? row[query].join(', ')
                        : String(row[query])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Normal Data Table */}
      {!loading && !error && !isPivoted && rawData && (
        <div>
          <h3>Normal Data</h3>
          {queries.map((query, queryIndex) => (
            <div key={queryIndex} style={{ marginBottom: '20px' }}>
              <h4>Query: {query}</h4>
              <table border={1} cellPadding={5} cellSpacing={0}>
                <thead>
                  <tr>
                    <th>MTU</th>
                    <th>EDate</th>
                    <th>Prop1</th>
                    <th>Prop2</th>
                    <th>Prop3</th>
                  </tr>
                </thead>
                <tbody>
                  {(rawData.data[query] || []).map((entry, entryIndex) => (
                    <tr key={entryIndex}>
                      <td>{entry.mtu}</td>
                      <td>{entry.edate}</td>
                      <td>{entry.prop1}</td>
                      <td>{entry.prop2}</td>
                      <td>{entry.prop3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          {queries.length === 0 && <p>No queries to display.</p>}
        </div>
      )}

      {/* Handle No Data Case */}
      {!loading && !error && isPivoted && pivotedData.length === 0 && <p>No data available.</p>}
    </div>
  );
};

export default DataPivotComponent;