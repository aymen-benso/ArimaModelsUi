import { useState, useEffect } from "react";

import axios from "axios";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { ResponsiveLine } from "@nivo/line";

import { Login } from "@/components/login";

import useLoginStore from "@/State";

import { parseISO } from 'date-fns';




// Define a type for the props
interface DashboardProps {
  csvFilePath: string;
  csvModelPath: string;
  coef : number;
}


export function Dashboard({ csvFilePath, csvModelPath, coef }: DashboardProps) {
  const [years, setYears] = useState(10);
  const [forecast, setForecast] = useState<number[]>([]);
  const { username, isLoggedIn, login, logout } = useLoginStore();
  const [activeMainMenu, setActiveMainMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);
  
  
  const num = coef;
  console.log("num: ", num);
  console.log("csvFilePath: ", csvFilePath);
  console.log("csvModelPath: ", csvModelPath);
  
/*  const csvFilePath = "Industrie_Liquides.csv";
  const csvModelPath = "residentiel_liquide_model.pkl"; */

  useEffect(() => {
    axios.get(`http://localhost:8001/${csvFilePath}`)
      .then(response => {
        const data = response.data;
        console.log(data);
        const chartData = data.map((item: any) => ({ x: item["year"], y: parseFloat(item["consomation"]) }));
        
        setChartData(chartData);
        console.log("Data: ", chartData);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);
  

  useEffect(() => {
    async function fetchPrediction() {
      const data = {
        model_name: csvModelPath,
        data: 
        
        Array.from({ length: years }, (_, i) => ({
          year: 2024 + i,
          feature_1: 10000 + i * 1000,
          feature_2: 10000 + i * 1000,
          feature_3: 10000 + i * 1000,
          feature_4: 10000 + i * 1000,
          feature_5: 10000 + i * 1000,
          feature_6: 10000 + i * 1000,
          feature_7: 10000 + i * 1000,
        } )),
      };

      try {
        const response = await axios.post(`http://localhost:8001/predict/`, data);
        console.log(response.data);
        const newForecast = response.data.predictions;
        console.log("newForecast: ", newForecast);
        setForecast(newForecast);
        console.log("Forecast: ", newForecast);
      } catch (error) {
        console.error('There was an error!', error);
      }
    }
    fetchPrediction();
  }, [years]);
  

  if (!isLoggedIn) {
    return (
      <Login />
    )
  }



  return (

      <div className="flex-1 bg-gray-100 dark:bg-gray-100 p-6">
        <header className="bg-gray-600 shadow-sm flex items-center justify-between px-6 py-4 mb-6 border-radius-5xl opacity-90">
          <h1 className="text-xl text-white font-bold">Forecasting Model</h1>
          <div className="flex items-center space-x-4">
            
            
          <Button size="icon" variant="ghost" onClick={logout}>
            <LogOutIcon className="w-5 h-5" />
            <span className="sr-only">Logout</span>
          </Button>
         
         
           {/* <Button size="icon" variant="ghost">
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="sr-only">Go Back</span>
            </Button>  */}


          </div>
        </header>
        <div className="bg-white dark:bg-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Input className="w-32" placeholder="Enter years to forecast" type="number" value={years} max={10} onChange={(e) => setYears(parseInt(e.target.value))} />
              <Button
              
              style={{color: "white"}}
              >
                Forecast
              </Button>
            </div>
          </div>
          <LineChart className="aspect-[16/9]" farray={forecast} data={chartData} coef={num} />
        </div>
      </div>
    
  )
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}



function LineChart({ farray, data,coef, ...otherProps }: { farray: number[], data: { x: string; y: number }[] , coef: number}) {
  console.log("farray: ", farray); 
  // Convert the forecast data to an array of objects with Date objects for x values
  const forecastData = farray.map((value, index) => ({ x: new Date(2024 + index, 0, 1), y: value * coef }));
  // Convert the input data to an array of objects with Date objects for x values
  const formattedData = data.map((item) => ({ x: parseISO(item.x), y: item.y }));
  console.log("formattedData: ", formattedData);
  return (
    <div {...otherProps}>
      <ResponsiveLine
        data={[
          {
            id: "normal",
            data: formattedData,
          },
          {
            id: "forecast",
            data: [
              { x: new Date(2022, 1, 1), y: 12819 },
              ...forecastData,
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "time",
          format: "%Y-%m-%d", // You may adjust this format based on your date string format
          precision: "day",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: "%Y-%m-%d", // Adjust the format as needed
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#008000", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
              color: "#000",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}


function LogOutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}

