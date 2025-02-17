import React from 'react';
import { FaHouseChimney } from 'react-icons/fa6';
import { FcInspection } from 'react-icons/fc';
import { MdApartment } from 'react-icons/md';
import { PiHandDeposit } from 'react-icons/pi';

export const Dashboard = () => {
  const cardsData = [
    { title: 'Total Apartment', value: '130', icon: <MdApartment /> },
    { title: 'On hold Deposits', value: '7', icon: <PiHandDeposit /> },
    { title: 'Total Tenant', value: '118', icon: <FaHouseChimney /> },
    { title: 'Pending Inspections', value: '13', icon: <FcInspection /> },
  ];

  return (
    <div className="p-6">
      <div className=" p-6 rounded-lg shadow-2xl">
        <h1 className="text-xl font-semibold mb-2">Mon, 18 Jul 2022</h1>
        <h2 className="text-2xl font-bold mb-4">Welcome back, Iquas!</h2>
        <p className="text-gray-500 mb-6">This is the property portfolio report.</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
            >
              {/* Card Icon */}
              <div className="p-4 bg-gray-200 rounded-full text-3xl text-[#222222]">
                {card.icon}
              </div>

              {/* Card Content */}
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  {card.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Menu Links */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="flex space-x-4">
            <h2 className="text-gray-700 hover:text-gray-900">About</h2>
            <h2 className="text-gray-700 hover:text-gray-900">Property List</h2>
            <h2 className="text-gray-700 hover:text-gray-900">Feature Properties</h2>
            <h2 className="text-gray-900 font-semibold">Analytics</h2>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Stats Overview</h3>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2">
                <input type="radio" name="stats" className="text-purple-600" />
                <span>Average days on Market</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="stats" className="text-purple-600" />
                <span>Applicant</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="stats" className="text-purple-600" defaultChecked />
                <span>Total Earnings</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="stats" className="text-purple-600" />
                <span>Target Average on Market</span>
              </label>
            </div>
            <div>
              <select className="p-2 border rounded-md text-gray-700">
                <option>Per - Month . Aug</option>
                <option>Per - Month . Jul</option>
              </select>
            </div>
          </div>

          {/* Example Graph Placeholder */}
          <div className="bg-purple-100 rounded-lg p-6">
            <p className="text-center text-gray-500">Graph Placeholder (Implement graph here)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
