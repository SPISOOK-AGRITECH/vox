import { Award, Shield, Sparkles, Users } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "We use only the finest materials and cutting-edge technology to ensure exceptional results that stand the test of time."
  },
  {
    icon: Shield,
    title: "Trusted Expertise",
    description: "Over 15 years of experience delivering world-class installations with meticulous attention to every detail."
  },
  {
    icon: Sparkles,
    title: "Bespoke Solutions",
    description: "Every project is uniquely tailored to your vision, lifestyle, and space requirements for a truly personalized experience."
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "From initial consultation to post-installation care, our team is committed to ensuring your complete satisfaction."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 lg:py-32 gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Experience the difference that passion, precision, and professionalism can make
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={value.title}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 border-2 border-secondary mb-6 shadow-glow">
                <value.icon className="w-8 h-8 text-secondary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-primary-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-primary-foreground/80">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-primary-foreground/20 pt-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary mb-2">500+</div>
            <div className="text-primary-foreground/80">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary mb-2">850+</div>
            <div className="text-primary-foreground/80">Projects Done</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary mb-2">15+</div>
            <div className="text-primary-foreground/80">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary mb-2">100%</div>
            <div className="text-primary-foreground/80">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
