
import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

interface ContactFormProps {
  isVisible: boolean;
}

const ContactForm = ({ isVisible }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      }, 3000);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className={`bg-white/60 dark:bg-card/70 backdrop-blur-md rounded-2xl p-8 border border-primary/10 shadow-lg transition-all duration-700 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center py-12">
          <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
          <h3 className="text-2xl font-bold text-primary mb-4">Message Sent!</h3>
          <p className="text-muted-foreground">
            Thank you for reaching out. I'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/60 dark:bg-card/70 backdrop-blur-md rounded-2xl p-8 border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-700 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-primary">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/50 dark:bg-card/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200"
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-primary">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/50 dark:bg-card/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-primary">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/50 dark:bg-card/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200"
            placeholder="What's this about?"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-primary">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            required
            className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/50 dark:bg-card/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Tell me about your project, goals, timeline, or anything else you'd like to discuss..."
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
        >
          <Send size={20} />
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
