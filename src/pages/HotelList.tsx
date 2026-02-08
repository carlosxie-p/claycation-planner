import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Users, Wifi, Car, Coffee, ChevronLeft, Search, SlidersHorizontal } from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  image: string;
  amenities: string[];
  featured?: boolean;
}

const mockHotels: Hotel[] = [
  {
    id: "1",
    name: "云端花园酒店",
    location: "上海市浦东新区",
    rating: 4.8,
    reviews: 2341,
    pricePerNight: 688,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    amenities: ["wifi", "parking", "breakfast"],
    featured: true,
  },
  {
    id: "2",
    name: "海景度假村",
    location: "三亚市海棠湾",
    rating: 4.9,
    reviews: 1892,
    pricePerNight: 1288,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
    amenities: ["wifi", "parking", "breakfast"],
    featured: true,
  },
  {
    id: "3",
    name: "城市商务酒店",
    location: "北京市朝阳区",
    rating: 4.5,
    reviews: 3201,
    pricePerNight: 458,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    amenities: ["wifi", "breakfast"],
  },
  {
    id: "4",
    name: "温泉养生酒店",
    location: "杭州市西湖区",
    rating: 4.7,
    reviews: 1456,
    pricePerNight: 888,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    amenities: ["wifi", "parking", "breakfast"],
  },
  {
    id: "5",
    name: "艺术精品酒店",
    location: "成都市锦江区",
    rating: 4.6,
    reviews: 987,
    pricePerNight: 528,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
    amenities: ["wifi", "breakfast"],
  },
];

const AmenityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "wifi":
      return <Wifi className="w-4 h-4" />;
    case "parking":
      return <Car className="w-4 h-4" />;
    case "breakfast":
      return <Coffee className="w-4 h-4" />;
    default:
      return null;
  }
};

const HotelList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHotels = mockHotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/30 clay-blob animate-float" />
      <div className="absolute bottom-40 right-10 w-40 h-40 bg-lavender/20 clay-blob-2 animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-highlight/20 clay-blob animate-float" style={{ animationDelay: "4s" }} />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="shadow-clay rounded-full bg-card"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">酒店列表</h1>
            <p className="text-muted-foreground">找到 {filteredHotels.length} 家酒店</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <Card className="shadow-clay rounded-2xl mb-8 border-0">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="搜索酒店名称或位置..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-xl"
                />
              </div>
              <Button variant="secondary" size="icon" className="h-12 w-12">
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hotel Cards */}
        <div className="space-y-4">
          {filteredHotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="shadow-clay hover:shadow-clay-hover transition-all duration-300 rounded-2xl border-0 overflow-hidden cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              onClick={() => navigate(`/hotels/${hotel.id}/rooms`)}
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative md:w-72 h-48 md:h-auto">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    {hotel.featured && (
                      <span className="absolute top-3 left-3 bg-highlight text-highlight-foreground px-3 py-1 rounded-full text-xs font-bold shadow-clay">
                        精选
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-foreground">{hotel.name}</h3>
                        <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg">
                          <Star className="w-4 h-4 text-primary fill-primary" />
                          <span className="font-bold text-primary">{hotel.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{hotel.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                        <Users className="w-4 h-4" />
                        <span>{hotel.reviews} 条评价</span>
                      </div>

                      {/* Amenities */}
                      <div className="flex gap-2">
                        {hotel.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full text-xs text-muted-foreground"
                          >
                            <AmenityIcon type={amenity} />
                            {amenity === "wifi" && "免费WiFi"}
                            {amenity === "parking" && "免费停车"}
                            {amenity === "breakfast" && "含早餐"}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-end justify-between mt-4 pt-4 border-t border-border">
                      <div>
                        <span className="text-2xl font-extrabold text-primary">¥{hotel.pricePerNight}</span>
                        <span className="text-muted-foreground text-sm"> /晚起</span>
                      </div>
                      <Button variant="clay" size="sm">
                        查看房型
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelList;
