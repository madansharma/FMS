import { useState } from 'react';
import { Plus, Edit, GripVertical, Zap } from 'lucide-react';

export default function ConfigCategories() {
  const [showModal, setShowModal] = useState(false);

  const categories = [
    { id: '1', icon: '❄️', name: 'HVAC', description: 'Heating, Ventilation & Air Conditioning', keywords: 'AC, cooling, heating', color: '#0066FF', status: 'active', count: 45 },
    { id: '2', icon: '💡', name: 'Electrical', description: 'Electrical systems and lighting', keywords: 'light, power, socket', color: '#FFAA00', status: 'active', count: 32 },
    { id: '3', icon: '🚰', name: 'Plumbing', description: 'Water and drainage systems', keywords: 'water, leak, drain', color: '#2196F3', status: 'active', count: 28 },
    { id: '4', icon: '🪑', name: 'Furniture', description: 'Office furniture and fixtures', keywords: 'chair, desk, table', color: '#00CC66', status: 'active', count: 18 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">CATEGORIES</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-card hover:bg-primary/90 flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-card shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start">
                <button className="text-gray-400 hover:text-gray-600 mr-3 cursor-move">
                  <GripVertical size={20} />
                </button>
                <div className="text-4xl mr-3">{category.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded">
                <Edit size={16} />
              </button>
            </div>

            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1">Keywords:</div>
              <div className="text-sm text-gray-700">{category.keywords}</div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded" style={{ backgroundColor: category.color }}></div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  category.status === 'active' ? 'bg-success/10 text-success' : 'bg-gray-300 text-gray-700'
                }`}>
                  {category.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {category.count} tickets (30d)
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-card shadow-xl max-w-lg w-full">
            <div className="px-6 py-4 border-b border-gray-300">
              <h2 className="text-xl font-bold text-gray-900">Add Category</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-card focus:outline-none focus:border-primary"
                  placeholder="Category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-card focus:outline-none focus:border-primary"
                  placeholder="Category description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-card focus:outline-none focus:border-primary"
                    placeholder="🔧"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <input
                    type="color"
                    className="w-full h-10 border border-gray-300 rounded-card cursor-pointer"
                    defaultValue="#0066FF"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Keywords (comma separated)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-card focus:outline-none focus:border-primary"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-gray-300 rounded mr-2" />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded mr-2" />
                  <span className="text-sm font-medium text-gray-700 flex items-center">
                    <Zap size={14} className="mr-1" />
                    AI Available
                  </span>
                </label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-300 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-card hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-card hover:bg-primary/90">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
