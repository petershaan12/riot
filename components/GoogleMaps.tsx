"use client";
import { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { darkModeStyles } from "@/lib/utils";

interface MapDisplayProps {
  address: string; // Change to address instead of markerPosition
}


const MapDisplay = ({ address }: MapDisplayProps) => {
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLng | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded && address) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          setMarkerPosition(location);
          if (mapRef.current) {
            mapRef.current.panTo(location);
          }
        } else {
          console.error("Geocoding failed:", status);
        }
      });
    }
  }, [address, isLoaded]);

  return (
    <div className="mt-4 rounded-lg">
      {isLoaded && (
        <GoogleMap
          onLoad={(map) => {
            mapRef.current = map;
          }}
          mapContainerStyle={{
            width: "100%",
            height: "200px",
            borderRadius: "5px",
          }}
          center={markerPosition || { lat: -6.2, lng: 106.816666 }} // Default location if no coordinates
          zoom={15}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            styles: darkModeStyles,
          }}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      )}
    </div>
  );
};

export default MapDisplay;
