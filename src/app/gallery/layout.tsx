import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Sowkhya Products',
  description: 'Explore our product displays, manufacturing process, events and team moments at Sowkhya Products.',
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
