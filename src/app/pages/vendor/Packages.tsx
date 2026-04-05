import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Check,
  ToggleLeft,
  ToggleRight,
  Package as PackageIcon,
  DollarSign,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import axios from "axios";
interface PackageItem {
  id: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  video: string;
  price: string;
  inclusions: string[];
  exclusions: string[];
  event_types: string[];
  status: "active" | "inactive";
  createdAt: string;
}

const CATEGORIES = [
  "Photography",
  "Catering",
  "Decoration",
  "Entertainment",
  "Venue",
  "Transportation",
];
const EVENT_TYPES = [
  "Wedding",
  "Corporate",
  "Birthday",
  "Anniversary",
  "Conference",
  "Exhibition",
  "Other",
];

export const Packages: React.FC = () => {
  const API_URL = "http://localhost:5000/api/vendor/packages";
  const getMediaUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("blob:")) return url;
    return `http://localhost:5000${url.replace(/\\/g, "/")}`;
  };

  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [subCategories, setSubCategories] = useState<any[]>([]);
  // const [eventTypes, setEventTypes] = useState<string[]>([]);

  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(
    null,
  );

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    status: "active" as "active" | "inactive",
  });
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");
  const [preview, setPreview] = useState<{
    type: "image" | "video";
    url: string;
  } | null>(null);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/category-list",
        );

        setCategories(res.data.data);
      } catch (err) {
        console.log("Category load error");
      }
    };

    fetchCategories();
  }, []);

  const selectedCategoryObj = categories.find(
    (c) => c.name === formData.category,
  );

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!selectedCategoryObj) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/api/admin/subcategories/category/${selectedCategoryObj.id}`,
        );

        setSubCategories(res.data.data);
      } catch (err) {
        console.log("Subcategory load error");
      }
    };

    fetchSubCategories();
  }, [formData.category]);

  const handleOpenModal = (mode: "add" | "edit", pkg?: PackageItem) => {
    setModalMode(mode);
    if (pkg) {
      setSelectedPackage(pkg);
      setFormData({
        name: pkg.name,
        category: pkg.category,
        description: pkg.description,
        price: pkg.price,
        status: pkg.status,
      });
      setInclusions(pkg.inclusions);
      setExclusions(pkg.exclusions);
      setEventTypes(pkg.event_types);
    } else {
      setSelectedPackage(null);
      setFormData({
        name: "",
        category: "",
        description: "",
        price: "",
        status: "active",
      });
      setInclusions([]);
      setExclusions([]);
      setEventTypes([]);
    }
    setNewInclusion("");
    setNewExclusion("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
    setFormData({
      name: "",
      category: "",
      description: "",
      price: "",
      status: "active",
    });
    setInclusions([]);
    setExclusions([]);
    setEventTypes([]);
    setNewInclusion("");
    setNewExclusion("");
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const form = new FormData();

      form.append("name", formData.name);
      form.append("category", formData.category);
      form.append("description", formData.description);
      form.append("price", formData.price);
      form.append("status", formData.status);

      form.append("inclusions", JSON.stringify(inclusions));
      form.append("exclusions", JSON.stringify(exclusions));
      form.append("eventTypes", JSON.stringify(eventTypes));

      images.forEach((file) => form.append("images", file));

      if (video) {
        form.append("video", video);
      }

      if (modalMode === "add") {
        const res = await axios.post(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPackages((prev) => [res.data.data, ...prev]);
      }

      if (modalMode === "edit" && selectedPackage) {
        await axios.put(`${API_URL}/${selectedPackage.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // optional: refetch OR update state
      }

      handleCloseModal();
    } catch (err) {
      console.log(err);
      alert("Save failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this package?")) return;

    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  const handleToggleStatus = async (id: string) => {
    const token = localStorage.getItem("token");
    const res = await axios.patch(
      `${API_URL}/${id}/status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setPackages(
      packages.map((pkg) =>
        pkg.id === id ? { ...pkg, status: res.data.status } : pkg,
      ),
    );
  };

  const addInclusion = () => {
    if (newInclusion.trim()) {
      setInclusions([...inclusions, newInclusion.trim()]);
      setNewInclusion("");
    }
  };

  const removeInclusion = (index: number) => {
    setInclusions(inclusions.filter((_, i) => i !== index));
  };

  const addExclusion = () => {
    if (newExclusion.trim()) {
      setExclusions([...exclusions, newExclusion.trim()]);
      setNewExclusion("");
    }
  };

  const removeExclusion = (index: number) => {
    setExclusions(exclusions.filter((_, i) => i !== index));
  };

  const toggleEventType = (eventType: string) => {
    if (eventTypes.includes(eventType)) {
      setEventTypes(eventTypes.filter((et) => et !== eventType));
    } else {
      setEventTypes([...eventTypes, eventType]);
    }
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPackages(res.data.data);
      } catch (err) {
        setError("Failed to load packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) return <p className="text-center">Loading packages...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#16232A]">Packages</h1>
          <p className="text-gray-600 mt-1">
            Create and manage your service packages
          </p>
        </div>
        <Button
          onClick={() => handleOpenModal("add")}
          className="bg-[#075056] hover:bg-[#075056]/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Package
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search packages..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Packages List */}
      {filteredPackages.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <PackageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#16232A] mb-2">
            No packages found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? "Try adjusting your search"
              : "Create your first package to offer to clients"}
          </p>
          {!searchTerm && (
            <Button
              onClick={() => handleOpenModal("add")}
              className="bg-[#075056] hover:bg-[#075056]/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-[#16232A]">
                      {pkg.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                        pkg.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {pkg.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-[#075056]/10 text-[#075056] rounded font-medium">
                      {pkg.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {pkg.price}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {/* Images */}
                    {Array.isArray(pkg.images) &&
                      pkg.images.length > 0 &&
                      pkg.images.map((img: string, i: number) => (
                        <img
                          key={i}
                          src={getMediaUrl(img)}
                          className="w-20 h-20 object-cover rounded cursor-pointer hover:scale-105 transition"
                          onClick={() =>
                            setPreview({
                              type: "image",
                              url: getMediaUrl(img),
                            })
                          }
                        />
                      ))}

                    {/* Video */}
                    {pkg.video && (
                      <video
                        src={getMediaUrl(pkg.video)}
                        className="w-32 h-20 object-cover rounded cursor-pointer"
                        onClick={() =>
                          setPreview({
                            type: "video",
                            url: getMediaUrl(pkg.video),
                          })
                        }
                      />
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenModal("edit", pkg)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleStatus(pkg.id)}
                  >
                    {pkg.status === "active" ? (
                      <ToggleRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ToggleLeft className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(pkg.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4">{pkg.description}</p>

              {/* Event Types */}
              {pkg.event_types.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    Applicable for:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(pkg.event_types)
                      ? pkg.event_types.map((eventType) => (
                          <span key={eventType}>{eventType}</span>
                        ))
                      : typeof pkg.event_types === "string"
                        ? JSON.parse(pkg.event_types).map(
                            (eventType: string) => (
                              <span key={eventType}>{eventType}</span>
                            ),
                          )
                        : null}
                  </div>
                </div>
              )}

              {/* Inclusions & Exclusions */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <h4 className="font-semibold text-[#16232A]">Inclusions</h4>
                    {pkg.inclusions.length > 0 && (
                      <span className="text-xs text-gray-500">
                        ({pkg.inclusions.length})
                      </span>
                    )}
                  </div>
                  {pkg.inclusions.length > 0 ? (
                    <ul className="space-y-2">
                      {pkg.inclusions.slice(0, 4).map((item, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600 flex items-start gap-2"
                        >
                          <Check className="h-3.5 w-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {pkg.inclusions.length > 4 && (
                        <li className="text-sm text-[#075056] font-medium">
                          +{pkg.inclusions.length - 4} more
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      No inclusions specified
                    </p>
                  )}
                </div>

                {/* Exclusions */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <h4 className="font-semibold text-[#16232A]">Exclusions</h4>
                    {pkg.exclusions.length > 0 && (
                      <span className="text-xs text-gray-500">
                        ({pkg.exclusions.length})
                      </span>
                    )}
                  </div>
                  {pkg.exclusions.length > 0 ? (
                    <ul className="space-y-2">
                      {pkg.exclusions.slice(0, 4).map((item, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600 flex items-start gap-2"
                        >
                          <X className="h-3.5 w-3.5 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {pkg.exclusions.length > 4 && (
                        <li className="text-sm text-[#075056] font-medium">
                          +{pkg.exclusions.length - 4} more
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      No exclusions specified
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#16232A]">
                {modalMode === "add" ? "Add New Package" : "Edit Package"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              {/* Basic Info */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Package Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Premium Wedding Photography"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-lg border border-gray-200"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Price *
                  </label>
                  <Input
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="e.g., ₹75,000"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe this package..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 resize-none"
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Photos (Max 4)
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#075056] transition">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    id="imageUpload"
                    onChange={(e) => {
                      if (e.target.files) {
                        const newFiles = Array.from(e.target.files);

                        setImages((prev) => {
                          const combined = [...prev, ...newFiles];

                          // limit 4 images
                          return combined.slice(0, 4);
                        });
                      }
                    }}
                  />

                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <p className="text-gray-600">Click to upload images</p>
                    <p className="text-xs text-gray-400">PNG, JPG (max 4)</p>
                  </label>
                </div>

                {/* IMAGE PREVIEW */}
                {images && images.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {images.map((file: File, index: number) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          className="w-20 h-20 object-cover rounded"
                        />

                        {/* REMOVE BUTTON */}
                        <button
                          onClick={() =>
                            setImages(images.filter((_, i) => i !== index))
                          }
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* VIDEO UPLOAD */}
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Video (1)
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#075056] transition">
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    id="videoUpload"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setVideo(e.target.files[0]);
                      }
                    }}
                  />

                  <label htmlFor="videoUpload" className="cursor-pointer">
                    <p className="text-gray-600">Click to upload video</p>
                    <p className="text-xs text-gray-400">MP4, max 20MB</p>
                  </label>
                </div>

                {/* VIDEO PREVIEW */}
                {video && (
                  <div className="mt-3 relative w-fit">
                    <video
                      src={URL.createObjectURL(video)}
                      className="w-40 rounded"
                    />

                    {/* REMOVE */}
                    <button
                      onClick={() => setVideo(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
              {/* Inclusions */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Inclusions
                </label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newInclusion}
                    onChange={(e) => setNewInclusion(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addInclusion())
                    }
                    placeholder="Add an inclusion..."
                  />
                  <Button
                    type="button"
                    onClick={addInclusion}
                    size="sm"
                    className="bg-[#075056] hover:bg-[#075056]/90"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {inclusions.length > 0 && (
                  <ul className="space-y-2">
                    {inclusions.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between gap-2 p-2 bg-green-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                        <button
                          onClick={() => removeInclusion(index)}
                          className="p-1 hover:bg-red-100 rounded text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Exclusions */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Exclusions
                </label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newExclusion}
                    onChange={(e) => setNewExclusion(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addExclusion())
                    }
                    placeholder="Add an exclusion..."
                  />
                  <Button
                    type="button"
                    onClick={addExclusion}
                    size="sm"
                    className="bg-[#075056] hover:bg-[#075056]/90"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {exclusions.length > 0 && (
                  <ul className="space-y-2">
                    {exclusions.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between gap-2 p-2 bg-red-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <X className="h-4 w-4 text-red-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                        <button
                          onClick={() => removeExclusion(index)}
                          className="p-1 hover:bg-red-100 rounded text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Event Types */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Applicable Event Types
                </label>

                <div className="flex flex-wrap gap-2">
                  {subCategories.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => toggleEventType(sub.name)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                        eventTypes.includes(sub.name)
                          ? "bg-[#075056] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Status
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={formData.status === "active"}
                      onChange={() =>
                        setFormData({ ...formData, status: "active" })
                      }
                      className="w-4 h-4 text-[#075056]"
                    />
                    <span className="text-sm">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={formData.status === "inactive"}
                      onChange={() =>
                        setFormData({ ...formData, status: "inactive" })
                      }
                      className="w-4 h-4 text-gray-400"
                    />
                    <span className="text-sm">Inactive</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                disabled={
                  !formData.name ||
                  !formData.category ||
                  !formData.price ||
                  !formData.description
                }
              >
                <Check className="h-4 w-4 mr-2" />
                {modalMode === "add" ? "Add Package" : "Save Changes"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <button
            onClick={() => setPreview(null)}
            className="absolute top-5 right-5 text-white text-2xl"
          >
            ✕
          </button>

          {preview.type === "image" ? (
            <img
              src={preview.url}
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
            />
          ) : (
            <video
              src={preview.url}
              controls
              autoPlay
              className="max-w-[90%] max-h-[90%] rounded-lg"
            />
          )}
        </div>
      )}
    </div>
  );
};
