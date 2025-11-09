import { Card, CardContent } from "@/components/ui/card";
import { Home, Sofa, Layers, Settings } from "lucide-react";
import residentialImage from "@/assets/service-residential.jpg";
import furnitureImage from "@/assets/service-furniture.jpg";
import ceilingImage from "@/assets/service-ceiling.jpg";
import automationImage from "@/assets/service-automation.jpg";

const services = [
  {
    icon: Home,
    title: "Residential Interiors",
    description: "Complete interior design solutions for your home including living rooms, bedrooms, modular kitchens, and dining areas with expert space planning and material selection.",
    image: residentialImage,
    features: ["Living Room Design", "Modular Kitchens", "Bedroom Interiors", "Space Planning"]
  },
  {
    icon: Sofa,
    title: "Custom Furniture & Carpentry",
    description: "Bespoke furniture solutions including wardrobes, TV units, beds, sofas, and dining sets crafted with precision and quality materials.",
    image: furnitureImage,
    features: ["Wardrobes & Storage", "TV Units & Panels", "Custom Furniture", "False Ceilings"]
  },
  {
    icon: Layers,
    title: "Ceiling Design",
    description: "Sophisticated ceiling solutions including gypsum, grid, wooden, and acoustic ceilings that add elegance and functionality to your spaces.",
    image: ceilingImage,
    features: ["Gypsum Ceilings", "Grid Ceilings", "Wooden Ceilings", "Acoustic Solutions"]
  },
  {
    icon: Settings,
    title: "Home Automation & Cinema",
    description: "Smart home integration with luxury home theater setups, acoustic paneling, projector systems, and AV installations for an immersive experience.",
    image: automationImage,
    features: ["Smart Home Systems", "Home Theater Setup", "AV Installation", "Acoustic Paneling"]
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
