// LocationSearch.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { FaLocationDot } from "react-icons/fa6";
import { darkModeStyles } from "@/lib/utils";

interface LocationSearchProps {
  location: string;
  onLocationChange: (location: string) => void;
}

const LocationSearch = ({
  location,
  onLocationChange,
}: LocationSearchProps) => {
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLng | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  useEffect(() => {
    if (location && isLoaded) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          setMarkerPosition(location);
          if (mapRef.current) {
            mapRef.current.panTo(location);
          }
        }
      });
    }
  }, [location, isLoaded]);

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const location = place.geometry?.location;
      if (location) {
        setMarkerPosition(location);
        onLocationChange(place.formatted_address || "");
        if (mapRef.current) {
          mapRef.current.panTo(location);
        }
      }
    }
  };

  return (
    <div className="w-full">
      {isLoaded && (
        <div>
          <div className="flex items-center w-full">
            <FaLocationDot className="w-6 h-6 mx-2 opacity-70" />
            <div className="w-full">
              <StandaloneSearchBox
                onLoad={(ref) => (searchBoxRef.current = ref)}
                onPlacesChanged={handlePlacesChanged}
              >
                <Input
                  value={location}
                  onChange={(e) => onLocationChange(e.target.value)}
                  placeholder="Search for location..."
                  className="w-full"
                />
              </StandaloneSearchBox>
            </div>
          </div>
          <div className="mt-4 rounded-lg">
            <GoogleMap
              onLoad={(map) => {
                mapRef.current = map;
              }}
              mapContainerStyle={{
                width: "100%",
                height: "200px",
                borderRadius: "10px",
              }}
              center={markerPosition || { lat: -6.2, lng: 106.816666 }}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
