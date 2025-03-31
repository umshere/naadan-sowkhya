import { motion } from "framer-motion";

interface TimelineEvent {
  year: string;
  description: string;
}

interface JourneyTimelineProps {
  events: TimelineEvent[];
}

const JourneyTimeline = ({ events = [] }: JourneyTimelineProps) => {
  // Use default events if none are provided
  const timelineEvents = events.length > 0 ? events : [
    {
      year: "2009",
      description: "Completed Master of Business Administration from Calicut University"
    },
    {
      year: "2010-2016",
      description: "Worked for Saipem Angola – Africa, gaining international business experience"
    },
    {
      year: "2017",
      description: "Completed villa projects and started the new beginning of non-preservative food and non-chemical products"
    },
    {
      year: "2017-Present",
      description: "Established NAADAN SOWKHYA, selling natural products in different countries including India, Malaysia, and United Arab Emirates"
    }
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-serif font-bold text-center text-primary-dark mb-12">Our Journey</h2>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
        
        {/* Timeline Items */}
        <div className="space-y-16">
          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                {/* Timeline Dot */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-7 h-7 rounded-full border-4 border-primary bg-white z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.15 }}
                  viewport={{ once: true }}
                />
                
                {/* Content */}
                <div className={`ml-auto mr-auto w-full md:w-5/12 ${isEven ? 'md:pr-16 md:text-right md:ml-0' : 'md:pl-16 md:mr-0'}`}>
                  <h3 className="text-xl font-bold text-primary mb-2">{event.year}</h3>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <p className="text-gray-700">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JourneyTimeline;