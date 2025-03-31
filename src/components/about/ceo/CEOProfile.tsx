import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CEOProfileProps {
  name: string;
  image: string;
  title?: string;
  description: string;
  achievements?: string[];
  quote?: string;
}

const CEOProfile = ({
  name,
  image,
  title = "Founder & CEO",
  description,
  achievements = [],
  quote
}: CEOProfileProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="w-full lg:w-1/3 max-w-sm mx-auto">
        <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[3/4] w-full max-w-sm">
          <Image 
            src={image || "/images/about/placeholder.jpg"} 
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>
      
      <div className="lg:w-2/3 space-y-4">
        <div>
          <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary">Founder & CEO</Badge>
          <h2 className="text-3xl font-serif font-bold text-primary-dark">{name}</h2>
          <p className="text-gray-500 italic">{title}</p>
        </div>
        
        <Separator className="my-4" />
        
        <div className="prose prose-green max-w-none">
          {description.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">{paragraph}</p>
          ))}
          
          {quote && (
            <blockquote className="border-l-4 border-primary pl-4 italic my-6">
              "{quote}"
            </blockquote>
          )}
        </div>
        
        {achievements && achievements.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-primary-dark mb-3">Achievements</h3>
            <ul className="space-y-2">
              {achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CEOProfile;
