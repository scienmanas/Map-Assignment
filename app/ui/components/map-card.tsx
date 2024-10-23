"use client";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { SubmissionLoader } from "@/app/ui/loaders";

interface MapComponentDataType {
  id: number;
  lat: number | string;
  long: number | string;
  total_land_size_in_acres: {
    acres: number;
    guntas: number;
  };
  price_per_acre_crore: {
    crore: number;
    lakh: number;
  };
  total_land_size_in_hectares: number | null;
  price_per_hectare_crore: number | null;
  status: string;
  exposure_type: string;
  seller_type: string;
  division_slugs: {
    state: string;
    district: string;
    mandal: string;
    village: string;
  };
  highway_facing: boolean;
  API_KEY: string;
}

export function MapCard({
  id,
  lat,
  long,
  total_land_size_in_acres,
  price_per_acre_crore,
  total_land_size_in_hectares,
  price_per_hectare_crore,
  status,
  exposure_type,
  seller_type,
  division_slugs,
  highway_facing,
  API_KEY,
}: MapComponentDataType): JSX.Element {
//   const G_MAPS_API_KEY = process.env.G_MAPS_API_KEY;
  console.log(API_KEY);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY, 
  });

  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [mapDimensions, setMapDimensions] = useState({
    width: "600px",
    height: "400px",
  });

  // Ensure lat/long are numbers
  const latNumber = typeof lat === "string" ? parseFloat(lat) : lat;
  const longNumber = typeof long === "string" ? parseFloat(long) : long;

  useEffect(() => {
    // Dynamically adjust map size for mobile and desktop
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMapDimensions({ width: "300px", height: "200px" });
      } else {
        setMapDimensions({ width: "600px", height: "400px" });
      }
      // Additionally more breakpoints can be applied depending on requirement
    };

    handleResize(); // Set initial dimensions
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isLoaded) {
    return <SubmissionLoader color="blue" height={20} width={20} key={1} />;
  }

  return (
    <div className="map-card-container relative w-fit h-fit group p-[2px] bg-red-600 rounded-2xl">
      <div className="map-container overflow-hidden rounded-2xl p-[1px]">
        <GoogleMap
          id="map-card"
          mapContainerStyle={mapDimensions}
          zoom={13}
          center={{ lat: latNumber, lng: longNumber }}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
          }}
        >
          <Marker
            position={{ lat: latNumber, lng: longNumber }}
            onClick={() => setSelectedMarker(id)}
          />

          {selectedMarker === id && (
            <InfoWindow
              position={{
                lat: latNumber,
                lng: longNumber,
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="info-window-content p-4 bg-white shadow-lg rounded-lg text-gray-800">
                <p className="mb-2">
                  <strong>Total Land Size:</strong>{" "}
                  {total_land_size_in_acres.acres > 0
                    ? `${total_land_size_in_acres.acres} acres`
                    : ``}{" "}
                  {total_land_size_in_acres.guntas > 0
                    ? `${total_land_size_in_acres.guntas} guntas`
                    : ``}
                </p>

                <p className="mb-2">
                  <strong>Price Per Acre:</strong> ₹{" "}
                  {price_per_acre_crore.crore > 0
                    ? `${price_per_acre_crore.crore} crore`
                    : ``}{" "}
                  {price_per_acre_crore.lakh > 0
                    ? `${price_per_acre_crore.lakh} lakh`
                    : ``}
                </p>

                <p className="mb-2">
                  <strong>Location:</strong> {division_slugs.village},{" "}
                  {division_slugs.mandal}, {division_slugs.district},{" "}
                  {division_slugs.state}
                </p>

                <p className="mb-2">
                  <strong>Highway Facing:</strong>{" "}
                  {highway_facing ? "Yes" : "No"}
                </p>

                <p className="mb-2">
                  <strong>Status:</strong>{" "}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </p>
                <p className="mb-2">
                  <strong>Seller: </strong>
                  {seller_type}
                </p>

                <p className="mb-2">
                  <strong>Exposure: </strong>
                  {exposure_type}
                </p>
                <a
                  href={`https://www.google.com/maps?q=${latNumber},${longNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2 inline-block"
                >
                  View on Google Maps
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
