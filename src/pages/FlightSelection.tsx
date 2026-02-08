import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Plane, Clock, ArrowRight, Luggage, Utensils, Check, Info } from "lucide-react";

interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  departureCity: string;
  arrivalCity: string;
  departureAirport: string;
  arrivalAirport: string;
  duration: string;
  price: number;
  cabinClass: string;
  stops: number;
  baggage: string;
  meal: boolean;
  seatsLeft?: number;
}

const mockFlights: Flight[] = [
  {
    id: "1",
    airline: "东方航空",
    airlineLogo: "MU",
    flightNumber: "MU5101",
    departureTime: "08:00",
    arrivalTime: "10:30",
    departureCity: "上海",
    arrivalCity: "北京",
    departureAirport: "浦东T1",
    arrivalAirport: "首都T3",
    duration: "2h30m",
    price: 980,
    cabinClass: "经济舱",
    stops: 0,
    baggage: "20kg",
    meal: true,
    seatsLeft: 5,
  },
  {
    id: "2",
    airline: "南方航空",
    airlineLogo: "CZ",
    flightNumber: "CZ3901",
    departureTime: "10:15",
    arrivalTime: "12:40",
    departureCity: "上海",
    arrivalCity: "北京",
    departureAirport: "虹桥T2",
    arrivalAirport: "大兴",
    duration: "2h25m",
    price: 850,
    cabinClass: "经济舱",
    stops: 0,
    baggage: "20kg",
    meal: true,
  },
  {
    id: "3",
    airline: "国航",
    airlineLogo: "CA",
    flightNumber: "CA1501",
    departureTime: "14:30",
    arrivalTime: "16:55",
    departureCity: "上海",
    arrivalCity: "北京",
    departureAirport: "浦东T1",
    arrivalAirport: "首都T3",
    duration: "2h25m",
    price: 1120,
    cabinClass: "经济舱",
    stops: 0,
    baggage: "23kg",
    meal: true,
  },
  {
    id: "4",
    airline: "春秋航空",
    airlineLogo: "9C",
    flightNumber: "9C8801",
    departureTime: "18:00",
    arrivalTime: "20:35",
    departureCity: "上海",
    arrivalCity: "北京",
    departureAirport: "浦东T2",
    arrivalAirport: "大兴",
    duration: "2h35m",
    price: 599,
    cabinClass: "经济舱",
    stops: 0,
    baggage: "10kg",
    meal: false,
    seatsLeft: 3,
  },
  {
    id: "5",
    airline: "东方航空",
    airlineLogo: "MU",
    flightNumber: "MU5121",
    departureTime: "21:00",
    arrivalTime: "23:25",
    departureCity: "上海",
    arrivalCity: "北京",
    departureAirport: "浦东T1",
    arrivalAirport: "首都T3",
    duration: "2h25m",
    price: 720,
    cabinClass: "经济舱",
    stops: 0,
    baggage: "20kg",
    meal: false,
  },
];

const FlightSelection = () => {
  const navigate = useNavigate();
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"price" | "time" | "duration">("price");

  const sortedFlights = [...mockFlights].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price;
      case "time":
        return a.departureTime.localeCompare(b.departureTime);
      case "duration":
        return a.duration.localeCompare(b.duration);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-24 left-16 w-32 h-32 bg-accent/25 clay-blob animate-float" />
      <div className="absolute bottom-32 right-20 w-40 h-40 bg-lavender/20 clay-blob-2 animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 right-10 w-24 h-24 bg-secondary/30 clay-blob animate-float" style={{ animationDelay: "4s" }} />

      <div className="container mx-auto px-4 py-8 relative z-10 pb-32">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="shadow-clay rounded-full bg-card"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">选择航班</h1>
            <p className="text-muted-foreground">上海 → 北京 · 2024年3月15日</p>
          </div>
        </div>

        {/* Route Summary Card */}
        <Card className="shadow-clay rounded-2xl border-0 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">上海</p>
                <p className="text-sm text-muted-foreground">SHA</p>
              </div>
              <div className="flex-1 flex items-center justify-center px-4">
                <div className="flex-1 h-0.5 bg-border" />
                <div className="mx-2 bg-primary text-primary-foreground p-2 rounded-full shadow-clay">
                  <Plane className="w-4 h-4" />
                </div>
                <div className="flex-1 h-0.5 bg-border" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">北京</p>
                <p className="text-sm text-muted-foreground">PEK</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sort Tabs */}
        <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)} className="mb-6">
          <TabsList className="w-full bg-card shadow-clay rounded-2xl p-1.5 h-auto">
            <TabsTrigger value="price" className="flex-1 rounded-xl py-2.5 data-[state=active]:shadow-clay">
              价格优先
            </TabsTrigger>
            <TabsTrigger value="time" className="flex-1 rounded-xl py-2.5 data-[state=active]:shadow-clay">
              时间优先
            </TabsTrigger>
            <TabsTrigger value="duration" className="flex-1 rounded-xl py-2.5 data-[state=active]:shadow-clay">
              时长优先
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Flight Cards */}
        <div className="space-y-4">
          {sortedFlights.map((flight) => (
            <Card
              key={flight.id}
              className={`shadow-clay hover:shadow-clay-hover transition-all duration-300 rounded-2xl border-2 overflow-hidden cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${
                selectedFlight === flight.id ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setSelectedFlight(flight.id)}
            >
              <CardContent className="p-5">
                {/* Airline Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center font-bold text-primary text-sm shadow-clay-inset">
                      {flight.airlineLogo}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{flight.airline}</p>
                      <p className="text-xs text-muted-foreground">{flight.flightNumber}</p>
                    </div>
                  </div>
                  {flight.seatsLeft && flight.seatsLeft <= 5 && (
                    <span className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-xs font-medium">
                      仅剩{flight.seatsLeft}座
                    </span>
                  )}
                </div>

                {/* Flight Times */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-foreground">{flight.departureTime}</p>
                    <p className="text-sm text-muted-foreground">{flight.departureAirport}</p>
                  </div>

                  <div className="flex-1 flex flex-col items-center px-4">
                    <div className="flex items-center w-full mb-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="flex-1 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-primary" />
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Clock className="w-3 h-3" />
                      <span>{flight.duration}</span>
                      {flight.stops === 0 && <span className="text-secondary font-medium">· 直飞</span>}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-foreground">{flight.arrivalTime}</p>
                    <p className="text-sm text-muted-foreground">{flight.arrivalAirport}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full text-xs text-muted-foreground">
                    <Luggage className="w-3.5 h-3.5" />
                    {flight.baggage}
                  </span>
                  {flight.meal && (
                    <span className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full text-xs text-muted-foreground">
                      <Utensils className="w-3.5 h-3.5" />
                      含餐
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">{flight.cabinClass}</span>
                </div>

                {/* Price and Select */}
                <div className="flex items-end justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-2xl font-extrabold text-primary">¥{flight.price}</span>
                    <span className="text-muted-foreground text-sm"> /人</span>
                  </div>
                  <Button
                    variant={selectedFlight === flight.id ? "clay" : "outline"}
                    size="default"
                  >
                    {selectedFlight === flight.id ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        已选择
                      </>
                    ) : (
                      "选择"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      {selectedFlight && (
        <div className="fixed bottom-0 left-0 right-0 bg-card shadow-clay-hover border-t border-border p-4 z-20">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">已选航班</p>
              <p className="font-bold text-foreground">
                {sortedFlights.find((f) => f.id === selectedFlight)?.flightNumber} · 
                {sortedFlights.find((f) => f.id === selectedFlight)?.departureTime} 出发
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-extrabold text-primary">
                  ¥{sortedFlights.find((f) => f.id === selectedFlight)?.price}
                </p>
              </div>
              <Button variant="clay" size="lg">
                下一步
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightSelection;
