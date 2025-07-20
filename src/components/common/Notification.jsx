import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheckCircle, 
  FiAlertCircle, 
  FiInfo, 
  FiX,
  FiXCircle
} from 'react-icons/fi';

const Notification = ({ type = 'info', title, message, onClose }) => {
  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="h-5 w-5" />;
      case 'error':
        return <FiXCircle className="h-5 w-5" />;
      case 'warning':
        return <FiAlertCircle className="h-5 w-5" />;
      default:
        return <FiInfo className="h-5 w-5" />;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIconColorClasses = () => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-4 right-4 z-50 max-w-sm w-full rounded-lg border ${getColorClasses()} shadow-lg overflow-hidden`}
        role="alert"
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className={`flex-shrink-0 ${getIconColorClasses()}`}>
              {getIcon()}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              {title && (
                <h3 className="text-sm font-medium">
                  {title}
                </h3>
              )}
              {message && (
                <p className="mt-1 text-sm">
                  {message}
                </p>
              )}
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <FiX className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className={`h-1 w-full ${type === 'success' ? 'bg-green-400' : 
                         type === 'error' ? 'bg-red-400' : 
                         type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'}`}>
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 5, ease: 'linear' }}
            className="h-full bg-white opacity-30"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;