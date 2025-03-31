"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VisionMissionProps {
  vision: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
}

const VisionMission = ({ vision, mission }: VisionMissionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
      <Card className="overflow-hidden border-earth-khaki/20">
        <CardContent className="p-6 bg-cream">
          <Badge variant="outline" className="mb-2 bg-earth-terracotta/10 text-earth-terracotta border-earth-terracotta">Our Vision</Badge>
          <h3 className="text-xl font-serif font-medium text-earth-terracotta mb-2">{vision.title}</h3>
          <p className="text-gray-700">{vision.description}</p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-primary overflow-hidden">
        <CardContent className="p-6 bg-tertiary-light/40">
          <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary">Our Mission</Badge>
          <h3 className="text-xl font-serif font-medium text-primary-dark mb-2">{mission.title}</h3>
          <p className="text-gray-700">{mission.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisionMission;
