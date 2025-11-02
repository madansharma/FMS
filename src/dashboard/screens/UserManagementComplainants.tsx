import { useState } from 'react';
import { Plus, Download, Upload, Search } from 'lucide-react';

interface UserManagementComplainantsProps {
  onNavigate: (page: string, userId?: string) => void;
}

export default function UserManagementComplainants({ onNavigate }: UserManagementComplainantsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: '1', name: 'John Smith', email: 'john.smith@company.com', department: 'IT', extension: '1234', status: 'active' },
    { id: '2', name: 'Sarah Lee', email: 'sarah.lee@company.com', department: 'HR', extension: '1235', status: 'active' },
    { id: '3', name: 'Mike Davis', email: 'mike.davis@company.com', department: 'Finance', extension: '1236', status: 'active' },
    { id: '4', name: 'Emily Chen', email: 'emily.chen@company.com', department: 'Marketing', extension: '1237', status: 'inactive' },
    { id: '5', name: 'David Kim', email: 'david.kim@company.com', department: 'IT', extension: '1238', status: 'active' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">COMPLAINANTS</h1>
        <button
          onClick={() => onNavigate('create-user', 'complainant')}
          className="px-4 py-2 bg-primary text-white rounded-card hover:bg-primary/90 flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Create User
        </button>
      </div>

      <div className="bg-white rounded-card shadow-sm p-5 mb-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-card focus:outline-none focus:border-primary"
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-card focus:outline-none focus:border-primary">
            <option value="">All Departments</option>
            <option>IT</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Marketing</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-card focus:outline-none focus:border-primary">
            <option value="">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-card hover:bg-gray-50 flex items-center">
            <Download size={14} className="mr-1" />
            Export CSV
          </button>
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-card hover:bg-gray-50 flex items-center">
            <Upload size={14} className="mr-1" />
            Bulk Upload
          </button>
          <button className="px-3 py-2 text-sm border border-danger text-danger rounded-card hover:bg-danger/10">
            Deactivate Selected
          </button>
        </div>
      </div>

      <div className="bg-white rounded-card shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">
                <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded" />
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Extension</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded" />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{user.department}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{user.extension}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-success/10 text-success' : 'bg-gray-300 text-gray-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onNavigate('edit-user', user.id)}
                    className="text-sm text-primary hover:text-primary/80 mr-3"
                  >
                    Edit
                  </button>
                  <button className="text-sm text-danger hover:text-danger/80">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
