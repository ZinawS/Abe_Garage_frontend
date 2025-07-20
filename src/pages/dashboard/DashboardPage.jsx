import DashboardCards from '../../components/dashboard/DashboardCards';
import RecentActivity from '../../components/dashboard/RecentActivity';
import ServiceAnalytics from '../../components/dashboard/ServiceAnalytics';
import { useNavigate } from 'react-router-dom';

/**
 * Dashboard Page Component
 * 
 * Displays overview of key metrics and recent activity
 */
const DashboardPage = () => {
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from API
  const dashboardData = {
    totalCustomers: 124,
    activeServices: 8,
    revenue: 12500.75,
    pendingPayments: 3
  };

  const recentActivities = [
    {
      id: 1,
      type: 'service',
      title: 'New service request',
      description: 'Oil change for Toyota Camry',
      timestamp: '2023-06-15T09:30:00Z'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment received',
      description: '$150.00 from John Smith',
      timestamp: '2023-06-14T14:15:00Z'
    },
    {
      id: 3,
      type: 'customer',
      title: 'New customer registered',
      description: 'Sarah Johnson',
      timestamp: '2023-06-14T11:45:00Z'
    }
  ];

  const serviceData = [
    { label: 'Jun 1', value: 5 },
    { label: 'Jun 2', value: 7 },
    { label: 'Jun 3', value: 3 },
    { label: 'Jun 4', value: 8 },
    { label: 'Jun 5', value: 6 },
    { label: 'Jun 6', value: 9 }
  ];

  const topServices = [
    { id: 1, name: 'Oil Change', percentage: 45, count: 32 },
    { id: 2, name: 'Tire Rotation', percentage: 30, count: 21 },
    { id: 3, name: 'Brake Service', percentage: 15, count: 11 },
    { id: 4, name: 'Battery Check', percentage: 10, count: 7 }
  ];

  const handleViewAllActivities = () => {
    navigate('/orders');
  };

  const handleViewServiceDetails = () => {
    navigate('/services');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <DashboardCards {...dashboardData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ServiceAnalytics 
            serviceData={serviceData}
            topServices={topServices}
            onViewDetails={handleViewServiceDetails}
          />
        </div>
        <div>
          <RecentActivity 
            activities={recentActivities}
            onViewAll={handleViewAllActivities}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;