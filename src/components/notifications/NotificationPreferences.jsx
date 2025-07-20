import React, { useState, useEffect } from "react";
import { FiBell, FiBellOff, FiMail, FiPhone } from "react-icons/fi";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "../../services/notificationService";
import Switch from "../common/Switch";
import Button from "../common/Button";

/**
 * NotificationPreferences Component
 *
 * Allows users to manage their notification preferences including:
 * - Email notifications
 * - SMS notifications
 * - In-app notifications
 * - Per-event preferences
 */
const NotificationPreferences = ({ customerId }) => {
  const [preferences, setPreferences] = useState({
    emailEnabled: true,
    smsEnabled: false,
    appEnabled: true,
    events: {
      appointmentReminder: true,
      serviceComplete: true,
      paymentReceived: true,
      promotional: false,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load preferences on mount
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const data = await getNotificationPreferences(customerId);
        setPreferences(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [customerId]);

  /**
   * Handle preference change
   * @param {string} key - Preference key
   * @param {boolean} value - New value
   */
  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * Handle event preference change
   * @param {string} event - Event name
   * @param {boolean} value - New value
   */
  const handleEventPreferenceChange = (event, value) => {
    setPreferences((prev) => ({
      ...prev,
      events: {
        ...prev.events,
        [event]: value,
      },
    }));
  };

  /**
   * Save preferences to server
   */
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateNotificationPreferences(customerId, preferences);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return <div className="text-center py-4">Loading preferences...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Notification Channels
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiMail className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm font-medium text-gray-700">
                Email Notifications
              </span>
            </div>
            <Switch
              enabled={preferences.emailEnabled}
              onChange={(enabled) =>
                handlePreferenceChange("emailEnabled", enabled)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiPhone className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm font-medium text-gray-700">
                SMS Notifications
              </span>
            </div>
            <Switch
              enabled={preferences.smsEnabled}
              onChange={(enabled) =>
                handlePreferenceChange("smsEnabled", enabled)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiBell className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm font-medium text-gray-700">
                In-App Notifications
              </span>
            </div>
            <Switch
              enabled={preferences.appEnabled}
              onChange={(enabled) =>
                handlePreferenceChange("appEnabled", enabled)
              }
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Notification Events
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiBell className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm font-medium text-gray-700">
                Appointment Reminders
              </span>
            </div>
            <Switch
              enabled={preferences.events.appointmentReminder}
              onChange={(enabled) =>
                handleEventPreferenceChange("appointmentReminder", enabled)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiBell className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm font-medium text-gray-700">
                Service Completion
              </span>
            </div>
            <Switch
              enabled={preferences.events.serviceComplete}
              onChange={(enabled) =>
                handleEventPreferenceChange("serviceComplete", enabled)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiBell className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm font-medium text-gray-700">
                Payment Received
              </span>
            </div>
            <Switch
              enabled={preferences.events.paymentReceived}
              onChange={(enabled) =>
                handleEventPreferenceChange("paymentReceived", enabled)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiBellOff className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm font-medium text-gray-700">
                Promotional Offers
              </span>
            </div>
            <Switch
              enabled={preferences.events.promotional}
              onChange={(enabled) =>
                handleEventPreferenceChange("promotional", enabled)
              }
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <Button
          variant="primary"
          onClick={handleSave}
          loading={isSaving}
          className="w-full sm:w-auto"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default NotificationPreferences;
