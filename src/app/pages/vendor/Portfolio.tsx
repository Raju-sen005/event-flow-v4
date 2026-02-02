import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Search, 
  Image as ImageIcon, 
  Video, 
  Edit, 
  Trash2, 
  Eye, 
  X,
  Upload,
  Check,
  ToggleLeft,
  ToggleRight,
  Grid3x3,
  List
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  description: string;
  media: { type: 'image' | 'video'; url: string }[];
  status: 'active' | 'inactive';
  createdAt: string;
}

const CATEGORIES = {
  'Photography': ['Wedding', 'Corporate', 'Portrait', 'Product', 'Event'],
  'Catering': ['Indian', 'Continental', 'Chinese', 'Italian', 'Fusion'],
  'Decoration': ['Floral', 'Balloon', 'Stage', 'Lighting', 'Theme'],
  'Entertainment': ['DJ', 'Live Band', 'Dancer', 'Magician', 'Anchor'],
  'Venue': ['Banquet Hall', 'Outdoor', 'Resort', 'Hotel', 'Farm House']
};

export const Portfolio: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: '1',
      title: 'Destination Wedding in Goa',
      category: 'Photography',
      subCategory: 'Wedding',
      description: 'Beautiful beach wedding with sunset ceremony and traditional Indian reception',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600' }
      ],
      status: 'active',
      createdAt: '2024-03-15'
    },
    {
      id: '2',
      title: 'Corporate Annual Meet',
      category: 'Photography',
      subCategory: 'Corporate',
      description: 'Professional corporate event photography for tech company annual meeting',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600' }
      ],
      status: 'active',
      createdAt: '2024-02-20'
    },
    {
      id: '3',
      title: 'Birthday Party Setup',
      category: 'Photography',
      subCategory: 'Event',
      description: 'Kids birthday party with themed decorations and candid moments',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600' }
      ],
      status: 'inactive',
      createdAt: '2024-01-10'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subCategory: '',
    description: '',
    status: 'active' as 'active' | 'inactive'
  });
  const [uploadedMedia, setUploadedMedia] = useState<{ type: 'image' | 'video'; url: string }[]>([]);

  const categories = ['All', ...Object.keys(CATEGORIES)];
  const subCategories = formData.category && CATEGORIES[formData.category as keyof typeof CATEGORIES] 
    ? ['All', ...CATEGORIES[formData.category as keyof typeof CATEGORIES]] 
    : ['All'];

  const filterCategories = ['All', ...Object.keys(CATEGORIES)];
  const filterSubCategories = selectedCategory !== 'All' && CATEGORIES[selectedCategory as keyof typeof CATEGORIES]
    ? ['All', ...CATEGORIES[selectedCategory as keyof typeof CATEGORIES]]
    : ['All'];

  const filteredItems = portfolioItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSubCategory = selectedSubCategory === 'All' || item.subCategory === selectedSubCategory;
    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  const handleOpenModal = (mode: 'add' | 'edit' | 'view', item?: PortfolioItem) => {
    setModalMode(mode);
    if (item) {
      setSelectedItem(item);
      setFormData({
        title: item.title,
        category: item.category,
        subCategory: item.subCategory,
        description: item.description,
        status: item.status
      });
      setUploadedMedia(item.media);
    } else {
      setSelectedItem(null);
      setFormData({
        title: '',
        category: '',
        subCategory: '',
        description: '',
        status: 'active'
      });
      setUploadedMedia([]);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setFormData({
      title: '',
      category: '',
      subCategory: '',
      description: '',
      status: 'active'
    });
    setUploadedMedia([]);
  };

  const handleSave = () => {
    if (modalMode === 'add') {
      const newItem: PortfolioItem = {
        id: Date.now().toString(),
        ...formData,
        media: uploadedMedia,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setPortfolioItems([newItem, ...portfolioItems]);
    } else if (modalMode === 'edit' && selectedItem) {
      setPortfolioItems(portfolioItems.map(item => 
        item.id === selectedItem.id 
          ? { ...item, ...formData, media: uploadedMedia }
          : item
      ));
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      setPortfolioItems(portfolioItems.filter(item => item.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setPortfolioItems(portfolioItems.map(item =>
      item.id === id
        ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
        : item
    ));
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulate file upload - in real app, upload to server
      const newMedia = Array.from(files).map(file => ({
        type: file.type.startsWith('video/') ? 'video' as const : 'image' as const,
        url: URL.createObjectURL(file)
      }));
      setUploadedMedia([...uploadedMedia, ...newMedia]);
    }
  };

  const handleRemoveMedia = (index: number) => {
    setUploadedMedia(uploadedMedia.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#16232A]">Portfolio</h1>
          <p className="text-gray-600 mt-1">Showcase your best work to potential clients</p>
        </div>
        <Button 
          onClick={() => handleOpenModal('add')}
          className="bg-[#075056] hover:bg-[#075056]/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Portfolio Item
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search portfolio..."
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubCategory('All');
            }}
            className="h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm"
          >
            {filterCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm"
            disabled={selectedCategory === 'All'}
          >
            {filterSubCategories.map(subCat => (
              <option key={subCat} value={subCat}>{subCat}</option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#075056] text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              <Grid3x3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#075056] text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Items */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#16232A] mb-2">No portfolio items found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || selectedCategory !== 'All' 
              ? 'Try adjusting your filters' 
              : 'Add your first portfolio item to showcase your work'}
          </p>
          {!searchTerm && selectedCategory === 'All' && (
            <Button 
              onClick={() => handleOpenModal('add')}
              className="bg-[#075056] hover:bg-[#075056]/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Portfolio Item
            </Button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-100">
                {item.media[0]?.type === 'image' ? (
                  <img 
                    src={item.media[0].url} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                {item.media.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    +{item.media.length - 1}
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-[#16232A] mb-1">{item.title}</h3>
                <p className="text-sm text-[#075056] mb-2">
                  {item.category} → {item.subCategory}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {item.description}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenModal('view', item)}
                    className="flex-1"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenModal('edit', item)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleStatus(item.id)}
                  >
                    {item.status === 'active' ? (
                      <ToggleRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ToggleLeft className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.media[0]?.type === 'image' ? (
                    <img 
                      src={item.media[0].url} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#16232A] mb-1">{item.title}</h3>
                      <p className="text-sm text-[#075056]">
                        {item.category} → {item.subCategory}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                      item.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenModal('view', item)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenModal('edit', item)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleStatus(item.id)}
                    >
                      {item.status === 'active' ? (
                        <>
                          <ToggleRight className="h-4 w-4 text-green-600 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="h-4 w-4 text-gray-400 mr-1" />
                          Inactive
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit/View Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#16232A]">
                {modalMode === 'add' && 'Add Portfolio Item'}
                {modalMode === 'edit' && 'Edit Portfolio Item'}
                {modalMode === 'view' && 'Portfolio Details'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {modalMode === 'view' ? (
                <>
                  {/* View Mode */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <p className="text-[#16232A] mt-1">{formData.title}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <p className="text-[#16232A] mt-1">{formData.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Sub-category</label>
                      <p className="text-[#16232A] mt-1">{formData.subCategory}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <p className="text-[#16232A] mt-1">{formData.description}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Media</label>
                    <div className="grid grid-cols-3 gap-3">
                      {uploadedMedia.map((media, index) => (
                        <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          {media.type === 'image' ? (
                            <img src={media.url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Video className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <p className={`mt-1 inline-flex px-2 py-1 rounded text-sm font-medium ${
                      formData.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {formData.status === 'active' ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Edit/Add Mode */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Portfolio Title *
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Destination Wedding in Goa"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          category: e.target.value,
                          subCategory: ''
                        })}
                        className="w-full h-10 px-3 rounded-lg border border-gray-200"
                      >
                        <option value="">Select category</option>
                        {Object.keys(CATEGORIES).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Sub-category *
                      </label>
                      <select
                        value={formData.subCategory}
                        onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border border-gray-200"
                        disabled={!formData.category}
                      >
                        <option value="">Select sub-category</option>
                        {subCategories.filter(s => s !== 'All').map(subCat => (
                          <option key={subCat} value={subCat}>{subCat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe this portfolio item..."
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Media (Images & Videos)
                    </label>
                    
                    {/* Upload Area */}
                    <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#075056] transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleMediaUpload}
                        className="hidden"
                      />
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Images and videos up to 10MB
                      </p>
                    </label>

                    {/* Uploaded Media Preview */}
                    {uploadedMedia.length > 0 && (
                      <div className="grid grid-cols-4 gap-3 mt-3">
                        {uploadedMedia.map((media, index) => (
                          <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                            {media.type === 'image' ? (
                              <img src={media.url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Video className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                            <button
                              onClick={() => handleRemoveMedia(index)}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Status
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={formData.status === 'active'}
                          onChange={() => setFormData({ ...formData, status: 'active' })}
                          className="w-4 h-4 text-[#075056]"
                        />
                        <span className="text-sm">Active</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={formData.status === 'inactive'}
                          onChange={() => setFormData({ ...formData, status: 'inactive' })}
                          className="w-4 h-4 text-gray-400"
                        />
                        <span className="text-sm">Inactive</span>
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleCloseModal}
              >
                {modalMode === 'view' ? 'Close' : 'Cancel'}
              </Button>
              {modalMode !== 'view' && (
                <Button
                  onClick={handleSave}
                  className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                  disabled={!formData.title || !formData.category || !formData.subCategory || !formData.description}
                >
                  <Check className="h-4 w-4 mr-2" />
                  {modalMode === 'add' ? 'Add Item' : 'Save Changes'}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};