import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponsiveLine } from "@nivo/line";
import { Login } from "@/components/login";
import useLoginStore from "@/State";

export function Dashboard() {
  const [years, setYears] = useState(10);
  const [forecast, setForecast] = useState<number[]>([]);
  const { username, isLoggedIn, login, logout } = useLoginStore();




  useEffect(() => {
    const data = {
      data: [] as number[][][],
    };

    for (let i = 0; i < years; i++) {
      data.data.push([[ 2025+i , 4540+i*100,100+i*10,21+i,256+i,254,129,8173+i*1000,6734+i*1000]]);
    }

    console.log(data);

    axios.post('http://localhost:8000/predict/', data)
      .then(response => {
        console.log(response.data);
        console.log(response.data["prediction"][0]);
        const newForecast = response.data["prediction"].map((item: any) => item[0]);
        setForecast(newForecast);
        console.log("Forecast: ", newForecast);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [years]);

  if (!isLoggedIn) {
    return (
      <Login />
    )
  }
  
  return (
    <div className="flex h-screen w-full">
      <div className="bg-white text-black w-64 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Time Series Model</h1>
        </div>
        <nav className="flex-1 space-y-2">
          <div className="group relative">
            <button className="flex items-center w-full px-4 py-2 rounded-md hover:bg-white focus:outline-none focus:bg-white">
              <FolderIcon className="w-5 h-5 mr-2" />
              <span>secteurs</span>
              <ChevronRightIcon className="w-5 h-5 ml-auto transform group-hover:rotate-90 transition-transform" />
            </button>
            <div className="absolute left-full top-0 mt-0 w-64 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
              <div className="p-4 space-y-2">
                <Link className="block px-4 py-2 rounded-md hover:bg-gray-200" href="#">
                industrielle
                </Link>
                <Link className="block px-4 py-2 rounded-md hover:bg-gray-200" href="#">
                transport
                </Link>
                <Link className="block px-4 py-2 rounded-md hover:bg-gray-200" href="#">
                menage
                </Link>
              </div>
            </div>
          </div>
          <div className="group relative">
            <button className="flex items-center w-full px-4 py-2 rounded-md hover:bg-white focus:outline-none focus:bg-gray-200">
              <MapPinIcon className="w-5 h-5 mr-2" />
              <span>énergie</span>
              <ChevronRightIcon className="w-5 h-5 ml-auto transform group-hover:rotate-90 transition-transform" />
            </button>
            <div className="absolute left-full top-0 mt-0 w-64 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
              <div className="p-4 space-y-2">
                <Link className="block px-4 py-2 rounded-md hover:bg-gray-200" href="#">
                gas
                </Link>
                <Link className="block px-4 py-2 rounded-md hover:bg-gray-200" href="#">
                Electricité
                </Link>
                <Link className="block px-4 py-2 rounded-md hover:bg-gray-200" href="#">
                Solide
                </Link>
                <Link className="block px-4 py-2 rounded-md hover:bg-gray-200" href="#">
                Liquide
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex-1 bg-gray-100 dark:bg-gray-200 p-6">
        <header className="bg-white dark:bg-gray-900 shadow-sm flex items-center justify-between px-6 py-4 mb-6">
          <h1 className="text-xl font-bold">Forecasting Model</h1>
          <div className="flex items-center space-x-4">
            <Button size="icon" variant="ghost">
              <LogOutIcon className="w-5 h-5" />
              <span className="sr-only">Logout</span>
            </Button>
            <Button size="icon" variant="ghost">
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="sr-only">Go Back</span>
            </Button>
          </div>
        </header>
        <div className="bg-white dark:bg-gray-400 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Forecasting Model</h2>
            <div className="flex items-center space-x-4">
              <Input className="w-32" placeholder="Enter years to forecast" type="number" value={years} onChange={(e) => setYears(parseInt(e.target.value))} />
              <Button>Forecast</Button>
            </div>
          </div>
          <LineChart className="aspect-[16/9]" farray={forecast} />
        </div>
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

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}

function LineChart({ farray, ...props }: { farray: number[] }) {
  console.log("farray: ", farray); // Output: "farray: []"
  const forecastData = farray.map((value, index) => ({ x: 2025 + index, y: value }));
  
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "normal",
            data: [
              { x: 2019, y: 4750 },
              { x: 2020, y: 4950 },
              { x: 2021, y: 5221 },
              { x: 2022, y: 5067 },
              { x: 2023, y: 5234 },
              { x: 2024, y: 5472 },
            ],
          },
          {
            id: "forecast",
            data: [
              { x: 2024, y: 5472 },
              ...forecastData,
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
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

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
