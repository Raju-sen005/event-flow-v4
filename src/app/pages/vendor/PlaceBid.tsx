import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams, Link } from "react-router";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useLocation } from "react-router";
import {
  ArrowLeft,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Plus,
  X,
  Upload,
  AlertCircle,
} from "lucide-react";
import { Button } from "../../components/ui/button";
// import React, { useRef } from "react";

interface BidFormData {
  price: string;
  packageName: string;
  description: string;
  timeline: string;
  addons: string;
  notes: string;
}

export const PlaceBid: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BidFormData>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // const requirementId = searchParams.get('requirement');
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<BidFormData>();
  const [portfolioSamples, setPortfolioSamples] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const requirementId = id;
  // Mock requirement data
  const [requirement, setRequirement] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isEditMode = location.pathname.includes("edit");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/vendor/packages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setPackages(res.data.data);
      } catch (error) {
        console.error("Package fetch error", error);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchBid = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/bids/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const bid = res.data.data;

        setRequirement(bid.Event);

        setValue("price", bid.price);
        setValue("packageName", bid.package_name);
        setValue("description", bid.description);
        setValue("timeline", bid.timeline);
        setValue("addons", bid.addons);
        setValue("notes", bid.notes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBid();
  }, [id]);

  useEffect(() => {
    const fetchRequirement = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/events/vendor/${requirementId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setRequirement(res.data.data);
      } catch (err) {
        console.error("Fetch event error", err);
      } finally {
        setLoading(false);
      }
    };

    if (!isEditMode && requirementId) fetchRequirement();
  }, [requirementId]);

  // const onSubmit = async (data: BidFormData) => {
  //   try {
  //     setIsSubmitting(true);

  //     const token = localStorage.getItem("token");

  //     if (isEditMode) {
  //       await axios.put(
  //         `https://gogatherhub.com:5000/api/bids/${id}`,
  //         {
  //           price: data.price,
  //           packageName: data.packageName,
  //           description: data.description,
  //           timeline: data.timeline,
  //           addons: data.addons,
  //           notes: data.notes,
  //           portfolioSamples,
  //         },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         },
  //       );

  //       alert("Bid updated successfully");
  //     } else {
  //       await axios.post(
  //         "https://gogatherhub.com:5000/api/bids",
  //         {
  //           event_id: requirementId,
  //           price: data.price,
  //           packageName: data.packageName,
  //           description: data.description,
  //           timeline: data.timeline,
  //           addons: data.addons,
  //           notes: data.notes,
  //           portfolioSamples,
  //         },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         },
  //       );

  //       alert("Bid submitted successfully");
  //     }

  //     navigate("/vendor/bids");
  //   } catch (error) {
  //     console.error("Bid error", error);
  //     alert("Failed to submit bid");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // const handleAddSample = () => {
  //   setPortfolioSamples([
  //     ...portfolioSamples,
  //     `sample-${portfolioSamples.length + 1}`,
  //   ]);
  // };

  const onSubmit = async (data: BidFormData) => {
    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("event_id", requirementId || "");
      formData.append("price", data.price);
      formData.append("package_name", data.packageName);
      formData.append("description", data.description);
      formData.append("timeline", data.timeline);
      formData.append("addons", data.addons);
      formData.append("notes", data.notes);

      portfolioSamples.forEach((file) => {
        formData.append("portfolioSamples", file);
      });

      if (isEditMode) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/bids/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Bid updated successfully");
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/bids`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Bid submitted successfully");
      }

      navigate("/vendor/bids");
    } catch (error) {
      console.error("Bid error", error);
      alert("Failed to submit bid");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);

    setPortfolioSamples((prev) => [...prev, ...newFiles]);

    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const handleRemoveSample = (index: number) => {
    setPortfolioSamples((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Link
        to={`/vendor/requirements/${requirementId}`}
        className="inline-flex items-center gap-2 text-[#075056] hover:text-[#075056]/80 font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Requirement
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-[#16232A] mb-2">
          {isEditMode ? "Edit Your Bid" : "Place Your Bid"}
        </h1>
        <p className="text-[#16232A]/70">
          Submit your proposal for this event opportunity
        </p>
      </div>

      {/* Requirement Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-6"
      >
        <h3 className="font-semibold text-[#16232A] mb-2">
          {requirement?.name}
        </h3>
        <p className="text-sm text-[#16232A]/70 mb-3">
          {requirement?.eventName}
        </p>
        <div className="flex items-center gap-6 text-sm">
          <span className="text-[#16232A]/70">
            Event Date:{" "}
            <span className="font-medium text-[#16232A]">
              {requirement?.date
                ? new Date(requirement.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </span>
          </span>
          <span className="text-[#16232A]/70">
            Budget:{" "}
            <span className="font-medium text-[#075056]">
              ₹{requirement?.budget?.toLocaleString("en-IN") || "Not specified"}
            </span>
          </span>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="h-5 w-5 text-[#075056]" />
            <h2 className="text-[#16232A]">Pricing</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Your Quote Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#16232A]/50">
                  ₹
                </span>
                <input
                  type="number"
                  {...register("price", { required: "Price is required" })}
                  placeholder="Enter your price"
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                />
              </div>
              {errors.price && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.price.message}
                </p>
              )}
              <p className="text-xs text-[#16232A]/50 mt-1">
                Customer's budget range: ₹
                {requirement?.budget?.toLocaleString("en-IN") ||
                  "Not specified"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Package Name *
              </label>
              <select
                {...register("packageName", {
                  required: "Package is required",
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
              >
                <option value="">Select your package</option>

                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.name}>
                    {pkg.name}
                    {/* - ₹{pkg.price} */}
                  </option>
                ))}
              </select>

              {errors.packageName && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.packageName.message}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Package Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-[#075056]" />
            <h2 className="text-[#16232A]">Package Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Package Description *
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows={6}
                placeholder="Describe what's included in your package..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056] resize-none"
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Timeline & Availability *
              </label>
              <textarea
                {...register("timeline", { required: "Timeline is required" })}
                rows={3}
                placeholder="e.g., Available for all 3 days, Delivery within 30 days..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056] resize-none"
              />
              {errors.timeline && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.timeline.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Add-ons / Optional Services
              </label>
              <textarea
                {...register("addons")}
                rows={3}
                placeholder="List any additional services available at extra cost..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056] resize-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Portfolio Samples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon className="h-5 w-5 text-[#075056]" />
            <h2 className="text-[#16232A]">Portfolio Samples</h2>
          </div>

          <div className="mb-4">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <label htmlFor="portfolioUpload">
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4" />
                Upload Sample Work
              </Button>
            </label>
            <p className="text-xs text-[#16232A]/50 mt-2">
              Add relevant samples from your previous work (Images, videos, or
              links)
            </p>
          </div>

          {portfolioSamples.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {portfolioSamples.map((file, index) => {
                const previewUrl = URL.createObjectURL(file);
                const isImage = file.type.startsWith("image");
                const isVideo = file.type.startsWith("video");

                return (
                  <div
                    key={index}
                    className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
                  >
                    {isImage && (
                      <img
                        src={previewUrl}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    )}

                    {isVideo && (
                      <video
                        src={previewUrl}
                        className="w-full h-full object-cover"
                        controls
                      />
                    )}

                    {/* File name */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                      {file.name}
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveSample(index)}
                      className="absolute top-2 right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Additional Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h2 className="text-[#16232A] mb-4">Additional Notes</h2>
          <textarea
            {...register("notes")}
            rows={4}
            placeholder="Any additional information for the customer..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056] resize-none"
          />
        </motion.div>

        {/* Terms Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-[#16232A] font-medium mb-1">
                Important Notice
              </p>
              <p className="text-sm text-[#16232A]/70">
                By submitting this bid, you agree to deliver the services as
                described. Once awarded, you'll need to sign a formal agreement
                with the customer.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/vendor/requirements")}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
          >
            {isSubmitting
              ? "Submitting..."
              : isEditMode
                ? "Update Bid"
                : "Submit Bid"}
          </Button>
        </div>
      </form>
    </div>
  );
};
