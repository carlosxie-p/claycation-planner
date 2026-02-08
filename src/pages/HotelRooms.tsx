import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Users, Bed, Bath, Maximize, Wifi, Car, Coffee, Tv, Wind, Check } from "lucide-react";

interface Room {
  id: string;
  name: string;
  size: number;
  maxGuests: number;
  bedType: string;
  pricePerNight: number;
  image: string;
  amenities: string[];
  breakfast: boolean;
  cancellable: boolean;
}

const mockRooms: Room[] = [
  {
    id: "1",
    name: "豪华大床房",
    size: 35,
    maxGuests: 2,
    bedType: "1.8米大床",
    pricePerNight: 688,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
    amenities: ["wifi", "tv", "ac", "bathroom"],
    breakfast: true,
    cancellable: true,
  },
  {
    id: "2",
    name: "行政套房",
    size: 55,
    maxGuests: 2,
    bedType: "2米大床",
    pricePerNight: 1288,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop",
    amenities: ["wifi", "tv", "ac", "bathroom"],
    breakfast: true,
    cancellable: true,
  },
  {
    id: "3",
    name: "标准双床房",
    size: 30,
    maxGuests: 2,
    bedType: "2张1.2米单人床",
    pricePerNight: 588,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop",
    amenities: ["wifi", "tv", "ac", "bathroom"],
    breakfast: false,
    cancellable: true,
  },
  {
    id: "4",
    name: "家庭房",
    size: 45,
    maxGuests: 4,
    bedType: "1张大床+2张单人床",
    pricePerNight: 988,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop",
    amenities: ["wifi", "tv", "ac", "bathroom"],
    breakfast: true,
    cancellable: false,
  },
];

const AmenityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "wifi":
      return <Wifi className="w-4 h-4" />;
    case "tv":
      return <Tv className="w-4 h-4" />;
    case "ac":
      return <Wind className="w-4 h-4" />;
    case "bathroom":
      return <Bath className="w-4 h-4" />;
    default:
      return null;
  }
};

const HotelRooms = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-32 right-20 w-36 h-36 bg-accent/20 clay-blob animate-float" />
      <div className="absolute bottom-20 left-16 w-28 h-28 bg-secondary/30 clay-blob-2 animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/3 left-10 w-20 h-20 bg-highlight/25 clay-blob animate-float" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/hotels")}
            className="shadow-clay rounded-full bg-card"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">选择房型</h1>
            <p className="text-muted-foreground">云端花园酒店 · 共 {mockRooms.length} 种房型</p>
          </div>
        </div>

        {/* Room Cards */}
        <div className="space-y-4">
          {mockRooms.map((room) => (
            <Card
              key={room.id}
              className={`shadow-clay hover:shadow-clay-hover transition-all duration-300 rounded-2xl border-2 overflow-hidden cursor-pointer ${
                selectedRoom === room.id ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setSelectedRoom(room.id)}
            >
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="relative lg:w-80 h-56 lg:h-auto">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    {room.breakfast && (
                      <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-clay">
                        含早餐
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5">
                    <div className="flex flex-col h-full">
                      {/* Room Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-3">{room.name}</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Maximize className="w-4 h-4" />
                            <span className="text-sm">{room.size}㎡</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">最多{room.maxGuests}人</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                            <Bed className="w-4 h-4" />
                            <span className="text-sm">{room.bedType}</span>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {room.amenities.map((amenity) => (
                            <span
                              key={amenity}
                              className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full text-xs text-muted-foreground"
                            >
                              <AmenityIcon type={amenity} />
                              {amenity === "wifi" && "WiFi"}
                              {amenity === "tv" && "电视"}
                              {amenity === "ac" && "空调"}
                              {amenity === "bathroom" && "独立卫浴"}
                            </span>
                          ))}
                        </div>

                        {/* Tags */}
                        <div className="flex gap-2">
                          {room.cancellable && (
                            <span className="flex items-center gap-1 text-secondary text-sm font-medium">
                              <Check className="w-4 h-4" />
                              免费取消
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price and Book */}
                      <div className="flex items-end justify-between mt-4 pt-4 border-t border-border">
                        <div>
                          <span className="text-2xl font-extrabold text-primary">¥{room.pricePerNight}</span>
                          <span className="text-muted-foreground text-sm"> /晚</span>
                        </div>
                        <Button
                          variant={selectedRoom === room.id ? "clay" : "outline"}
                          size="default"
                        >
                          {selectedRoom === room.id ? "已选择" : "选择房型"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Bar */}
        {selectedRoom && (
          <div className="fixed bottom-0 left-0 right-0 bg-card shadow-clay-hover border-t border-border p-4 z-20">
            <div className="container mx-auto flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">已选择房型</p>
                <p className="font-bold text-foreground">
                  {mockRooms.find((r) => r.id === selectedRoom)?.name}
                </p>
              </div>
              <Button variant="clay" size="lg">
                确认预订
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelRooms;
