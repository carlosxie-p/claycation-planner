import { Plane, Hotel, MapPin, Calendar, Users, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const ClayBlob = ({ className, color, style }: { className?: string; color?: string; style?: React.CSSProperties }) => (
  <div
    className={cn(
      "absolute rounded-full opacity-60 blur-sm",
      className
    )}
    style={{
      background: `hsl(var(--${color || 'primary'}))`,
      ...style,
    }}
  />
);

const Index = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [travelers, setTravelers] = useState(1);

  const handleSearch = () => {
    console.log("Searching for:", { origin, destination, departureDate, returnDate, travelers });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative clay blobs */}
      <ClayBlob className="w-64 h-64 -top-20 -left-20 animate-float" color="primary" />
      <ClayBlob className="w-48 h-48 top-40 -right-16 animate-float" color="secondary" style={{ animationDelay: '2s' } as React.CSSProperties} />
      <ClayBlob className="w-56 h-56 bottom-20 -left-24 animate-float" color="accent" style={{ animationDelay: '4s' } as React.CSSProperties} />
      <ClayBlob className="w-40 h-40 bottom-40 right-20 animate-float" color="highlight" style={{ animationDelay: '1s' } as React.CSSProperties} />
      <ClayBlob className="w-32 h-32 top-1/3 left-1/4 animate-float" color="lavender" style={{ animationDelay: '3s' } as React.CSSProperties} />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-primary rounded-clay shadow-clay flex items-center justify-center animate-bounce-soft">
              <Plane className="w-8 h-8 text-primary-foreground" />
            </div>
            <span className="text-4xl font-extrabold text-primary">+</span>
            <div className="w-16 h-16 bg-secondary rounded-clay shadow-clay flex items-center justify-center animate-bounce-soft" style={{ animationDelay: '0.5s' }}>
              <Hotel className="w-8 h-8 text-secondary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3">
            机票 + 酒店搜索
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            一站式搜索，轻松规划您的完美旅程 ✨
          </p>
        </header>

        {/* Main Search Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-clay p-6 md:p-8 clay-surface">
            {/* Tabs */}
            <div className="flex gap-3 mb-8">
              <div className="flex-1 bg-primary/10 rounded-clay p-3 flex items-center justify-center gap-2 border-2 border-primary shadow-clay-inset">
                <Plane className="w-5 h-5 text-primary" />
                <span className="font-bold text-primary">机票</span>
              </div>
              <div className="flex-1 bg-secondary/20 rounded-clay p-3 flex items-center justify-center gap-2 border-2 border-secondary shadow-clay-inset">
                <Hotel className="w-5 h-5 text-secondary-foreground" />
                <span className="font-bold text-secondary-foreground">酒店</span>
              </div>
            </div>

            {/* Search Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Origin */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  出发地
                </label>
                <Input
                  placeholder="请输入出发城市"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  目的地
                </label>
                <Input
                  placeholder="请输入目的城市"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              {/* Departure Date */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-highlight-foreground" />
                  出发日期
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-medium h-12",
                        !departureDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {departureDate ? format(departureDate, "yyyy年MM月dd日") : "选择出发日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card border-2 border-border rounded-clay shadow-clay" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={departureDate}
                      onSelect={setDepartureDate}
                      initialFocus
                      className="pointer-events-auto rounded-clay"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Return Date */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-lavender-foreground" />
                  回程日期
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-medium h-12",
                        !returnDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "yyyy年MM月dd日") : "选择回程日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card border-2 border-border rounded-clay shadow-clay" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      className="pointer-events-auto rounded-clay"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Travelers */}
            <div className="mb-8">
              <label className="text-sm font-bold text-foreground flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-secondary-foreground" />
                旅客人数
              </label>
              <div className="flex items-center gap-4">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="w-12 h-12"
                >
                  <span className="text-xl font-bold">−</span>
                </Button>
                <div className="w-20 h-12 bg-card rounded-clay shadow-clay-inset flex items-center justify-center border-2 border-border">
                  <span className="text-xl font-bold text-foreground">{travelers}</span>
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setTravelers(Math.min(9, travelers + 1))}
                  className="w-12 h-12"
                >
                  <span className="text-xl font-bold">+</span>
                </Button>
                <span className="text-muted-foreground font-medium">位成人</span>
              </div>
            </div>

            {/* Search Button */}
            <Button
              variant="clay"
              size="xl"
              className="w-full"
              onClick={handleSearch}
            >
              <Search className="w-6 h-6" />
              搜索机票 + 酒店
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="flex justify-center gap-4 mt-12">
          {['primary', 'secondary', 'accent', 'highlight', 'lavender'].map((color, i) => (
            <div
              key={color}
              className="w-6 h-6 rounded-full shadow-clay animate-bounce-soft"
              style={{
                backgroundColor: `hsl(var(--${color}))`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-clay p-6 text-center hover:shadow-clay-hover hover:scale-[1.02] transition-all duration-300">
            <div className="w-14 h-14 bg-primary/20 rounded-clay mx-auto mb-4 flex items-center justify-center">
              <Plane className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">全球航线</h3>
            <p className="text-sm text-muted-foreground">覆盖全球主要城市航线</p>
          </div>
          <div className="bg-card rounded-2xl shadow-clay p-6 text-center hover:shadow-clay-hover hover:scale-[1.02] transition-all duration-300">
            <div className="w-14 h-14 bg-secondary/30 rounded-clay mx-auto mb-4 flex items-center justify-center">
              <Hotel className="w-7 h-7 text-secondary-foreground" />
            </div>
            <h3 className="font-bold text-foreground mb-2">优质酒店</h3>
            <p className="text-sm text-muted-foreground">精选舒适住宿体验</p>
          </div>
          <div className="bg-card rounded-2xl shadow-clay p-6 text-center hover:shadow-clay-hover hover:scale-[1.02] transition-all duration-300">
            <div className="w-14 h-14 bg-highlight/30 rounded-clay mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-bold text-foreground mb-2">超值套餐</h3>
            <p className="text-sm text-muted-foreground">机票酒店组合更省钱</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
