import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import { Calendar, Save } from "lucide-react";
import { Button } from "../../components/ui/button";

export const VendorAvailability: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const vendorId = user.id;

  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [bookedDates, setBookedDates] = useState<any[]>([]);
  const [serviceRadius, setServiceRadius] = useState("");
  const [workingHours, setWorkingHours] = useState("");

  const [currentMonth, setCurrentMonth] = useState(new Date());

  /*
----------------------------
FETCH AVAILABILITY DATA
----------------------------
*/

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/vendor/availability/${vendorId}`,
    );

    const blocked = res.data.blockedDates.map((d: any) => d.blockedDate);

    setBlockedDates(blocked);

    setBookedDates(res.data.bookedEvents);

    if (res.data.settings) {
      setServiceRadius(res.data.settings.serviceRadius);
      setWorkingHours(res.data.settings.workingHours);
    }
  };

  /*
----------------------------
BLOCK / UNBLOCK DATE
----------------------------
*/

  const toggleDate = async (dateStr: string) => {
    if (blockedDates.includes(dateStr)) {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/vendor/availability/unblock-date`,
        {
          vendorId,
          date: dateStr,
        },
      );

      setBlockedDates((prev) => prev.filter((d) => d !== dateStr));
    } else {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/vendor/availability/block-date`,
        {
          vendorId,
          date: dateStr,
        },
      );

      setBlockedDates((prev) => [...prev, dateStr]);
    }
  };

  /*
----------------------------
SAVE SETTINGS
----------------------------
*/

  const saveSettings = async () => {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/vendor/availability/settings`, {
      vendorId,
      serviceRadius,
      workingHours,
    });

    alert("Availability saved");

    // ⭐ reload values from DB
    fetchAvailability();
  };

  /*
----------------------------
CALENDAR DATA
----------------------------
*/

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#16232A] mb-2">Availability Calendar</h1>
        <p className="text-[#16232A]/70">Manage your availability</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CALENDAR */}

        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#16232A]">{monthName}</h2>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
              >
                Next
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-[#16232A]/70 p-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const dateStr = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

              const isBooked = bookedDates.some((d: any) => d.date === dateStr);

              const isBlocked = blockedDates.includes(dateStr);

              return (
                <button
                  key={day}
                  onClick={() => toggleDate(dateStr)}
                  className={`aspect-square p-2 rounded-lg text-sm font-medium transition-colors

${
  isBooked
    ? "bg-[#075056] text-white"
    : isBlocked
      ? "bg-red-50 text-red-700"
      : "bg-gray-50 text-[#16232A] hover:bg-gray-100"
}

`}
                >
                  {day}
                </button>
              );
            })}
          </div>
          {/* Calendar Legend */}
          <div className="flex items-center gap-6 text-sm mt-6">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-[#075056] rounded" />
              <span className="text-[#16232A]/70">Booked</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-red-50 border border-red-200 rounded" />
              <span className="text-[#16232A]/70">Blocked</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-50 border border-gray-200 rounded" />
              <span className="text-[#16232A]/70">Available</span>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}

        <div className="space-y-6">
          {/* UPCOMING BOOKINGS */}

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-[#16232A] mb-4">
              Upcoming Events
            </h3>

            <div className="space-y-3">
              {bookedDates.map((booking: any) => (
                <div key={booking.date} className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-blue-600" />

                    <span className="text-sm font-medium text-[#16232A]">
                      {new Date(booking.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>

                  <p className="text-sm text-[#16232A]/70">
                    {booking.eventName}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SETTINGS */}

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-[#16232A] mb-4">Radius</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-[#16232A]/70 mb-2">
                  Service Radius
                </label>

                <input
                  value={serviceRadius}
                  onChange={(e) => setServiceRadius(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>

              {/* <div>
                <label className="block text-sm text-[#16232A]/70 mb-2">
                  Default Hours
                </label>

                <input
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div> */}
            </div>
          </div>

          <Button
            onClick={saveSettings}
            className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white gap-2"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
