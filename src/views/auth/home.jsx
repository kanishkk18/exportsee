import React, { useState } from "react";
import { 
    ArrowRight, 
    Box, 
    Shield, 
    Zap, 
    Code2, 
    Server, 
  } from 'lucide-react';
  import VideoPlayer from 'components/ui/hover-video-player';
  import Carousel from 'components/ui/carousel';
  import { HoverEffect } from "components/ui/card-hover-effect";
  import TextGenerationEffect from "components/ui/text-generation-effect.jsx";
  import Footer from "components/ui/footer"
  import TopNavbar from "components/navbar/TopNavbar";
  import { Link } from "react-router-dom";
  // import HeroVideoDialog from "components/ui/HeroVideoDialog";
  
const HomePage = () => {
  const [openIndex, setOpenIndex] = useState(null);


 const projects = [
    {
      title: "EXPORT FUNDING",
      description:
        "Export Funding is a financial service that helps businesses manage cash flow while exporting goods or services. It ensures exporters receive payments on time while reducing risks associated with international trade.",
    },
    {
      title: "MANPOWER & STAFFING SERVICES",
      description:
        "Manpower & Staffing Services focus on sourcing, recruiting, and managing skilled professionals for businesses across various industries. These services help companies reduce hiring time, access a wider talent pool, and manage workforce flexibility.",
    },
    {
      title: "COMPLIANCE ASSURANCE",
      description:
        "Under Star Export House Scheme, the Government of India provides several benefits to exporters based on the export performance of the company in each financial year.",
    },
    {
      title: "REGULATORY AFFAIRS",
      description:
        "Service Export from India Scheme is an incentive for service exporters given by the Ministry of Commerce to promote the export of services from India.",
    },
    {
      title: "BUSINESS DEVELOPMENT",
      description:
        "Remission of Duties and Taxes on Export Products is a new scheme to ensure that the exporters receive the refunds on the embedded taxes and duties.",
    },
    {
      title: "BRANDING & MARKETING",
      description:
        "AEO is a trade facilitation scheme for ease of doing business that entitles privilege, benefits, exemption and relaxation to importers, exporters & other stakeholders.",
    },
    {
      title: "PROCUREMENT & VENDOR MANAGEMENT",
      description:
        "The MEIS Scheme was launched as an incentive scheme for the export of goods. The rewards are given by way of duty credit scrips to exporters. ",
      link: "https://stripe.com",
    },
    {
      title: "QUALITY CONTROL & INSPECTION",
      description:
        "Advance Authorization Scheme allows import of inputs to be made duty-free if they are physically incorporated in a product which is going to be exported.",
      link: "https://netflix.com",
    },
    {
      title: "RISK MITIGATION",
      description:
        "Transport and Marketing Assistance scheme is launched for agricultural products. It aims to provide less expensive transportation and marketing of goods.",
      link: "https://google.com",
    },
    {
      title: "GOVERNMENT SCHEMES",
      description:
        "Transport and Marketing Assistance scheme is launched for agricultural products. It aims to provide less expensive transportation and marketing of goods.",
      link: "https://google.com",
    },
    {
      title: "END TO END TRANSPORTATION",
      description:
        "Transport and Marketing Assistance scheme is launched for agricultural products. It aims to provide less expensive transportation and marketing of goods.",
      link: "https://google.com",
    },
    {
      title: "CUSTOM & PORT CLEARANCE SUPPORT",
      description:
        "Transport and Marketing Assistance scheme is launched for agricultural products. It aims to provide less expensive transportation and marketing of goods.",
      link: "https://google.com",
    },
   
  ];

  const slideData = [
    {
      title: "PHARMACEUTICALS & HEALTHCARE EQUIPMENTS ",
      button: "Explore More",
      src: "https://apeda.gov.in/",
    },
    {
      title: "OILS & SEED PRODUCTS ",
      button: "Explore More",
      src: "https://iopepc.org/",
    },
   
    {
      title: "SPORTS GOODS",
      button: "Explore More ",
      src: "http://sportsgoodsindia.org/",
    },
    {
      title: "CHEMICALS & ALLIED PRODUCTS ",
      button: "Explore More",
      src: "https://capexil.org/",
    },
    {
      title: "HANDICRAFT & HOME FURNISHING ",
      button: "Explore More",
      src: "https://www.epch.in/",
    },
    {
      title: "METAL & WOODER PRODUCTS",
      button: "Explore More",
      src: "https://www.ey.com/adobe/dynamicmedia/deliver/dm-aid--ecc2b950-49c7-43f2-b20a-d75675d1c683/ey-lab-glassware-science-laboratory-research-and-development-concept.jpg?preferwebp=true&quality=85",
    },
    {
      title: "GEMS & JEWELLERY",
      button: "Explore More",
      src: "https://gjepc.org/",
    },
    {
      title: "APPAREALS",
      button: "Explore More",
      src: "http://aepcindia.com/",
    },
      {
      title: "KITCHENWARE & GIFT ITEMS",
      button: "Explore More",
      src: "http://aepcindia.com/",
    },
  ];
  
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };
  
    return (
        <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <TopNavbar/>
      <nav className="flex justify-between items-center mb-20 mx-4 pt-4">
          <div className="">
            <img src="https://media-del1-2.cdn.whatsapp.net/v/t61.24694-24/473408572_1590238345196986_2661325784945347044_n.jpg?ccb=11-4&oh=01_Q5AaIIEly7YLqEHIcPljfueiryb3HKc2vgklOF4MCSQU82wt&oe=67BF13AB&_nc_sid=5e03e0&_nc_cat=107" 
          className="h-16 w-16" alt="" />
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-blue-400 transition-colors">Home </a>
            <a href="#" className="hover:text-blue-400 transition-colors">Services</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Logistics</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a>

          </div>
          <a href="/signin" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition-colors">
            Sign In
          </a>
        </nav>
      <header className="container mx-auto px-6 pt-6 flex">
       

        <div className=" max-w-4xl mx-auto mb-20 p-6">
          <h1 className="text-2xl text-start md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
            EXPORTSEESE<br/>EXPORT IMPORT <br/> CONSULTANT AND BUYING HOUSE 
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            To support buyers and sellers in finding right partner for multiple products Managing compliance for companies related to DGFT & CUSTOM International Logistic & freight forwarding services 
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

      {/* <div className="">
     
     <HeroVideoDialog
       className="dark:block"
       animationStyle="top-in-bottom-out"
       videoSrc="https://www.youtube.com/embed/38vGOQlTIE8?si=al0kAvxa8354D9wY"
       thumbnailSrc="#"
       thumbnailAlt="Hero Video"
     />
   </div> */}

      <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>

   
     
    <section className="container mx-auto px-20 pb-32">
    <div className="flex flex-col my-16 text-center items-center space-y-3">
    <TextGenerationEffect
  text="ONE OF THE LEADING BUSINESS CONSULTANTS IN INDIA
"
  className="text-lg font-semibold text-center"
  delay={50}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.2}
  rootMargin="-50px"
  onLetterAnimationComplete={handleAnimationComplete}
/>
    <TextGenerationEffect
  text="Our business consulting services at a glance
"
  className="text-3xl font-semibold text-center"
  delay={50}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.2}
  rootMargin="-50px"
  onLetterAnimationComplete={handleAnimationComplete}
/>
</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              company: "TechCorp",
              image: "https://media.istockphoto.com/id/1454531939/photo/aerial-top-view-containers-ship-cargo-business-commercial-trade-logistic-and-transportation.jpg?s=612x612&w=0&k=20&c=7dc26jnLMMs3elOwGXa-04p8qeMRKBNoCVD3aff7kuE=",
              quote: "Export Import Registration and Licensing",
              author: "We offer export import registration and licensing including MSME, GST, Shop & Establishment, IEC, and import monitoring system registration under this category of services."
            },
            {
              company: "DataFlow",
              image: "https://ascgroup8.wordpress.com/wp-content/uploads/2025/01/image-2.png",
              quote: "AEO Certification",
              author: "We offer Authorised Economic Operator Certification Services for all including AEO tiers i.e. AEO T1, AEO T2, AEO T3 and AEO LO under this category of services"
            },
            {
              company: "CloudScale",
              image: "https://www.eprconnect.in/assets/images/pages/otherservice/img-service.png",
              quote: "EPR Registration & Compliance",
              author: "We offer EPR Registration and compliance services for Plastic Waste, E-Waste and Battery Waste under this category of services."
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

    <div className="w-full  mx-auto px-16 text-center mt-10">
      <div className="flex flex-col text-center items-center space-y-3">
    <TextGenerationEffect
  text="Exportesses Consulting Specialists PAN INDIA
"
  className="text-lg font-semibold text-center"
  delay={50}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.2}
  rootMargin="-50px"
  onLetterAnimationComplete={handleAnimationComplete}
/>
    <TextGenerationEffect
  text="Offered Services"
  className="text-3xl font-semibold text-center"
  delay={50}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.2}
  rootMargin="-50px"
  onLetterAnimationComplete={handleAnimationComplete}
/>
</div>
    
      <HoverEffect items={projects} />
    </div>

    <section className="container mx-auto px-4 pb-32 mt-6 text-center">
        <div className="bg-gradient-to-b from-blue-900/50 to-transparent rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-8">We make represantation and appear <br/> on your behalf before:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   {[
                     { icon: <Zap className="text-blue-400" />, title: "Commissioner of Customs", desc: "Optimize your CI/CD pipeline" },
                     { icon: <Shield className="text-blue-400" />, title: "Commissioner of Customs Appeal", desc: "Bank-grade security protocols" },
                     { icon: <Code2 className="text-blue-400" />, title: "Additional commissioner of DGFT", desc: "AI-powered code review" },
                     { icon: <Server className="text-blue-400" />, title: "Director General of DGFT", desc: "Cloud-native architecture" },
                     { icon: <Zap className="text-blue-400" />, title: "Principal commissioner of GST", desc: "Optimize your CI/CD pipeline" },
                     { icon: <Shield className="text-blue-400" />, title: "CESTAT", desc: "Bank-grade security protocols" },
                     { icon: <Code2 className="text-blue-400" />, title: "Courts and Tribunals", desc: "AI-powered code review" },
                     { icon: <Server className="text-blue-400" />, title: "RERA Authority and Appeals", desc: "Cloud-native architecture" }
                   ].map((feature, index) => (
                     <div key={index} className="bg-gray-900 p-6 rounded-xl border text-start border-gray-800 hover:border-blue-500 transition-all">
                       <div className="mb-4">{feature.icon}</div>
                       <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                       <p className="text-gray-400">{feature.desc}</p>
                     </div>
                   ))}
                 </div>
        </div>
      </section>

      <div className="mx-10 sm:px-6 lg:px-8 pb-16">
      <div className="relative isolate overflow-hidden  px-6 py-20 text-center border-neutral-700 sm:rounded-3xl sm:border  sm:px-16 sm:shadow-sm">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight  sm:text-4xl">
          Start using Exportsee Now!
        </h2>
        <h3 className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
        Exportsee makes it easy for you to ship to anywhere Around the Globe
        </h3>
        <div className="mt-8 flex items-center justify-center gap-x-6">
        <button className="bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-full text-lg font-medium inline-flex items-center gap-2 transition-all hover:gap-3">
            Start Free Trial <ArrowRight size={20} />
          </button>
        </div>
        {/* gradient svg */}
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.9"
          ></circle>
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#3b82f6" />
              <stop offset={1} stopColor="#1d4ed8" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>

<Footer/>
    </div>
    );
};

export default HomePage;
