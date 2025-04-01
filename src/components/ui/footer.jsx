import { useState } from 'react';
import { Moon, Sun, ChevronDown, ArrowRight } from 'lucide-react';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const items = [
    {
      title: 'Trust & Profit',
      content:
        'Yes. The accordion component adheres to the WAI-ARIA design pattern with proper ARIA attributes and keyboard navigation.',
    },
    {
      title: 'Regulatory Compliance Navigation',
      content:
        'Yes. The accordion is styled using Tailwind CSS with smooth transitions and hover effects.',
    },
    {
      title: 'Risk Mitigation',
      content:
        'Yes. The accordion features smooth height transitions and rotation animations for the chevron icon.',
    },
    {
      title: 'Cost Optimization',
      content:
        'Yes. The accordion component adheres to the WAI-ARIA design pattern with proper ARIA attributes and keyboard navigation.',
    },
    {
      title: 'Trade Agreements & Documentation',
      content:
        'Yes. The accordion is styled using Tailwind CSS with smooth transitions and hover effects.',
    },
    {
      title: 'Manpower & Supply Chain Management',
      content:
        'Yes. The accordion features smooth height transitions and rotation animations for the chevron icon.',
    },
    {
      title: '24/7 Platform Support',
      content:
        'Yes. The accordion component adheres to the WAI-ARIA design pattern with proper ARIA attributes and keyboard navigation.',
    },
   
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="">
    <div className="min-h-[70vh] bg-transparent p-6 lg:p-12">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Frequently asked questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Contact us via support if you have any more questions.
            </p>
            <button  className="mt-4 bg-blue-500 p-2 rounded-xl">
              Contact us
            </button>
          </div>
          <div className="">
            {items.map((item, index) => (
              <div key={index} className="w-full my-3">
                <button
                  onClick={() => toggleAccordion(index)}
                 className=" [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)] rounded-xl py-4 px-6 flex justify-between items-center w-full"
                  aria-expanded={openIndex === index}
                  aria-controls={`content-${index}`}
                >
                  <span className="text-white font-medium">
                    {item.title}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  id={`content-${index}`}
                  role="region"
                  aria-labelledby={`heading-${index}`}
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    openIndex === index ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <div className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <section className="container px-2 mx-auto  text-center">
        <div className="bg-gradient-to-r from-blue-900 via-red-500 to-purple-900 rounded-t-3xl p-12 py-16 -z-10">
          
      {/* Footer */}
      <footer className="container  mx-auto px-4 py-12 rounded-2xl  bg-black/35">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Platform</h3>
            <p className="text-gray-400">Explore Modern way of exporting importing consultancy </p>
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

        <div className=" border-t border-gray-600 mt-8 text-start pt-8 flex flex-col justify-center items-center gap-2">
          <h1 className='font-bold text-2xl'>News and updates</h1>
          <p>Sign up to the Design Engineers Weekly newsletter</p>
          <form action="" className='space-x-2 flex justify-between items-center'>
          <input type="email" placeholder='email ' className='rounded-xl border border-neutral-600 p-2 pe-16 bg-black/20'/>
          <button className="bg-white text-black hover:bg-gray-100 px-2  py-2 rounded-xl text-md font-medium inline-flex items-center gap-2 transition-all hover:gap-3">
                     Sign Up <ArrowRight size={20} />
                   </button>
        </form>
        </div>
      </footer>
      </div>
      </section>
    </div>
  );
}

export default App;