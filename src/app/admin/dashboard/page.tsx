import { redirect } from 'next/navigation';

export default function AdminDashboardPage() {
  // For now, we'll just redirect to the main dashboard
  // This could be replaced with an AdminDashboardScreen component
  // that displays admin-specific features
  redirect('/dashboard');
} 