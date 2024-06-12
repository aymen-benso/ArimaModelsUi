"use client"; 
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [activeMainMenu, setActiveMainMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const menuData = [
    {
      name: "énergie",
      icon: MapPinIcon,
      subSections: [
        {
          name: "industriel",
          subItems: ["gaz", "ele", "liq"],
        },
        {
          name: "transport",
          subItems: ["gaz", "ele", "liq"],
        },
        {
          name: "residentiel",
          subItems: ["gaz", "ele", "liq"],
        },
      ],
    },
  ];

  const handleMainMenuClick = (menuName: string) => {
    setActiveMainMenu(menuName === activeMainMenu ? null : menuName);
    setActiveSubMenu(null);
  };

  const handleSubMenuClick = (subMenuName: string) => {
    setActiveSubMenu(subMenuName === activeSubMenu ? null : subMenuName);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen w-full">
          <div className="bg-white text-black w-64 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold">Time Series Model</h1>
            </div>
            <nav className="flex-1 space-y-2">
              {menuData.map((menuItem) => (
                <div key={menuItem.name} className="relative">
                  <button
                    className="flex items-center w-full px-4 py-2 rounded-md hover:bg-white focus:outline-none focus:bg-gray-200"
                    onClick={() => handleMainMenuClick(menuItem.name)}
                  >
                    <menuItem.icon className="w-5 h-5 mr-2" />
                    <span>{menuItem.name}</span>
                    <ChevronRightIcon
                      className="w-5 h-5 ml-auto transform transition-transform"
                      style={{ transform: activeMainMenu === menuItem.name ? "rotate(90deg)" : "" }}
                    />
                  </button>
                  {activeMainMenu === menuItem.name && (
                    <div className="absolute left-full top-0 mt-0 w-64 bg-white rounded-md shadow-lg z-10">
                      <div className="p-4 space-y-2">
                        {menuItem.subSections.map((subSection) => (
                          <div key={subSection.name} className="relative">
                            <button
                              className="flex items-center w-full px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                              onClick={() => handleSubMenuClick(subSection.name)}
                            >
                              <FolderIcon className="w-5 h-5 mr-2" />
                              <span>{subSection.name}</span>
                              <ChevronRightIcon
                                className="w-5 h-5 ml-auto transform transition-transform"
                                style={{ transform: activeSubMenu === subSection.name ? "rotate(90deg)" : "" }}
                              />
                            </button>
                            {activeSubMenu === subSection.name && (
                              <div className="absolute left-full top-0 mt-0 w-64 bg-white rounded-md shadow-lg z-10">
                                <div className="p-4 space-y-2">
                                  {subSection.subItems.map((subItem) => (
                                    <Link
                                      key={subItem}
                                      className="block px-4 py-2 rounded-md hover:bg-gray-200"
                                      href={`/${subSection.name}/${subItem}`}
                                    >
                                      {subItem}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
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
  );
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
  );
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
  );
}
