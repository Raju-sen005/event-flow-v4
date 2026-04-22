import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Eye, Check, Search, Filter, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

interface Template {
  id: string;
  name: string;
  eventType: string;
  style: string;
  format: string;
  thumbnail: string;
}

export const TemplateSelection: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    eventType: "all",
    style: "all",
    format: "all",
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/templates/templates`);
      const data = await res.json();

      setTemplates(data);
    } catch (err) {
      console.error("Template fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterOptions = {
    eventType: [
      { value: "all", label: "All Events" },
      { value: "wedding", label: "Wedding" },
      { value: "birthday", label: "Birthday" },
      { value: "corporate", label: "Corporate" },
      { value: "party", label: "Party" },
    ],
    style: [
      { value: "all", label: "All Styles" },
      { value: "traditional", label: "Traditional" },
      { value: "modern", label: "Modern" },
      { value: "minimal", label: "Minimal" },
    ],
    format: [
      { value: "all", label: "All Formats" },
      { value: "card", label: "Card" },
      { value: "video", label: "Video" },
    ],
  };

  // Filter templates
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesEventType =
      filters.eventType === "all" || template.eventType === filters.eventType;
    const matchesStyle =
      filters.style === "all" || template.style === filters.style;
    const matchesFormat =
      filters.format === "all" || template.format === filters.format;

    return matchesSearch && matchesEventType && matchesStyle && matchesFormat;
  });

  const handleResetFilters = () => {
    setFilters({
      eventType: "all",
      style: "all",
      format: "all",
    });
    setSearchQuery("");
  };

  const handleUseTemplate = (templateId: string) => {
    navigate(`/customer/invitations/${eventId}/templates/${templateId}/edit`);
  };

  const gradients = [
    "from-purple-400 via-pink-400 to-red-400",
    "from-blue-400 via-cyan-400 to-teal-400",
    "from-yellow-400 via-orange-400 to-red-400",
    "from-green-400 via-emerald-400 to-teal-400",
    "from-pink-400 via-purple-400 to-indigo-400",
    "from-indigo-400 via-blue-400 to-cyan-400",
  ];

  const handleEdit = (template: any) => {
    window.open(template.canvaUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/customer/invitations/${eventId}/create`)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#16232A]">
              Choose a Template
            </h1>
            <p className="text-gray-600">
              Select a template to customize for your event
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {(filters.eventType !== "all" ||
              filters.style !== "all" ||
              filters.format !== "all") && (
              <span className="h-2 w-2 bg-[#FF5B04] rounded-full" />
            )}
          </Button>
        </div>

        {/* Filter Options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 overflow-hidden"
            >
              {Object.entries(filterOptions).map(([key, options]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {key === "eventType" ? "Event Type" : key}
                  </label>
                  <select
                    value={filters[key as keyof typeof filters]}
                    onChange={(e) =>
                      setFilters({ ...filters, [key]: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <div className="flex items-end">
                <Button
                  onClick={handleResetFilters}
                  variant="outline"
                  className="w-full"
                >
                  Reset Filters
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{filteredTemplates.length} templates found</span>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
          <p className="text-gray-600 mb-4">No templates match your criteria</p>
          <Button onClick={handleResetFilters} variant="outline">
            Reset Filters
          </Button>
        </div>
      ) : (
        // <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        //   {loading ? (
        //     <div className="text-center py-10">Loading templates...</div>
        //   ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-48 object-cover rounded-lg"
              />

              <h3 className="mt-3 font-semibold text-lg">{template.name}</h3>

              <button
                className="mt-3 w-full bg-[#FF5B04] text-white py-2 rounded-lg"
                onClick={() => handleEdit(template)}
              >
                Edit in Canva
              </button>
            </div>
          ))}
        </div>
        //   )}
        // </div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
            onClick={() => setPreviewTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#16232A]">
                    {previewTemplate.name}
                  </h3>
                  <p className="text-sm text-gray-600">Template Preview</p>
                </div>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div
                className={`h-[500px] bg-gradient-to-br ${gradients[templates.findIndex((t) => t.id === previewTemplate.id) % gradients.length]} flex items-center justify-center`}
              >
                <div className="text-white text-center">
                  <p className="text-2xl font-bold mb-2">Full Preview</p>
                  <p className="text-sm opacity-80">{previewTemplate.name}</p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <Button
                  onClick={() => setPreviewTemplate(null)}
                  variant="outline"
                >
                  Close
                </Button>
                <Button
                  onClick={() => handleUseTemplate(previewTemplate.id)}
                  className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                >
                  Use This Template
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
