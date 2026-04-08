import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { Bell, Lock, Globe, User, LogOut, Save } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export const VendorSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const vendorId = user.id;

  const [notifications, setNotifications] = useState({
    requirement: true,
    bids: true,
    messages: true,
    reminders: true,
    payments: true,
    urgent: true,
    agreements: true,
    pushMessages: true,
  });

  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("IST");
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/vendor/settings/${vendorId}`,
      );

      const data = res.data || {};

      setNotifications({
        requirement: data.emailRequirement ?? true,
        bids: data.emailBidUpdates ?? true,
        messages: data.emailMessages ?? true,
        reminders: data.emailReminders ?? true,
        payments: data.emailPayments ?? true,
        urgent: data.pushUrgentUpdates ?? true,
        agreements: data.pushAgreement ?? true,
        pushMessages: data.pushMessages ?? true,
      });

      setLanguage(data.language || "English");
      setTimezone(data.timezone || "IST");
    } catch (err) {
      console.error(err);
    }
  };

  const saveNotifications = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/vendor/settings/notifications`,
        {
          vendorId,
          data: {
            emailRequirement: notifications.requirement,
            emailBidUpdates: notifications.bids,
            emailMessages: notifications.messages,
            emailReminders: notifications.reminders,
            emailPayments: notifications.payments,
            pushUrgentUpdates: notifications.urgent,
            pushAgreement: notifications.agreements,
            pushMessages: notifications.pushMessages,
          },
        },
      );

      alert("Preferences saved");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    }
  };

  const savePreferences = async () => {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/vendor/settings/preferences`, {
      vendorId,
      language,
      timezone,
    });

    alert("Preferences updated");
  };

  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/vendor/settings/password`, {
      userId: vendorId,
      currentPassword,
      newPassword,
    });

    alert("Password updated");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#16232A] mb-2">Settings</h1>
        <p className="text-[#16232A]/70">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {[
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "security", label: "Security", icon: Lock },
              { id: "preferences", label: "Preferences", icon: Globe },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#075056] text-[#075056]"
                    : "border-transparent text-[#16232A]/70 hover:text-[#16232A]"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[#16232A] mb-4">
                  Email Notifications
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-sm text-[#16232A]">
                      New requirement matching your profile
                    </span>

                    <input
                      type="checkbox"
                      checked={notifications.requirement}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          requirement: e.target.checked,
                        })
                      }
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-sm text-[#16232A]">
                      Bid status updates
                    </span>

                    <input
                      type="checkbox"
                      checked={notifications.bids}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          bids: e.target.checked,
                        })
                      }
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-sm text-[#16232A]">
                      New messages from customers
                    </span>

                    <input
                      type="checkbox"
                      checked={notifications.messages}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          messages: e.target.checked,
                        })
                      }
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-sm text-[#16232A]">
                      Event reminders
                    </span>

                    <input
                      type="checkbox"
                      checked={notifications.reminders}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          reminders: e.target.checked,
                        })
                      }
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-sm text-[#16232A]">
                      Payment confirmations
                    </span>

                    <input
                      type="checkbox"
                      checked={notifications.payments}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          payments: e.target.checked,
                        })
                      }
                    />
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[#16232A] mb-4">
                  Push Notifications
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-sm text-[#16232A]">
                      Urgent event updates
                    </span>

                    <input
                      type="checkbox"
                      checked={notifications.urgent}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          urgent: e.target.checked,
                        })
                      }
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-sm text-[#16232A]">
                      Agreement signatures required
                    </span>

                    <input
                      type="checkbox"
                      checked={notifications.agreements}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          agreements: e.target.checked,
                        })
                      }
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-sm text-[#16232A]">
                      Customer messages
                    </span>

                    <input
                      type="checkbox"
                      checked={notifications.pushMessages}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          pushMessages: e.target.checked,
                        })
                      }
                    />
                  </label>
                </div>
              </div>

              <Button
                onClick={saveNotifications}
                className="bg-[#075056] hover:bg-[#075056]/90 text-white gap-2"
              >
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[#16232A] mb-4">
                  Change Password
                </h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-[#16232A] mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#16232A] mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#16232A] mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                    />
                  </div>
                  <Button
                    onClick={updatePassword}
                    className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                  >
                    Update Password
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-[#16232A] mb-4">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-[#16232A]/70 mb-4">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[#16232A] mb-4">
                  Language & Region
                </h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-[#16232A] mb-2">
                      Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Marathi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#16232A] mb-2">
                      Timezone
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                    >
                      <option>IST (India Standard Time)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-[#16232A] mb-4">
                  Account Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="gap-2 text-[#16232A]"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
