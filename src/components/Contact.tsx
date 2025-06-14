
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";

const Contact = () => {
  const [setRef, isVisible] = useIntersectionObserver(0.1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="py-20 px-4 max-w-6xl mx-auto relative" ref={setRef}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue/10 to-cyan/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 font-playfair text-primary transition-all duration-700 ${isVisible ? 'animate-scale-in' : 'opacity-0 translate-y-10'}`}>
            Let's Connect
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full transition-all duration-700 delay-200 ${isVisible ? 'animate-slide-in-right' : 'opacity-0 scale-x-0'}`} />
          <p className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}>
            Ready to build something amazing together? Let's discuss your next project!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`space-y-8 transition-all duration-700 delay-400 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-x-10'}`}>
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Get in Touch</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always excited to discuss new opportunities, collaborate on interesting projects, 
                or simply chat about technology and innovation.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-primary">Email</div>
                  <a href="mailto:kundhan.contact@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    kundhan.contact@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-primary">LinkedIn</div>
                  <a 
                    href="https://www.linkedin.com/in/kundhanmiriyala/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Connect with me
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple to-pink flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-primary">Location</div>
                  <div className="text-muted-foreground">Available for remote work</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`bg-white/60 dark:bg-card/70 backdrop-blur-md rounded-2xl p-8 border border-primary/10 shadow-lg transition-all duration-700 delay-500 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-x-10'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/50 dark:bg-card/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/50 dark:bg-card/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/50 dark:bg-card/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/50 dark:bg-card/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
                  placeholder="Tell me about your project or idea..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 animate-fade-in">
                  <CheckCircle size={16} />
                  <span className="text-sm">Thanks for reaching out! I'll get back to you soon.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
