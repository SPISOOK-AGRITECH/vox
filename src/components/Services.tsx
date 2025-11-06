import { Card, CardContent } from "@/components/ui/card";
import { Film, Home, Speaker } from "lucide-react";
import cinemaImage from "@/assets/service-cinema.jpg";
import interiorImage from "@/assets/service-interior.jpg";
import audioImage from "@/assets/service-audio.jpg";

const services = [
  {
    icon: Film,
    title: "Home Cinema",
    description: "State-of-the-art cinema rooms with 4K projection, immersive sound systems, and luxury seating designed for the ultimate viewing experience.",
    image: cinemaImage,
    features: ["4K/8K Projection", "Dolby Atmos Sound", "Custom Seating", "Acoustic Design"]
  },
  {
    icon: Home,
    title: "Interior Works",
    description: "Sophisticated interior design solutions that blend aesthetics with functionality, creating spaces that reflect your style and enhance your lifestyle.",
    image: interiorImage,
    features: ["Space Planning", "Custom Furniture", "Lighting Design", "Material Selection"]
  },
  {
    icon: Speaker,
    title: "Home Theater",
    description: "Professional audio-visual installations featuring cutting-edge technology and premium components for an unparalleled entertainment experience.",
    image: audioImage,
    features: ["Premium Audio Systems", "Smart Automation", "Cable Management", "Calibration Services"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Premium Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Delivering excellence in every project with meticulous attention to detail and uncompromising quality
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="overflow-hidden group hover:shadow-card transition-smooth cursor-pointer border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-60" />
                
                {/* Icon */}
                <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-glow">
                  <service.icon className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
