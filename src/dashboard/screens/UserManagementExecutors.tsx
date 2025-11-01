import { Search, Edit, Eye, Send } from 'lucide-react';
import { useState } from 'react';

interface UserManagementExecutorsProps {
  onNavigate: (page: string, userId?: string) => void;
}

export default function UserManagementExecutors({ onNavigate }: UserManagementExecutorsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const executors = [
    {
      id: '1',
      name: 'Mike Johnson',
      availability: 'available',
      skills: ['HVAC', 'Electrical', 'Plumbing'],
      currentLoad: 5,
      maxLoad: 10,
      email: 'mike.j@company.com',
      telegram: 'connected'
    },
    {
      id: '2',
      name: 'Tom Brown',
      availability: 'busy',
      skills: ['Furniture', 'IT Support'],
      currentLoad: 8,
      maxLoad: 10,
      email: 'tom.b@company.com',
      telegram: 'connected'
    },
    {
      id: '3',
      name: 'Sarah Wilson',
      availability: 'offline',
      skills: ['IT Support', 'Network'],
      currentLoad: 0,
      maxLoad: 8,
      email: 'sarah.w@company.com',
      telegram: 'disconnected'
    },
    {
      id: '4',
      name: 'Robert Lee',
      availability: 'available',
      skills: ['HVAC', 'Carpentry'],
      currentLoad: 3,
      maxLoad: 10,
      email: 'robert.l@company.com',
      telegram: 'connected'
    }
  ];

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success';
      case 'busy': return 'bg-warning';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">EXECUTORS</h1>
      </div>

      <div className="bg-white rounded-card shadow-sm p-5 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search executors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-card focus:outline-none focus:border-primary"
            />
          </div>
          <select
            multiple
            className="px-3 py-2 border border-gray-300 rounded-card focus:outline-none focus:border-primary"
          >
            <option>HVAC</option>
            <option>Electrical</option>
            <option>Plumbing</option>
            <option>IT Support</option>
            <option>Furniture</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-card focus:outline-none focus:border-primary">
            <option value="">All Availability</option>
            <option>Available</option>
            <option>Busy</option>
            <option>Offline</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {executors.map((executor) => (
          <div key={executor.id} className="bg-white rounded-card shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                  {executor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{executor.name}</h3>
                  <div className="flex items-center mt-1">
                    <div className={`w-2 h-2 rounded-full ${getAvailabilityColor(executor.availability)} mr-2`}></div>
                    <span className="text-sm text-gray-500 capitalize">{executor.availability}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onNavigate('edit-user', executor.id)}
                  className="p-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-700 hover:bg-gray-100 rounded">
                  <Eye size={16} />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {executor.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Current Load</span>
                <span className="font-medium text-gray-900">
                  {executor.currentLoad}/{executor.maxLoad} tickets
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    (executor.currentLoad / executor.maxLoad) * 100 > 75
                      ? 'bg-danger'
                      : (executor.currentLoad / executor.maxLoad) * 100 > 50
                      ? 'bg-warning'
                      : 'bg-success'
                  }`}
                  style={{ width: `${(executor.currentLoad / executor.maxLoad) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-500">{executor.email}</div>
                <div className="flex items-center">
                  <Send size={14} className={`mr-1 ${executor.telegram === 'connected' ? 'text-success' : 'text-gray-400'}`} />
                  <span className={executor.telegram === 'connected' ? 'text-success' : 'text-gray-400'}>
                    Telegram
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
