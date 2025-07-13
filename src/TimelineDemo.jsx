import HorizontalTimeline from './HorizontalTimeline';

const TimelineDemo = () => {
  const sampleEvents = [
    {
      dateTime: '2024-01-15T10:00:00Z',
      title: 'Project Launch',
      shortDescription: 'Successfully launched our new product to the market.',
      description: 'This was a major milestone for our company. After months of development, testing, and preparation, we finally launched our innovative product. The launch exceeded all expectations with over 1000 sign-ups in the first week.',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=200&fit=crop',
      imageAlt: 'Team celebrating product launch',
      imageCaption: 'Team celebration at product launch event',
      tags: ['Launch', 'Product', 'Milestone'],
      backgroundColor: '#e3f2fd'
    },
    {
      dateTime: '2024-03-22T14:30:00Z',
      title: 'Major Update Release',
      shortDescription: 'Released version 2.0 with enhanced features.',
      description: 'Version 2.0 brings significant improvements to user experience, including a redesigned interface, improved performance, and new advanced features that our users have been requesting.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop',
      imageAlt: 'Software development team working',
      imageCaption: 'Development team working on version 2.0',
      tags: ['Update', 'Features', 'UX'],
      backgroundColor: '#f3e5f5'
    },
    {
      dateTime: '2024-06-10T09:00:00Z',
      title: 'Partnership Announcement',
      shortDescription: 'Formed strategic partnership with industry leader.',
      description: 'We are excited to announce our partnership with a leading company in the industry. This collaboration will help us expand our reach and provide even better services to our customers.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=200&fit=crop',
      imageAlt: 'Business partnership handshake',
      imageCaption: 'Strategic partnership signing ceremony',
      tags: ['Partnership', 'Growth', 'Collaboration'],
      backgroundColor: '#e8f5e8'
    },
    {
      dateTime: '2024-09-05T16:45:00Z',
      title: 'Award Recognition',
      shortDescription: 'Received industry excellence award.',
      description: 'We are honored to receive the Industry Excellence Award for innovation and outstanding customer service. This recognition validates our commitment to quality and continuous improvement.',
      image: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=400&h=200&fit=crop',
      imageAlt: 'Award ceremony',
      imageCaption: 'Receiving the Industry Excellence Award',
      tags: ['Award', 'Recognition', 'Excellence'],
      backgroundColor: '#fff3e0'
    },
    {
      dateTime: '2024-11-20T12:00:00Z',
      title: 'Global Expansion',
      shortDescription: 'Expanded operations to 5 new countries.',
      description: 'Our international expansion has been a tremendous success. We now serve customers in over 20 countries worldwide, with dedicated support teams in each region to ensure the best possible experience.',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=200&fit=crop',
      imageAlt: 'World map showing global expansion',
      imageCaption: 'Our global presence continues to grow',
      tags: ['Expansion', 'Global', 'Growth'],
      backgroundColor: '#f0f4ff'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Advanced Horizontal Timeline
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Interactive timeline with drag support, smooth animations, and rich content
        </p>
        
        <HorizontalTimeline
          events={sampleEvents}
          cardWidth={350}
          cardHeight={400}
          spacing={24}
          showBullets={true}
          showArrows={true}
          dragEnabled={true}
          backgroundColor="#ffffff"
          accentColor="#1976d2"
          customComponents={{
            0: (
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-blue-700">🚀 Custom component for launch event!</p>
              </div>
            ),
            2: (
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <p className="text-sm text-green-700">🤝 Partnership milestone achieved!</p>
              </div>
            )
          }}
        />
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Try dragging the timeline, clicking the arrows, or using the bullet navigation!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineDemo;