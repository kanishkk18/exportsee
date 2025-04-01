import React from 'react';
import { 
    ArrowRight, 
    Box, 
    Shield, 
    Zap, 
    Code2, 
    Server, 
    Database,
    Cloud,
    Monitor,
    File,
    Terminal,
    Lock,
    ChevronRight,
    ChevronLeft,
    ArrowRightIcon
  } from 'lucide-react';
  import VideoPlayer from 'components/ui/hover-video-player';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <nav className="flex justify-between items-center mb-20 mx-4 pt-4">
          <div className="text-2xl font-bold">Platform</div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-blue-400 transition-colors">Products</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Solutions</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Resources</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Pricing</a>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition-colors">
            Get Started
          </button>
        </nav>
      <header className="container mx-auto px-6 pt-6 flex">
       

        <div className=" max-w-4xl mx-auto mb-20 p-6">
          <h1 className="text-2xl text-start md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
            No.1 Export <br/> Import DGFT consultancy
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            We Speacialse in DGFT and custom Consulting across India
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full text-lg font-medium inline-flex items-center gap-2 transition-all hover:gap-3">
            Try it free <ArrowRight size={20} />
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative mb-32">
          <div className="absolute inset-0 bg-gradient-blur"></div>
          <VideoPlayer/>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Zap className="text-blue-400" />, title: "Lightning Fast Builds", desc: "Optimize your CI/CD pipeline" },
            { icon: <Shield className="text-blue-400" />, title: "Enterprise Security", desc: "Bank-grade security protocols" },
            { icon: <Code2 className="text-blue-400" />, title: "Smart Code Analysis", desc: "AI-powered code review" },
            { icon: <Server className="text-blue-400" />, title: "Scalable Infrastructure", desc: "Cloud-native architecture" }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition-all">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CI/CD Pipeline Section */}
      <section className="container mx-auto px-4 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Streamline your CI/CD pipelines with AI</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Harness the power of artificial intelligence to optimize your development workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Pipeline Visualization */}
         

          {/* Metrics Dashboard */}
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
            <h3 className="text-xl font-bold mb-6">Build Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-400 mb-2">98%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400 mb-2">2.5x</div>
                <div className="text-gray-400">Faster Builds</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-400 mb-2">45%</div>
                <div className="text-gray-400">Cost Reduction</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
                <div className="text-gray-400">Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Code Section */}
     

      {/* Platform Support */}
      <section className="container mx-auto px-4 mb-32 text-center">
        <h2 className="text-4xl font-bold mb-16">Any app. Anywhere.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 justify-items-center">
          {[
            <Cloud size={32} />, 
            <Database size={32} />, 
            <Terminal size={32} />,
            <Monitor size={32} />,
            <File size={32} />,
            <Lock size={32} />,
            <Box size={32} />,
            <Server size={32} />
          ].map((icon, index) => (
            <div key={index} className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors">
              {icon}
            </div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="container mx-auto px-4 mb-32">
        <h2 className="text-4xl font-bold mb-16 text-center">Hear from our customers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              company: "TechCorp",
              image: "https://images.unsplash.com/photo-1496389395181-e5fdd5c0315e?auto=format&fit=crop&w=600&q=80",
              quote: "Reduced our deployment time by 80% and improved reliability.",
              author: "Sarah Chen, CTO"
            },
            {
              company: "DataFlow",
              image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
              quote: "The AI-powered analytics have transformed our workflow.",
              author: "Mike Johnson, Lead DevOps"
            },
            {
              company: "CloudScale",
              image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=600&q=80",
              quote: "Enterprise-grade security with startup-level agility.",
              author: "Alex Rivera, CEO"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-gray-900 rounded-xl overflow-hidden">
              <img 
                src={testimonial.image} 
                alt={testimonial.company}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                <p className="text-sm text-gray-400">{testimonial.author}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security Section */}
      <section className="container mx-auto px-4 mb-32 text-center">
        <div className="bg-gradient-to-b from-blue-900/50 to-transparent rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-8">With a focus on security.<br/>At every step.</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { title: "End-to-end Encryption", desc: "Data protection at rest and in transit" },
              { title: "Access Controls", desc: "Role-based access management" },
              { title: "Audit Logging", desc: "Comprehensive activity tracking" },
              { title: "Compliance", desc: "SOC2, HIPAA, GDPR compliant" }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-900/50 p-6 rounded-xl">
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 mb-32 text-center">
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4">Try Platform for free today</h2>
          <p className="text-gray-300 mb-8">Get started with our 14-day free trial. No credit card required.</p>
          <button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-medium inline-flex items-center gap-2 transition-all hover:gap-3">
            Start Free Trial <ArrowRightIcon size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Platform</h3>
            <p className="text-gray-400">Modern software delivery platform for teams of all sizes.</p>
          </div>
          {['Product', 'Company', 'Resources'].map((title, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold mb-4">{title}</h3>
              <ul className="space-y-2 text-gray-400">
                {[1, 2, 3, 4].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {title} Link {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
    );
};

export default HomePage;