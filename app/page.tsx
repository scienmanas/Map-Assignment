import { MapComponent } from "@/app/ui/map";
import { Footer } from "@/app/ui/Footer";

export default async function home(): Promise<JSX.Element> {
  const response = await fetch(
    "https://prod-be.1acre.in/lands/landmaps/?seller_id=211",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  if (response.status === 200) {
    console.log(data);
  } else {
    console.log("Some error cocurred");
  }

  return (
    <div className="map-assignment flex flex-col gap-8 w-full h-fit items-center justify-center pt-8">
      <div className="heading text-black text-2xl sm:text-3xl font-bold text-wrap text-center">
        Map Card with Click Event
      </div>
      <MapComponent />
      <Footer />
    </div>
  );
}
