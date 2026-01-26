export const createCustomIcon = (color: string = '#3b82f6') => {
  return {
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      ">
        <div style="
          position: absolute;
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        "></div>
      </div>
    `
  };
};

export const calculateMapCenter = (locations: Array<{latitude: number, longitude: number}>) => {
  if (locations.length === 0) {
    return { lat: -29.6842, lng: -53.8069 }; // santa maria
  }
  
  const avgLat = locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length;
  const avgLng = locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length;
  
  return { lat: avgLat, lng: avgLng };
};