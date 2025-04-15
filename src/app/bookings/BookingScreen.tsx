"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import UserDashboardLayout from "@/components/dashboard/UserDashboardLayout";
import { useAuth } from "@/context/AuthContext";
import TransportService, { BookingDetails, BusDetails, TrainDetails } from "@/utils/TransportService";

/**
 * BookingScreen - Component for managing bookings
 * 
 * This screen shows existing bookings and allows for creating new ones.
 */
export default function BookingScreen() {
  const { user, userBookings, fetchUserProfile } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState<BookingDetails[]>([]);
  const [perDayBookings, setPerDayBookings] = useState<{ _id: string; totalBookings: number }[]>([]);
  const [buses, setBuses] = useState<BusDetails[]>([]);
  const [trains, setTrains] = useState<TrainDetails[]>([]);

  // Form state for new booking
  const [bookingForm, setBookingForm] = useState({
    transport_type: "bus" as "bus" | "train",
    transport_id: "",
    bookingDate: ""
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    // Fetch all data needed for the booking screen
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Refresh user profile to get latest bookings
        await fetchUserProfile();
        
        // Fetch ticket data
        const ticketData = await TransportService.getTicketData();
        setTickets(ticketData.ticket_dataa || []);
        setPerDayBookings(ticketData.per_day_booking || []);
        
        // Fetch buses and trains
        const [busesData, trainsData] = await Promise.all([
          TransportService.getAllBuses(),
          TransportService.getAllTrains()
        ]);
        
        setBuses(busesData || []);
        setTrains(trainsData || []);
        
      } catch (error) {
        console.error("Error fetching booking data:", error);
        toast.error("Failed to load booking data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle booking form submission
  const handleBookTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    try {
      // Validate form
      if (!bookingForm.transport_id || !bookingForm.bookingDate) {
        setFormError("Please select both transport and date");
        return;
      }
      
      // Get the selected transport details
      const selectedTransport = bookingForm.transport_type === "bus" 
        ? buses.find(bus => bus.id === bookingForm.transport_id)
        : trains.find(train => train.id === bookingForm.transport_id);
      
      if (!selectedTransport) {
        setFormError("Selected transport not found");
        return;
      }
      
      // Check if the selected date is available
      if (!selectedTransport.availableDates.includes(bookingForm.bookingDate)) {
        setFormError("Selected date is not available for this transport");
        return;
      }
      
      // Create booking request
      const bookingRequest = {
        booking_transport_name: bookingForm.transport_type === "bus" 
          ? (selectedTransport as BusDetails).bus_name 
          : (selectedTransport as TrainDetails).train_name,
        booking_transport_type: bookingForm.transport_type,
        booking_transport_number: bookingForm.transport_type === "bus" 
          ? (selectedTransport as BusDetails).bus_number 
          : (selectedTransport as TrainDetails).train_number,
        depart_location: selectedTransport.source,
        arrival_location: selectedTransport.destination,
        bookingDate: bookingForm.bookingDate
      };
      
      // Submit booking
      const response = await TransportService.bookTicket(bookingRequest);
      
      // Show success message
      toast.success("Booking successful!", {
        description: `Your ${bookingForm.transport_type} ticket has been booked.`
      });
      
      // Refresh user profile to get updated bookings
      await fetchUserProfile();
      
      // Reset form
      setBookingForm({
        transport_type: "bus",
        transport_id: "",
        bookingDate: ""
      });
      
    } catch (error: any) {
      console.error("Error booking ticket:", error);
      setFormError(error.message || "Failed to book ticket. Please try again.");
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
            <h1 className="text-3xl font-bold mb-2">Book Your Next Trip</h1>
            <p className="text-white/80 text-lg">
              Find and book buses and trains for your journey
            </p>
          </div>
          
          {/* Booking Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              New Booking
            </h2>
            
            {formError && (
              <div className="mb-4 p-3 text-sm rounded-lg bg-red-500/10 text-red-500">
                {formError}
              </div>
            )}
            
            <form onSubmit={handleBookTicket} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Transport Type
                  </label>
                  <select
                    name="transport_type"
                    value={bookingForm.transport_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="bus">Bus</option>
                    <option value="train">Train</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {bookingForm.transport_type === "bus" ? "Select Bus" : "Select Train"}
                  </label>
                  <select
                    name="transport_id"
                    value={bookingForm.transport_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select {bookingForm.transport_type}</option>
                    {bookingForm.transport_type === "bus" 
                      ? buses.map(bus => (
                          <option key={bus.id} value={bus.id}>
                            {bus.bus_name} - {bus.source} to {bus.destination}
                          </option>
                        ))
                      : trains.map(train => (
                          <option key={train.id} value={train.id}>
                            {train.train_name} - {train.source} to {train.destination}
                          </option>
                        ))
                    }
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    name="bookingDate"
                    value={bookingForm.bookingDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium"
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
          
          {/* User bookings from tickets API */}
          {tickets.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Your Bookings
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transport</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Route</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {tickets.map((ticket, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {ticket.booking_transport_name} ({ticket.booking_transport_type})
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {ticket.booking_transport_number}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {ticket.depart_location} → {ticket.arrival_location}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(ticket.bookingDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Booking statistics */}
          {perDayBookings.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Booking Statistics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {perDayBookings.map((dayStats, index) => (
                  <div key={index} className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                    <h3 className="text-sm text-indigo-600 dark:text-indigo-300">
                      {new Date(dayStats._id).toLocaleDateString(undefined, { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {dayStats.totalBookings} {dayStats.totalBookings === 1 ? 'booking' : 'bookings'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </UserDashboardLayout>
  );
} 