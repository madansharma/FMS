import { Plus, Edit, GripVertical } from 'lucide-react';

export default function ConfigAllocationRules() {
  const rules = [
    {
      id: '1',
      name: 'Critical HVAC Issues',
      conditions: { category: 'HVAC', priority: 'Critical', type: 'Any' },
      executors: ['Mike Johnson', 'Robert Lee'],
      strategy: 'Least Loaded',
      active: true,
      matched: 12
    },
    {
      id: '2',
      name: 'IT Support Requests',
      conditions: { category: 'IT Support', priority: 'Any', type: 'Any' },
      executors: ['Sarah Wilson', 'Tom Brown'],
      strategy: 'Round Robin',
      active: true,
      matched: 45
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">ALLOCATION RULES</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-card hover:bg-primary/90 flex items-center">
          <Plus size={16} className="mr-2" />
          Add Rule
        </button>
      </div>

      <div className="space-y-4">
        {rules.map((rule, index) => (
          <div key={rule.id} className="bg-white rounded-card shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-start flex-1">
                <button className="text-gray-400 hover:text-gray-600 mr-4 cursor-move mt-1">
                  <GripVertical size={20} />
                </button>
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">{rule.name}</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Category</div>
                      <div className="text-sm font-medium text-gray-900">{rule.conditions.category}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Priority</div>
                      <div className="text-sm font-medium text-gray-900">{rule.conditions.priority}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Type</div>
                      <div className="text-sm font-medium text-gray-900">{rule.conditions.type}</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Assigned Executors</div>
                    <div className="flex flex-wrap gap-2">
                      {rule.executors.map((executor, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {executor}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm">
                    <div>
                      <span className="text-gray-500">Strategy:</span>
                      <span className="ml-2 font-medium text-gray-900">{rule.strategy}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Matched:</span>
                      <span className="ml-2 font-medium text-gray-900">{rule.matched} tickets</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={rule.active} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <button className="p-2 text-gray-700 hover:bg-gray-100 rounded">
                  <Edit size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
