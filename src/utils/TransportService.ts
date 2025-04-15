/**
 * TransportService - API service for transportation related endpoints
 */

const BASE_URL = 'https://ticket-backend-31v6.onrender.com/api';

interface TransportBase {
  id: string;
  availableDates: string[];
  source: string;
  destination: string;
  arrival_time: string;
  departure_time: string;
  total_seats: number;
  operator: string;
}

export interface BusDetails extends TransportBase {
  bus_name: string;
  bus_number: string;
  bus_type: string;
  driver_name: string;
  driver_phone: string;
  transport_type: 'bus';
}

export interface TrainDetails extends TransportBase {
  train_name: string;
  train_number: string;
  train_type: string;
  ticket_price: number;
  transport_type: 'train';
}

export interface BookingRequest {
  booking_transport_name: string;
  booking_transport_type: 'bus' | 'train';
  booking_transport_number: string;
  depart_location: string;
  arrival_location: string;
  bookingDate: string;
}

export interface BookingDetails {
  userName: string;
  userEmail: string;
  userPhone: string;
  booking_transport_name: string;
  booking_transport_type: string;
  booking_transport_number: string;
  depart_location: string;
  arrival_location: string;
  bookingDate: string;
  userId: string;
}

export interface PaymentRequest {
  order_amount: number;
}

export interface PaymentResponse {
  payment_session_id: string;
  res: {
    order_id: string;
    order_amount: number;
    order_currency: string;
    order_note: string;
    customer_details: {
      customer_id: string;
      customer_name: string;
      customer_email: string;
      customer_phone: string;
    };
    payment_status: string;
  };
}

// Helper for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const authToken = localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'Network response was not ok');
  }

  return response.json();
};

export const TransportService = {
  // Bus related functions
  getAllBuses: async (): Promise<BusDetails[]> => {
    const data = await apiCall('/getallbusdetails', { method: 'POST' });
    return data.buses;
  },

  getBusById: async (id: string): Promise<BusDetails> => {
    const data = await apiCall(`/getbusbyid/${id}`, { method: 'GET' });
    return data.bus;
  },

  registerBus: async (busData: Omit<BusDetails, 'id' | 'transport_type'>): Promise<{ message: string }> => {
    return apiCall('/bus_register', {
      method: 'PUT',
      body: JSON.stringify(busData),
    });
  },

  // Train related functions
  getAllTrains: async (): Promise<TrainDetails[]> => {
    const data = await apiCall('/gettrainsdata', { method: 'GET' });
    return data.trains;
  },

  getTrainById: async (id: string): Promise<TrainDetails> => {
    const data = await apiCall(`/gettrainbyid/${id}`, { method: 'GET' });
    return data.train;
  },

  registerTrain: async (trainData: Omit<TrainDetails, 'id' | 'transport_type'>): Promise<{ message: string }> => {
    return apiCall('/register_train', {
      method: 'PUT',
      body: JSON.stringify(trainData),
    });
  },

  // Booking related functions
  bookTicket: async (bookingData: BookingRequest): Promise<{ message: string; booking: BookingDetails; data: any }> => {
    return apiCall('/bookticket', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  getTicketData: async (): Promise<{ ticket_dataa: BookingDetails[]; per_day_booking: { _id: string; totalBookings: number }[] }> => {
    return apiCall('/ticketdata', { method: 'GET' });
  },

  // Payment related functions
  initiatePayment: async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
    return apiCall('/payment/krdo', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },
};

export default TransportService; 