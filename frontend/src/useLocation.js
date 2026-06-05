import { useState, useEffect } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState("Detecting...");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Not Supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Reverse Geocoding using OpenStreetMap (Free)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          // Extract city or town name
          const city = data.address.city || data.address.town || data.address.village || "Unknown";
          setLocation(city);
        } catch (error) {
          setLocation("Error");
        }
      },
      () => setLocation("Permission Denied")
    );
  }, []);

  return location;
};