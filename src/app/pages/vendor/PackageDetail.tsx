import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type PackageType = {
  id: number;
  name: string;
  description: string;
  price: string;
  images: string[];
  inclusions: string[];
  exclusions: string[];
  event_types: string[];
  vendor?: {
    ownerName: string;
    email: string;
    phone: string;
  };
};

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [pkg, setPkg] = useState<PackageType | null>(null);
  const [selectedImg, setSelectedImg] = useState("");

  const safeParse = (data: any): string[] => {
    if (Array.isArray(data)) return data;
    try {
      return JSON.parse(data || "[]");
    } catch {
      return [];
    }
  };

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/packages/${id}`)
      .then((res) => {
        const d = res.data.data;

        const parsed: PackageType = {
          ...d,
          images: safeParse(d.images),
          inclusions: safeParse(d.inclusions),
          exclusions: safeParse(d.exclusions),
          event_types: safeParse(d.event_types),
        };

        setPkg(parsed);
        setSelectedImg(parsed.images[0] || "");
      })
      .catch(console.error);
  }, [id]);

  if (!pkg) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* IMAGE */}
        <div className="bg-white rounded-xl shadow p-4">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}${selectedImg}`}
            className="w-full h-[420px] object-cover rounded-lg"
          />

          <div className="flex gap-3 mt-4 overflow-x-auto">
            {pkg.images.map((img, i) => (
              <img
                key={i}
                src={`${import.meta.env.VITE_API_BASE_URL}${img}`}
                onClick={() => setSelectedImg(img)}
                className={`w-24 h-20 object-cover rounded cursor-pointer border ${
                  selectedImg === img ? "border-black" : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="bg-white rounded-xl shadow p-6">

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {pkg.name}
          </h1>

          <p className="text-green-600 text-xl font-semibold mb-4">
            ₹{pkg.price}
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {pkg.description}
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-6">
            {pkg.event_types.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* INCLUSIONS */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Inclusions</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {pkg.inclusions.length ? (
                pkg.inclusions.map((i, idx) => <li key={idx}>{i}</li>)
              ) : (
                <p className="text-gray-400">No inclusions</p>
              )}
            </ul>
          </div>

          {/* EXCLUSIONS */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Exclusions</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {pkg.exclusions.length ? (
                pkg.exclusions.map((i, idx) => <li key={idx}>{i}</li>)
              ) : (
                <p className="text-gray-400">No exclusions</p>
              )}
            </ul>
          </div>

          {/* VENDOR */}
          <div className="mt-8 border-t pt-4">
            <h3 className="font-semibold mb-2 text-gray-700">
              Vendor Details
            </h3>

            <p className="font-medium">{pkg.vendor?.ownerName}</p>
            <p className="text-sm text-gray-500">{pkg.vendor?.email}</p>
            <p className="text-sm text-gray-500">{pkg.vendor?.phone}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PackageDetail;