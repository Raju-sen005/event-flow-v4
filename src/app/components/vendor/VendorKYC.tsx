import React, { useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import { useEffect } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  Edit,
  Save,
  Building,
  CreditCard,
  MapPin,
  IdCard,
  Shield,
} from "lucide-react";
import { Button } from "../ui/button";

interface ImportMetaEnv {
  VITE_API_BASE_URL: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export type KYCStatus =
  | "not_submitted"
  | "under_review"
  | "verified"
  | "rejected";

interface KYCDocument {
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  fileUrl?: string;
}

interface KYCData {
  status: KYCStatus;
  rejectionReason?: string;
  rejectionComment?: string;
  submittedAt?: string;
  verifiedAt?: string;

  // Identity Proof
  identityProofType: "aadhaar" | "pan" | "";
  identityFront: KYCDocument | null;
  identityBack: KYCDocument | null;

  // Business Proof
  businessProofType: "gst" | "shop_act" | "trade_license" | "";
  businessProof: KYCDocument | null;

  // Bank Details
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  bankProof: KYCDocument | null;

  // Address Proof
  addressProofType: "utility_bill" | "rental_agreement" | "other" | "";
  addressProof: KYCDocument | null;
}

interface VendorKYCProps {
  initialData?: Partial<KYCData>;
  onSubmit?: (data: KYCData) => void;
  onSaveDraft?: (data: KYCData) => void;
}

export const VendorKYC: React.FC<VendorKYCProps> = ({
  initialData,
  onSubmit,
  onSaveDraft,
}) => {
  const [kycData, setKycData] = useState<KYCData>({
    status: initialData?.status || "not_submitted",
    rejectionReason: initialData?.rejectionReason,
    rejectionComment: initialData?.rejectionComment,
    submittedAt: initialData?.submittedAt,
    verifiedAt: initialData?.verifiedAt,

    identityProofType: initialData?.identityProofType || "",
    identityFront: initialData?.identityFront || null,
    identityBack: initialData?.identityBack || null,

    businessProofType: initialData?.businessProofType || "",
    businessProof: initialData?.businessProof || null,

    accountHolderName: initialData?.accountHolderName || "",
    bankName: initialData?.bankName || "",
    accountNumber: initialData?.accountNumber || "",
    ifscCode: initialData?.ifscCode || "",
    bankProof: initialData?.bankProof || null,

    addressProofType: initialData?.addressProofType || "",
    addressProof: initialData?.addressProof || null,
  });

  const API = import.meta.env.VITE_API_BASE_URL || "";

  const [fileStore, setFileStore] = useState<any>({});
  const [isEditing, setIsEditing] = useState(
    kycData.status === "not_submitted" || kycData.status === "rejected",
  );

  const isReadOnly =
    kycData?.status === "under_review" || kycData?.status === "verified";

  const handleFileUpload = (
    field: keyof KYCData,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setFileStore((prev: any) => ({
        ...prev,
        [field]: file,
      }));

      const doc: KYCDocument = {
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
        uploadedAt: new Date().toISOString(),
        fileUrl: URL.createObjectURL(file),
      };

      setKycData({ ...kycData, [field]: doc });
    }
  };

  useEffect(() => {
    const fetchKYC = async () => {
      try {
        const res = await axios.get(`${API}/vendor/kyc`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data) {
          setKycData(res.data);
        }
      } catch (error) {
        console.log("No existing KYC");
      }
    };

    if (API) fetchKYC();
  }, [API]);

  const handleInputChange = (field: keyof KYCData, value: string) => {
    setKycData({ ...kycData, [field]: value });
  };

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft(kycData);
    }
    alert("Draft saved successfully!");
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // Text fields
      formData.append("identityProofType", kycData.identityProofType);
      formData.append("businessProofType", kycData.businessProofType);
      formData.append("accountHolderName", kycData.accountHolderName);
      formData.append("bankName", kycData.bankName);
      formData.append("accountNumber", kycData.accountNumber);
      formData.append("ifscCode", kycData.ifscCode);
      formData.append("addressProofType", kycData.addressProofType);

      // File fields
      Object.keys(fileStore).forEach((key) => {
        formData.append(key, fileStore[key]);
      });

      const res = await axios.post(`${API}/vendor/kyc/submit`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("KYC Submitted Successfully");
      setKycData(res.data.kyc);
    } catch (error: any) {
      alert(error.response?.data?.error || "Submission failed");
    }
  };

  const handleEnableEdit = () => {
    setIsEditing(true);
  };

  const getStatusBadge = () => {
    switch (kycData.status) {
      case "not_submitted":
        return (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
            <AlertCircle className="h-5 w-5" />
            <span className="font-semibold">Not Submitted</span>
          </div>
        );
      case "under_review":
        return (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
            <Clock className="h-5 w-5" />
            <span className="font-semibold">Under Review</span>
          </div>
        );
      case "verified":
        return (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">Verified</span>
          </div>
        );
      case "rejected":
        return (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full">
            <XCircle className="h-5 w-5" />
            <span className="font-semibold">Rejected</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* KYC Status Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-6 w-6 text-[#FF5B04]" />
              <h2 className="text-xl font-bold text-[#16232A]">
                KYC Verification Status
              </h2>
            </div>
            <p className="text-gray-600 text-sm">
              Complete your KYC to unlock bidding and withdrawal features
            </p>
          </div>
          {getStatusBadge()}
        </div>

        {kycData.status === "rejected" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-1">
                  KYC Rejected
                </h3>
                <p className="text-sm text-red-800 mb-2">
                  <strong>Reason:</strong>{" "}
                  {kycData.rejectionReason || "Document verification failed"}
                </p>
                {kycData.rejectionComment && (
                  <p className="text-sm text-red-700">
                    <strong>Admin Comment:</strong> {kycData.rejectionComment}
                  </p>
                )}
                <Button
                  onClick={handleEnableEdit}
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white"
                  size="sm"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit & Resubmit KYC
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {kycData.status === "under_review" && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Your KYC documents are under review. You will be notified once the
              verification is complete.
            </p>
            {kycData.submittedAt && (
              <p className="text-xs text-blue-600 mt-2">
                Submitted on{" "}
                {new Date(kycData.submittedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>
        )}

        {kycData.status === "verified" && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-sm text-green-800 font-semibold">
                Your KYC is verified! You can now bid on events and manage
                withdrawals.
              </p>
            </div>
            {kycData.verifiedAt && (
              <p className="text-xs text-green-600 mt-2">
                Verified on{" "}
                {new Date(kycData.verifiedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        )}
      </div>

      {/* KYC Form Sections */}
      <div className="space-y-6">
        {/* 1. Identity Proof */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#FF5B04]/10 rounded-lg">
              <IdCard className="h-5 w-5 text-[#FF5B04]" />
            </div>
            <div>
              <h3 className="font-bold text-[#16232A]">1. Identity Proof</h3>
              <p className="text-sm text-gray-600">
                Upload Aadhaar or PAN card (Front & Back)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Document Type
              </label>
              <select
                value={kycData.identityProofType}
                onChange={(e) =>
                  handleInputChange("identityProofType", e.target.value)
                }
                disabled={isReadOnly}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select document type</option>
                <option value="aadhaar">Aadhaar Card</option>
                <option value="pan">PAN Card</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Front Side
                </label>
                {kycData.identityFront ? (
                  <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {kycData.identityFront.fileName}
                          </p>
                          <p className="text-xs text-gray-600">
                            {kycData.identityFront.fileSize}
                          </p>
                        </div>
                      </div>
                      {!isReadOnly && (
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                              handleFileUpload("identityFront", e)
                            }
                            className="hidden"
                          />
                          <Edit className="h-4 w-4 text-gray-600 hover:text-[#FF5B04]" />
                        </label>
                      )}
                    </div>
                  </div>
                ) : (
                  <label
                    className={`block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${!isReadOnly ? "cursor-pointer hover:border-[#FF5B04] transition-colors" : "cursor-not-allowed opacity-50"}`}
                  >
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload("identityFront", e)}
                      disabled={isReadOnly}
                      className="hidden"
                    />
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload front side</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Image or PDF, max 5MB
                    </p>
                  </label>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Back Side
                </label>
                {kycData.identityBack ? (
                  <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {kycData.identityBack.fileName}
                          </p>
                          <p className="text-xs text-gray-600">
                            {kycData.identityBack.fileSize}
                          </p>
                        </div>
                      </div>
                      {!isReadOnly && (
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                              handleFileUpload("identityBack", e)
                            }
                            className="hidden"
                          />
                          <Edit className="h-4 w-4 text-gray-600 hover:text-[#FF5B04]" />
                        </label>
                      )}
                    </div>
                  </div>
                ) : (
                  <label
                    className={`block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${!isReadOnly ? "cursor-pointer hover:border-[#FF5B04] transition-colors" : "cursor-not-allowed opacity-50"}`}
                  >
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload("identityBack", e)}
                      disabled={isReadOnly}
                      className="hidden"
                    />
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload back side</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Image or PDF, max 5MB
                    </p>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Business Proof */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-[#16232A]">2. Business Proof</h3>
              <p className="text-sm text-gray-600">
                Upload GST Certificate, Shop Act, or Trade License
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Document Type
              </label>
              <select
                value={kycData.businessProofType}
                onChange={(e) =>
                  handleInputChange("businessProofType", e.target.value)
                }
                disabled={isReadOnly}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select document type</option>
                <option value="gst">GST Certificate</option>
                <option value="shop_act">Shop Act License</option>
                <option value="trade_license">Trade License</option>
              </select>
            </div>

            {kycData.businessProof ? (
              <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {kycData.businessProof.fileName}
                      </p>
                      <p className="text-xs text-gray-600">
                        {kycData.businessProof.fileSize}
                      </p>
                    </div>
                  </div>
                  {!isReadOnly && (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload("businessProof", e)}
                        className="hidden"
                      />
                      <Edit className="h-4 w-4 text-gray-600 hover:text-[#FF5B04]" />
                    </label>
                  )}
                </div>
              </div>
            ) : (
              <label
                className={`block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${!isReadOnly ? "cursor-pointer hover:border-[#FF5B04] transition-colors" : "cursor-not-allowed opacity-50"}`}
              >
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload("businessProof", e)}
                  disabled={isReadOnly}
                  className="hidden"
                />
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload business proof</p>
                <p className="text-xs text-gray-500 mt-1">
                  Image or PDF, max 5MB
                </p>
              </label>
            )}
          </div>
        </div>

        {/* 3. Bank Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CreditCard className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-[#16232A]">3. Bank Details</h3>
              <p className="text-sm text-gray-600">
                Provide account details for payments
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={kycData.accountHolderName}
                  onChange={(e) =>
                    handleInputChange("accountHolderName", e.target.value)
                  }
                  disabled={isReadOnly}
                  placeholder="As per bank records"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={kycData.bankName}
                  onChange={(e) =>
                    handleInputChange("bankName", e.target.value)
                  }
                  disabled={isReadOnly}
                  placeholder="e.g., State Bank of India"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  value={kycData.accountNumber}
                  onChange={(e) =>
                    handleInputChange("accountNumber", e.target.value)
                  }
                  disabled={isReadOnly}
                  placeholder="Enter account number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={kycData.ifscCode}
                  onChange={(e) =>
                    handleInputChange("ifscCode", e.target.value.toUpperCase())
                  }
                  disabled={isReadOnly}
                  placeholder="e.g., SBIN0001234"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cancelled Cheque / Bank Proof
              </label>
              {kycData.bankProof ? (
                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {kycData.bankProof.fileName}
                        </p>
                        <p className="text-xs text-gray-600">
                          {kycData.bankProof.fileSize}
                        </p>
                      </div>
                    </div>
                    {!isReadOnly && (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload("bankProof", e)}
                          className="hidden"
                        />
                        <Edit className="h-4 w-4 text-gray-600 hover:text-[#FF5B04]" />
                      </label>
                    )}
                  </div>
                </div>
              ) : (
                <label
                  className={`block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${!isReadOnly ? "cursor-pointer hover:border-[#FF5B04] transition-colors" : "cursor-not-allowed opacity-50"}`}
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload("bankProof", e)}
                    disabled={isReadOnly}
                    className="hidden"
                  />
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Upload cancelled cheque or bank statement
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Image or PDF, max 5MB
                  </p>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* 4. Address Proof */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-[#16232A]">4. Address Proof</h3>
              <p className="text-sm text-gray-600">
                Upload utility bill, rental agreement, or official document
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Document Type
              </label>
              <select
                value={kycData.addressProofType}
                onChange={(e) =>
                  handleInputChange("addressProofType", e.target.value)
                }
                disabled={isReadOnly}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select document type</option>
                <option value="utility_bill">
                  Utility Bill (Electricity/Water/Gas)
                </option>
                <option value="rental_agreement">Rental Agreement</option>
                <option value="other">Other Official Document</option>
              </select>
            </div>

            {kycData.addressProof ? (
              <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {kycData.addressProof.fileName}
                      </p>
                      <p className="text-xs text-gray-600">
                        {kycData.addressProof.fileSize}
                      </p>
                    </div>
                  </div>
                  {!isReadOnly && (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload("addressProof", e)}
                        className="hidden"
                      />
                      <Edit className="h-4 w-4 text-gray-600 hover:text-[#FF5B04]" />
                    </label>
                  )}
                </div>
              </div>
            ) : (
              <label
                className={`block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${!isReadOnly ? "cursor-pointer hover:border-[#FF5B04] transition-colors" : "cursor-not-allowed opacity-50"}`}
              >
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload("addressProof", e)}
                  disabled={isReadOnly}
                  className="hidden"
                />
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload address proof</p>
                <p className="text-xs text-gray-500 mt-1">
                  Image or PDF, max 5MB
                </p>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {!isReadOnly && (
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="border-gray-300"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Submit for Verification
          </Button>
        </div>
      )}
    </div>
  );
};
