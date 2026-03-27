import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { Star, MapPin, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router";

export const VendorsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const isLoggedIn = !!localStorage.getItem("token");

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

  // ✅ Fetch Vendors (Category Based)
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        let url = `http://localhost:5000/api/vendors`;

        if (activeCategory !== "All") {
          url += `?category=${encodeURIComponent(
            activeCategory.toLowerCase(),
          )}`;
        }

        const res = await axios.get(url);
        setVendors(res.data.data);
      } catch {
        console.log("Vendor load error");
      }
    };

    fetchVendors();
  }, [activeCategory]);

  // ✅ Reset Load More on category change
  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);

  // reset load more on category change
  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);

  const filtered =
    activeCategory === "All"
      ? vendors
      : vendors.filter((v) => v.category === activeCategory);

  const displayed = showAll ? vendors : vendors.slice(0, 6);

  return (
    <section id="vendors" className="py-24 bg-[#E4EEF0]/20">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-sm font-semibold text-[#FF5B04] uppercase tracking-wider mb-2">
            Marketplace
          </p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#16232A]">
              Top-Rated Vendors <span className="text-[#FF5B04]">Near You</span>
            </h2>
            <Link
              to={isLoggedIn ? "/customer/global-vendors" : "/login"}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#075056] hover:text-[#075056]/80 transition-colors"
            >
              View All Vendors
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.name);
                setShowAll(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.name
                  ? "bg-[#FF5B04] text-white shadow-md shadow-[#FF5B04]/30"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#FF5B04]/40 hover:text-[#FF5B04]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Vendors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((vendor, i) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-[#FF5B04]/20 group hover:-translate-y-1 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`http://localhost:5000${vendor.image}`}
                  alt={vendor.businessName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Badge */}
                <span
                  className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: vendor.badgeColor }}
                >
                  {vendor.badge}
                </span>
                {/* Category */}
                <span className="absolute bottom-3 left-3 text-xs font-medium px-2 py-0.5 bg-white/90 rounded-full text-[#16232A]">
                  {vendor.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-[#16232A] mb-1.5">
                  {vendor.businessName}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                  <MapPin className="h-3 w-3" />
                  <span>{vendor.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-[#FF5B04] fill-[#FF5B04]" />
                    <span className="text-sm font-bold text-[#16232A]">
                      {vendor.rating}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({vendor.reviews} reviews)
                    </span>
                  </div>
                  <div className="text-sm font-bold text-[#075056]">
                    Starting {vendor.price}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={
                      isLoggedIn ? `/customer/vendors/${vendor.id}` : "/login"
                    }
                    className="flex-1 py-2 text-center text-sm font-medium border-2 border-[#16232A] text-[#16232A] rounded-lg hover:bg-[#16232A] hover:text-white transition-all"
                  >
                    View Profile
                  </Link>
                  <Link
                    to={isLoggedIn ? "/customer/events" : "/login"}
                    className="flex-1 py-2 text-center text-sm font-semibold bg-[#FF5B04] text-white rounded-lg hover:bg-[#FF5B04]/90 transition-all"
                  >
                    Add to Event
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {!showAll && filtered.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#16232A] text-[#16232A] font-semibold rounded-xl hover:bg-[#16232A] hover:text-white transition-all"
            >
              Load More Vendors
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            No vendors found for this category.{" "}
            <Link
              to="/customer/global-vendors"
              className="text-[#FF5B04] underline"
            >
              Browse all
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
