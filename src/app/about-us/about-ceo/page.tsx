import React from 'react';

// Import components
import Breadcrumbs from '@/components/about/ceo/Breadcrumbs';
import CEOProfile from '@/components/about/ceo/CEOProfile';
import VisionMission from '@/components/about/ceo/VisionMission';
import JourneyTimeline from '@/components/about/ceo/JourneyTimeline';
import CTASection from '@/components/about/ceo/CTASection';

// Import data
import aboutData from '@/data/about.json';

export default function AboutCEOPage() {
  const { founder, mission, vision } = aboutData;
  
  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'About CEO', isCurrentPage: true }
  ];

  // Timeline events
  const timelineEvents = [
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
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Page Header */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">About Our Founder</h1>
            <p className="text-gray-600">
              Meet the visionary behind NAADAN SOWKHYA
            </p>
          </div>
          
          {/* CEO Profile */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12 p-6">
            <CEOProfile 
              name={founder.name}
              image={founder.image}
              title="Founder & CEO, NAADAN SOWKHYA"
              description={founder.description}
            />
          </div>
          
          {/* Vision & Mission */}
          <VisionMission vision={vision} mission={mission} />
          
          {/* Journey Timeline */}
          <div className="mb-12">
            <JourneyTimeline events={timelineEvents} />
          </div>
          
          {/* CTA */}
          <CTASection />
        </div>
      </div>
    </div>
  );
}