
import React from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

interface ContactInfoProps {
  isVisible: boolean;
}

const ContactInfo = ({ isVisible }: ContactInfoProps) => {
  const contactItems = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@kundhan.dev",
      description: "Drop me a line anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Available Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "New York, NY",
      description: "Open to remote work globally"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      description: "Usually much faster!"
    }
  ];

  return (
    <div className="space-y-6">
      {contactItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className={`bg-white/60 dark:bg-card/70 backdrop-blur-md rounded-2xl p-6 border border-primary/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 ${
              isVisible ? 'animate-fade-in' : 'opacity-0 translate-x-10'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg">
                <Icon className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
                <p className="text-lg font-medium text-foreground mb-1">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactInfo;
