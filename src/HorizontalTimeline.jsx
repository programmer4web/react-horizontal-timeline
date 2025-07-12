import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HorizontalTimeline = ({
  events = [],
  cardWidth = 320,
  cardHeight = 400,
  spacing = 20,
  showBullets = true,
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  dragEnabled = true,
  backgroundColor = '#f5f5f5',
  accentColor = '#1976d2',
  customComponents = {}
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  
  const totalWidth = events.length * (cardWidth + spacing);
  const visibleWidth = containerRef.current?.offsetWidth || 800;
  const maxTranslate = Math.max(0, totalWidth - visibleWidth);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && events.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, events.length]);

  // Update translate based on current index
  useEffect(() => {
    const newTranslate = Math.min(
      currentIndex * (cardWidth + spacing),
      maxTranslate
    );
    setTranslateX(newTranslate);
  }, [currentIndex, cardWidth, spacing, maxTranslate]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < events.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBulletClick = (index) => {
    setCurrentIndex(index);
  };

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  // Drag handlers
  const handleMouseDown = (e) => {
    if (!dragEnabled) return;
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragEnabled) return;
    const diff = dragStart - e.clientX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging || !dragEnabled) return;
    setIsDragging(false);
    
    const newTranslate = Math.max(0, Math.min(translateX + dragOffset, maxTranslate));
    const newIndex = Math.round(newTranslate / (cardWidth + spacing));
    setCurrentIndex(Math.max(0, Math.min(newIndex, events.length - 1)));
    setDragOffset(0);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (!dragEnabled) return;
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !dragEnabled) return;
    const diff = dragStart - e.touches[0].clientX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const formatDate = (dateTime) => {
    return new Date(dateTime).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const currentTranslate = translateX + dragOffset;

  return (
    <div
      className="w-full p-6 rounded-lg overflow-hidden relative"
      style={{ backgroundColor }}
    >
      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === events.length - 1}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Timeline Container */}
      <div
        ref={containerRef}
        className="overflow-hidden select-none"
        style={{
          cursor: dragEnabled ? (isDragging ? 'grabbing' : 'grab') : 'default'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Timeline Line */}
        <div
          className="h-1 mb-4 rounded-full relative"
          style={{ backgroundColor: accentColor }}
        />

        {/* Cards Container */}
        <div
          ref={timelineRef}
          className="flex transition-transform duration-300 ease-out"
          style={{
            gap: `${spacing}px`,
            transform: `translateX(-${currentTranslate}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            width: `${totalWidth}px`
          }}
        >
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex-shrink-0"
              style={{
                width: cardWidth,
                minHeight: cardHeight,
                backgroundColor: event.backgroundColor || '#ffffff'
              }}
            >
              {/* Date Badge */}
              <div
                className="absolute top-3 right-3 z-10 text-white px-2 py-1 rounded text-xs font-bold"
                style={{ backgroundColor: accentColor }}
              >
                {formatDate(event.dateTime)}
              </div>

              {/* Image */}
              {event.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.imageAlt || event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {/* Image Caption */}
                  {event.imageCaption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs px-2 py-1">
                      {event.imageCaption}
                    </div>
                  )}
                </div>
              )}

              <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {event.title}
                </h3>

                {/* Short Description */}
                {event.shortDescription && (
                  <p className="text-sm text-gray-600 mb-3">
                    {event.shortDescription}
                  </p>
                )}

                {/* Custom Component */}
                {customComponents[index] && (
                  <div className="my-4">
                    {customComponents[index]}
                  </div>
                )}

                {/* Expand Button */}
                {event.description && (
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="flex items-center gap-2 text-sm mb-3 px-3 py-1 rounded-md transition-colors duration-200 hover:bg-gray-100"
                    style={{ color: accentColor }}
                  >
                    {expandedCards.has(index) ? 'Show Less' : 'Read More'}
                    <span className="text-lg">
                      {expandedCards.has(index) ? '▲' : '▼'}
                    </span>
                  </button>
                )}

                {/* Expanded Description */}
                {expandedCards.has(index) && (
                  <div className="mb-3 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">
                      {event.description}
                    </p>
                  </div>
                )}

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs rounded-full border transition-colors duration-200 hover:bg-opacity-10"
                        style={{
                          borderColor: accentColor,
                          color: accentColor,
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = `${accentColor}20`;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bullet Navigation */}
      {showBullets && (
        <div className="flex justify-center gap-2 mt-4">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => handleBulletClick(index)}
              className="w-3 h-3 rounded-full transition-all duration-200 hover:scale-125"
              style={{
                backgroundColor: index === currentIndex ? accentColor : 'rgba(0, 0, 0, 0.3)'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HorizontalTimeline;
