import React, {useEffect, useState} from "react";

export interface IDiscoveryItem {
  id: number;
  title: string;
  image: string;
  location: {
    city: string;
    address: string;
    lat: number;
    lng: number;
  };
}

export interface IDbContext {
  data: IDiscoveryItem[];
  loading: boolean;
  reloadData: () => void;
}

const MOCKDATA = [
  {
    id: 1,
    title: "Modern Downtown Loft",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "New York",
      address: "5th Ave, Manhattan",
      lat: 40.7128,
      lng: -74.006,
    },
  },
  {
    id: 2,
    title: "Cozy Forest Cabin",
    image:
      "https://images.unsplash.com/photo-1449156733864-dd5471bb7427?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Aspen",
      address: "Pine Creek Road",
      lat: 39.1911,
      lng: -106.8175,
    },
  },
  {
    id: 3,
    title: "Seaside Luxury Villa",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Malibu",
      address: "Pacific Coast Hwy",
      lat: 34.0259,
      lng: -118.7798,
    },
  },
  {
    id: 4,
    title: "Minimalist Studio",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Berlin",
      address: "Mitte District",
      lat: 52.52,
      lng: 13.405,
    },
  },
  {
    id: 5,
    title: "Historic Brick House",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "London",
      address: "Notting Hill Gate",
      lat: 51.5074,
      lng: -0.1278,
    },
  },
  {
    id: 6,
    title: "Industrial Design Workspace",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Chicago",
      address: "Wacker Drive",
      lat: 41.8781,
      lng: -87.6298,
    },
  },
  {
    id: 7,
    title: "Mountain View Chalet",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Zermatt",
      address: "Matterhorn Glacier Paradise",
      lat: 46.0207,
      lng: 7.7491,
    },
  },
  {
    id: 8,
    title: "Tropical Beach Resort",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Bali",
      address: "Seminyak Beach",
      lat: -8.6991,
      lng: 115.1385,
    },
  },
  {
    id: 9,
    title: "Urban Rooftop Garden",
    image:
      "https://images.unsplash.com/photo-1502672023488-70e25811ef0e?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Tokyo",
      address: "Shibuya Crossing",
      lat: 35.6895,
      lng: 139.6917,
    },
  },
  {
    id: 10,
    title: "Sun-Drenched Penthouse",
    image:
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Miami",
      address: "Ocean Drive",
      lat: 25.7617,
      lng: -80.1918,
    },
  },
  {
    id: 11,
    title: "Artists Creative Space",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Paris",
      address: "Montmartre Hill",
      lat: 48.8566,
      lng: 2.3522,
    },
  },
  {
    id: 12,
    title: "Nordic Lake House",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Oslo",
      address: "Lake Sognsvann",
      lat: 59.9139,
      lng: 10.7522,
    },
  },
  {
    id: 13,
    title: "Charming Country Cottage",
    image:
      "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Cotswolds",
      address: "Castle Combe Lane",
      lat: 51.4925,
      lng: -2.2312,
    },
  },
  {
    id: 14,
    title: "High-Rise Glass Condo",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Dubai",
      address: "Sheikh Zayed Road",
      lat: 25.2048,
      lng: 55.2708,
    },
  },
  {
    id: 15,
    title: "Vintage Mediterranean Villa",
    image:
      "https://images.unsplash.com/photo-1512918766775-d56aacc59bf1?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Santorini",
      address: "Oia Cliffs",
      lat: 36.3932,
      lng: 25.4615,
    },
  },
  {
    id: 16,
    title: "Eco-Friendly Treehouse",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Portland",
      address: "Forest Park Drive",
      lat: 45.5152,
      lng: -122.6784,
    },
  },
  {
    id: 17,
    title: "Elegant City Apartment",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Vienna",
      address: "Ringstraße",
      lat: 48.2082,
      lng: 16.3738,
    },
  },
  {
    id: 18,
    title: "Desert Oasis Retreat",
    image:
      "https://images.unsplash.com/photo-1536376074432-8d2483f99dd8?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Palm Springs",
      address: "Tahquitz Canyon Way",
      lat: 33.8303,
      lng: -116.5453,
    },
  },
  {
    id: 19,
    title: "Renovated Warehouse",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Brooklyn",
      address: "DUMBO Waterfront",
      lat: 40.7033,
      lng: -73.9881,
    },
  },
  {
    id: 20,
    title: "Lakeside Morning Cabin",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
    location: {
      city: "Lake Tahoe",
      address: "Emerald Bay Road",
      lat: 38.9399,
      lng: -119.9772,
    },
  },
];

export const DbContext = React.createContext<IDbContext>({
  data: [],
  loading: false,
  reloadData: () => {},
});

export const DbContextProvider = ({children}: {children: React.ReactNode}) => {
  const [data, setData] = useState<IDiscoveryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<boolean>(false);

  const handleReload = () => {
    setTrigger((prev) => !prev);
  };

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!ignore) {
          setData(MOCKDATA);
        }
      } catch (error) {
        console.error("Fetching error: ", error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, [trigger]);

  return (
    <DbContext.Provider
      value={{data: data, loading: loading, reloadData: handleReload}}
    >
      {children}
    </DbContext.Provider>
  );
};
