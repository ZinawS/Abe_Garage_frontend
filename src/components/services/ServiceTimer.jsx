import React, { useState, useEffect } from 'react';
import { FiPlay, FiPause, FiSquare } from 'react-icons/fi';
import Button from '../common/Button';

const TimeTracking = ({ serviceId, technicianId, onTimeUpdate }) => {
  const [timeEntries, setTimeEntries] = useState([]);
  const [currentTimer, setCurrentTimer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeEntries = async () => {
      try {
        const response = await fetch(`/api/services/${serviceId}/time-entries`);
        const data = await response.json();
        setTimeEntries(data);
      } catch (err) {
        console.error('Error fetching time entries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeEntries();
  }, [serviceId]);

  const startTimer = async () => {
    try {
      const response = await fetch('/api/time-entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId,
          technicianId,
          startTime: new Date().toISOString()
        })
      });

      const newEntry = await response.json();
      setCurrentTimer(newEntry);
    } catch (err) {
      console.error('Error starting timer:', err);
    }
  };

  const pauseTimer = async () => {
    if (!currentTimer) return;

    try {
      await fetch(`/api/time-entries/${currentTimer.id}/pause`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pauseTime: new Date().toISOString()
        })
      });

      // Refresh time entries
      const response = await fetch(`/api/services/${serviceId}/time-entries`);
      const data = await response.json();
      setTimeEntries(data);
      setCurrentTimer(null);
    } catch (err) {
      console.error('Error pausing timer:', err);
    }
  };

  const stopTimer = async () => {
    if (!currentTimer) return;

    try {
      await fetch(`/api/time-entries/${currentTimer.id}/stop`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endTime: new Date().toISOString()
        })
      });

      // Refresh time entries
      const response = await fetch(`/api/services/${serviceId}/time-entries`);
      const data = await response.json();
      setTimeEntries(data);
      setCurrentTimer(null);
      
      if (onTimeUpdate) {
        onTimeUpdate(data);
      }
    } catch (err) {
      console.error('Error stopping timer:', err);
    }
  };

  const calculateTotalHours = () => {
    return timeEntries.reduce((total, entry) => {
      if (entry.endTime) {
        const start = new Date(entry.startTime);
        const end = new Date(entry.endTime);
        const duration = (end - start) / (1000 * 60 * 60); // Convert to hours
        return total + duration;
      }
      return total;
    }, 0).toFixed(2);
  };

  if (loading) return <div>Loading time entries...</div>;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Time Tracking</h3>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="font-medium">Total Time: </span>
          <span>{calculateTotalHours()} hours</span>
        </div>
        
        <div className="flex space-x-2">
          {!currentTimer ? (
            <Button onClick={startTimer} variant="primary" icon={<FiPlay />}>
              Start
            </Button>
          ) : (
            <>
              <Button onClick={pauseTimer} variant="warning" icon={<FiPause />}>
                Pause
              </Button>
              <Button onClick={stopTimer} variant="danger" icon={<FiSquare />}>
                Stop
              </Button>
            </>
          )}
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Technician</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Start Time</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">End Time</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {timeEntries.map((entry) => (
            <tr key={entry.id}>
              <td className="px-4 py-2 whitespace-nowrap">{entry.technicianName}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                {new Date(entry.startTime).toLocaleString()}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {entry.endTime ? new Date(entry.endTime).toLocaleString() : 'In Progress'}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {entry.endTime 
                  ? `${((new Date(entry.endTime) - new Date(entry.startTime)) / (1000 * 60 * 60))} hours`
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTracking;