import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, AlertCircle } from 'lucide-react';
import { configService } from '../../services/config.service';
import type { Category } from '../../types/database';

export default function ConfigCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    active: true,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await configService.getAllCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      active: true,
    });
    setShowModal(true);
    setError(null);
    setSuccessMessage(null);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      active: category.active,
    });
    setShowModal(true);
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingCategory) {
        await configService.updateCategory(editingCategory.id, formData);
        setSuccessMessage('Category updated successfully!');
      } else {
        await configService.createCategory(formData.name, formData.description);
        setSuccessMessage('Category created successfully!');
      }

      await loadCategories();

      setTimeout(() => {
        setShowModal(false);
        setSuccessMessage(null);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the category "${name}"?`)) return;

    try {
      setLoading(true);
      await configService.deleteCategory(id);
      await loadCategories();
      setSuccessMessage('Category deleted successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (category: Category) => {
    try {
      await configService.updateCategory(category.id, { active: !category.active });
      await loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category status');
      setTimeout(() => setError(null), 3000);
    }
  };

  if (loading && categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading categories...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">CATEGORIES</h1>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-primary text-white rounded-card hover:bg-primary/90 flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add Category
        </button>
      </div>

      {error && !showModal && (
        <div className="mb-4 p-3 bg-danger/10 border border-danger text-danger rounded-card flex items-center">
          <AlertCircle size={16} className="mr-2" />
          {error}
        </div>
      )}

      {successMessage && !showModal && (
        <div className="mb-4 p-3 bg-success/10 border border-success text-success rounded-card">
          {successMessage}
        </div>
      )}

      {categories.length === 0 ? (
        <div className="bg-white rounded-card shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">No categories found</p>
          <button
            onClick={openCreateModal}
            className="text-primary hover:underline"
          >
            Create your first category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-card shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditModal(category)}
                        className="p-2 text-gray-700 hover:bg-gray-100 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id, category.name)}
                        className="p-2 text-danger hover:bg-danger/10 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{category.description || 'No description'}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <button
                  onClick={() => handleToggleActive(category)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    category.active ? 'bg-success/10 text-success' : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {category.active ? 'Active' : 'Inactive'}
                </button>
                <div className="text-xs text-gray-500">
                  Created {new Date(category.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-card shadow-xl max-w-lg w-full">
            <div className="px-6 py-4 border-b border-gray-300 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-danger/10 border border-danger text-danger rounded-card flex items-center">
                  <AlertCircle size={16} className="mr-2" />
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="p-3 bg-success/10 border border-success text-success rounded-card">
                  {successMessage}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-card focus:outline-none focus:border-primary"
                  placeholder="Category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-card focus:outline-none focus:border-primary"
                  placeholder="Category description"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-primary border-gray-300 rounded mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Active</label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-card hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-white rounded-card hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
