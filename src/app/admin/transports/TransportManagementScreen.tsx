"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import UserDashboardLayout from "@/components/dashboard/UserDashboardLayout";
import { useAuth } from "@/context/AuthContext";
import TransportService from "@/utils/TransportService";
import { useRouter } from "next/navigation";

/**
 * TransportManagementScreen - Admin screen for managing buses and trains
 */
export default function TransportManagementScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [buses, setBuses] = useState<any[]>([]);
  const [trains, setTrains] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'buses' | 'trains'>('buses');

  // Form state for new transport
  const [busForm, setBusForm] = useState({
    bus_name: "",
    bus_number: "",
    bus_type: "AC Sleeper",
    total_seats: 40,
    operator: "",
    source: "",
    destination: "",
    arrival_time: "",
    departure_time: "",
    driver_name: "",
    driver_phone: "",
    availableDates: [""]
  });

  const [trainForm, setTrainForm] = useState({
    train_name: "",
    train_number: "",
    train_type: "AC Sleeper",
    total_seats: 500,
    operator: "Indian Railways",
    source: "",
    destination: "",
    arrival_time: "",
    departure_time: "",
    ticket_price: 1500,
    availableDates: [""]
  });

  useEffect(() => {
    // Check if user is admin
    if (user && user.user_role !== 'admin') {
      toast.error("Access denied. Admin privileges required.");
      router.push('/dashboard');
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch buses and trains
        const [busesData, trainsData] = await Promise.all([
          TransportService.getAllBuses(),
          TransportService.getAllTrains()
        ]);
        
        setBuses(busesData || []);
        setTrains(trainsData || []);
      } catch (error) {
        console.error("Error fetching transport data:", error);
        toast.error("Failed to load transport data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user, router]);

  // Add a date field to the bus form
  const addBusDateField = () => {
    setBusForm({
      ...busForm,
      availableDates: [...busForm.availableDates, ""]
    });
  };

  // Add a date field to the train form
  const addTrainDateField = () => {
    setTrainForm({
      ...trainForm,
      availableDates: [...trainForm.availableDates, ""]
    });
  };

  // Handle bus date input change
  const handleBusDateChange = (index: number, value: string) => {
    const newDates = [...busForm.availableDates];
    newDates[index] = value;
    setBusForm({
      ...busForm,
      availableDates: newDates
    });
  };

  // Handle train date input change
  const handleTrainDateChange = (index: number, value: string) => {
    const newDates = [...trainForm.availableDates];
    newDates[index] = value;
    setTrainForm({
      ...trainForm,
      availableDates: newDates
    });
  };

  // Handle bus form input changes
  const handleBusInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBusForm(prev => ({
      ...prev,
      [name]: name === 'total_seats' ? parseInt(value) : value
    }));
  };

  // Handle train form input changes
  const handleTrainInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTrainForm(prev => ({
      ...prev,
      [name]: name === 'total_seats' || name === 'ticket_price' ? parseInt(value) : value
    }));
  };

  // Handle bus form submission
  const handleBusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Filter out empty dates
      const cleanedForm = {
        ...busForm,
        availableDates: busForm.availableDates.filter(date => date.trim() !== "")
      };
      
      // Register new bus
      await TransportService.registerBus(cleanedForm);
      
      toast.success("Bus registered successfully");
      
      // Reset form
      setBusForm({
        bus_name: "",
        bus_number: "",
        bus_type: "AC Sleeper",
        total_seats: 40,
        operator: "",
        source: "",
        destination: "",
        arrival_time: "",
        departure_time: "",
        driver_name: "",
        driver_phone: "",
        availableDates: [""]
      });
      
      // Refresh bus list
      const busesData = await TransportService.getAllBuses();
      setBuses(busesData || []);
      
    } catch (error: any) {
      console.error("Error registering bus:", error);
      toast.error(error.message || "Failed to register bus");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle train form submission
  const handleTrainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Filter out empty dates
      const cleanedForm = {
        ...trainForm,
        availableDates: trainForm.availableDates.filter(date => date.trim() !== "")
      };
      
      // Register new train
      await TransportService.registerTrain(cleanedForm);
      
      toast.success("Train registered successfully");
      
      // Reset form
      setTrainForm({
        train_name: "",
        train_number: "",
        train_type: "AC Sleeper",
        total_seats: 500,
        operator: "Indian Railways",
        source: "",
        destination: "",
        arrival_time: "",
        departure_time: "",
        ticket_price: 1500,
        availableDates: [""]
      });
      
      // Refresh train list
      const trainsData = await TransportService.getAllTrains();
      setTrains(trainsData || []);
      
    } catch (error: any) {
      console.error("Error registering train:", error);
      toast.error(error.message || "Failed to register train");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserDashboardLayout>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Transport Management</h1>
            <p className="text-white/80 text-lg">
              Add, edit, and manage buses and trains
            </p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'buses'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400'
              }`}
              onClick={() => setActiveTab('buses')}
            >
              Buses
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'trains'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400'
              }`}
              onClick={() => setActiveTab('trains')}
            >
              Trains
            </button>
          </div>
          
          {/* Form and List Sections */}
          {activeTab === 'buses' ? (
            <div className="space-y-8">
              {/* Bus Registration Form */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Register New Bus
                </h2>
                <form onSubmit={handleBusSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bus Name</label>
                      <input
                        type="text"
                        name="bus_name"
                        value={busForm.bus_name}
                        onChange={handleBusInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bus Number</label>
                      <input
                        type="text"
                        name="bus_number"
                        value={busForm.bus_number}
                        onChange={handleBusInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Source</label>
                      <input
                        type="text"
                        name="source"
                        value={busForm.source}
                        onChange={handleBusInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Destination</label>
                      <input
                        type="text"
                        name="destination"
                        value={busForm.destination}
                        onChange={handleBusInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                      <select
                        name="bus_type"
                        value={busForm.bus_type}
                        onChange={handleBusInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="AC Sleeper">AC Sleeper</option>
                        <option value="Non-AC">Non-AC</option>
                        <option value="Semi-Sleeper">Semi-Sleeper</option>
                        <option value="Deluxe">Deluxe</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Seats</label>
                      <input
                        type="number"
                        name="total_seats"
                        value={busForm.total_seats}
                        onChange={handleBusInputChange}
                        required
                        min="1"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Departure Time</label>
                      <input
                        type="time"
                        name="departure_time"
                        value={busForm.departure_time}
                        onChange={handleBusInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Arrival Time</label>
                      <input
                        type="time"
                        name="arrival_time"
                        value={busForm.arrival_time}
                        onChange={handleBusInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="py-3 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Available Dates</h3>
                    
                    {busForm.availableDates.map((date, index) => (
                      <div key={index} className="flex mb-2 items-center">
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => handleBusDateChange(index, e.target.value)}
                          className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          required={index === 0}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newDates = [...busForm.availableDates];
                              newDates.splice(index, 1);
                              setBusForm({...busForm, availableDates: newDates});
                            }}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addBusDateField}
                      className="mt-2 text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                    >
                      + Add Another Date
                    </button>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-6 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium
                        ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
                    >
                      Register Bus
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Bus List */}
              {buses.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm overflow-auto">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Available Buses ({buses.length})
                  </h2>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bus Details</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Route</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timing</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Available Dates</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {buses.map((bus) => (
                        <tr key={bus.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{bus.bus_name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {bus.bus_number} | {bus.bus_type}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {bus.total_seats} seats
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {bus.source} → {bus.destination}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              Dep: {bus.departure_time}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Arr: {bus.arrival_time}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-1">
                              {bus.availableDates && bus.availableDates.map((date: string, idx: number) => (
                                <span key={idx} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded text-xs">
                                  {new Date(date).toLocaleDateString()}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Train Registration Form */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Register New Train
                </h2>
                <form onSubmit={handleTrainSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Train Name</label>
                      <input
                        type="text"
                        name="train_name"
                        value={trainForm.train_name}
                        onChange={handleTrainInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Train Number</label>
                      <input
                        type="text"
                        name="train_number"
                        value={trainForm.train_number}
                        onChange={handleTrainInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Source</label>
                      <input
                        type="text"
                        name="source"
                        value={trainForm.source}
                        onChange={handleTrainInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Destination</label>
                      <input
                        type="text"
                        name="destination"
                        value={trainForm.destination}
                        onChange={handleTrainInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                      <select
                        name="train_type"
                        value={trainForm.train_type}
                        onChange={handleTrainInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="AC Sleeper">AC Sleeper</option>
                        <option value="AC Chair Car">AC Chair Car</option>
                        <option value="Sleeper">Sleeper</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Seats</label>
                      <input
                        type="number"
                        name="total_seats"
                        value={trainForm.total_seats}
                        onChange={handleTrainInputChange}
                        required
                        min="1"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Departure Time</label>
                      <input
                        type="time"
                        name="departure_time"
                        value={trainForm.departure_time}
                        onChange={handleTrainInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Arrival Time</label>
                      <input
                        type="time"
                        name="arrival_time"
                        value={trainForm.arrival_time}
                        onChange={handleTrainInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="py-3 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Available Dates</h3>
                    
                    {trainForm.availableDates.map((date, index) => (
                      <div key={index} className="flex mb-2 items-center">
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => handleTrainDateChange(index, e.target.value)}
                          className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          required={index === 0}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newDates = [...trainForm.availableDates];
                              newDates.splice(index, 1);
                              setTrainForm({...trainForm, availableDates: newDates});
                            }}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addTrainDateField}
                      className="mt-2 text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                    >
                      + Add Another Date
                    </button>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-6 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium
                        ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
                    >
                      Register Train
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </UserDashboardLayout>
  );
} 