"use client";
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ResponsiveBar } from '@nivo/bar';

const ChartComponent = () => {
  const [gasData, setGasData] = useState<number | null>(null); // Set initial state to null
  const [electricityData, setElectricityData] = useState<number | null>(null); // Set initial state to null
  const [liquidData, setLiquidData] = useState<number | null>(null); // Set initial state to null
  const [year, setYear] = useState<number>(2019);

  useEffect(() => {
    fetch(`http://localhost:8000/consumption/Industrie_GAZEUX.csv/${year}`)
      .then(response => response.json())
      .then(data => {
        setGasData(data.consomation);
        console.log("Gas data: ", data.consomation);
      })
      .catch(error => console.error('Error fetching gas data:', error));
  }, [year]);

  useEffect(() => {
    fetch(`http://localhost:8000/consumption/Industrie_ELECTRICITE.csv/${year}`)
      .then(response => response.json())
      .then(data => {
        setElectricityData(data.consomation); // Ensure correct data field
        console.log("Electricity data: ", data.consomation);
      })
      .catch(error => console.error('Error fetching electricity data:', error));
  }, [year]);

  useEffect(() => {
    fetch(`http://localhost:8000/consumption/Industrie_Liquides.csv/${year}`)
      .then(response => response.json())
      .then(data => {
        setLiquidData(data.consomation); // Ensure correct data field
        console.log("Liquid data: ", data.consomation);
      })
      .catch(error => console.error('Error fetching liquid data:', error));
  }, [year]);

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(event.target.value);
    setYear(newYear);
  };

  return (
    <div>
      
      <div className='bg-gray-200' >
        <br />
        <Input 
          className="w-32 pd-2 m-8" 
          placeholder="Enter year" 
          type="number" 
          value={year} 
          max={2020} 
          onChange={handleYearChange} 
        />        
        
  {/*      
        <h1>Gas</h1>
        <p>Data: {JSON.stringify(gasData ?? "empty")}</p>
      
*/}

      <BarChart 
        gasData={gasData ?? 0} 
        electricityData={electricityData ?? 0} 
        liquidData={liquidData ?? 0} 
      /></div>
    </div>
  );
};

function BarChart({ gasData, electricityData, liquidData }: { gasData: number, electricityData: number, liquidData: number }) {
  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        data={[
          { name: "Gas", count: gasData },
          { name: "Electricity", count: electricityData },
          { name: "Liquid", count: liquidData },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 50, right: 150, bottom: 100, left: 100 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#000",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

export default ChartComponent;
