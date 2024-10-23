import { MapCard } from "@/app/ui/components/map-card";

interface MapComponentDataType {
  id: number;
  lat: string;
  long: string;
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
}

export async function MapComponent(): Promise<JSX.Element> {
  const response = await fetch(
    "https://prod-be.1acre.in/lands/landmaps/?seller_id=211",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data: MapComponentDataType[] = await response.json();
  if (response.status === 200) {
    console.log("Data Fecthed from API");
  } else {
    console.log("Some error cocurred");
  }
  const G_MAPS_API_KEY = process.env.G_MAPS_API_KEY as string;

  return (
    <section className="map-section flex flex-row flex-wrap gap-6 p-4 items-center justify-center w-full h-fit">
      {data.map((areaData, index) => (
        <MapCard
          key={index}
          id={areaData.id}
          lat={areaData.lat}
          long={areaData.long}
          total_land_size_in_acres={areaData.total_land_size_in_acres}
          price_per_acre_crore={areaData.price_per_acre_crore}
          total_land_size_in_hectares={areaData.total_land_size_in_hectares}
          price_per_hectare_crore={areaData.price_per_hectare_crore}
          status={areaData.status}
          exposure_type={areaData.exposure_type}
          seller_type={areaData.seller_type}
          division_slugs={areaData.division_slugs}
          highway_facing={areaData.highway_facing}
          API_KEY={G_MAPS_API_KEY}
        />
      ))}
    </section>
  );
}
