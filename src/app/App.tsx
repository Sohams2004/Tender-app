import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { ProfileCard } from './components/ProfileCard';
import { MatchPopup } from './components/MatchPopup';
import { Heart } from 'lucide-react';

// Add your own profiles here! Replace the image URLs with your own images and customize the details
const profiles = [
  {
    id: 1,
    name: "Rowan",
    age: 24,
    bio: "I love cooking for people I care about",
    image: "https://i.ibb.co/8p9LLT0/Whats-App-Image-2026-04-23-at-4-49-59-PM.jpg"
  },
  {
    id: 2,
    name: "Arseny",
    age: 22,
    bio: "Techie and a golf enthusiast. Here to make long lasting connection!",
    image: "https://i.ibb.co/5hY9jqrL/Whats-App-Image-2026-04-24-at-4-29-04-PM.jpg"
  }
  /*{
    id: 3,
    name: "Person Three",
    age: 26,
    bio: "Write something interesting about this person",
    image: "https://via.placeholder.com/400x600/87CEEB/FFFFFF?text=Add+Your+Image"
  }*/
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setShowMatch(true);
    }

    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      x.set(0);
    }, 300);
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      handleSwipe('right');
    } else if (info.offset.x < -100) {
      handleSwipe('left');
    }
  };

  const currentProfile = profiles[currentIndex];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex flex-col items-center justify-between overflow-hidden">
      <div className="w-full flex items-center justify-center gap-3 pt-safe pt-6 pb-4 px-4">
        <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500 fill-pink-500" />
        <h1 className="text-3xl sm:text-4xl text-gray-800">ZOLU</h1>
      </div>

      <div className="flex-1 w-full max-w-sm px-4 flex items-center justify-center">
        <div className="relative w-full aspect-[3/4] max-h-[calc(100vh-200px)]">
          <motion.div
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
          >
            <ProfileCard
              {...currentProfile}
              onSwipeLeft={() => handleSwipe('left')}
              onSwipeRight={() => handleSwipe('right')}
            />
          </motion.div>

          {currentIndex < profiles.length - 1 && (
            <div className="absolute inset-0 -z-10 scale-95 opacity-50">
              <ProfileCard
                {...profiles[currentIndex + 1]}
                onSwipeLeft={() => {}}
                onSwipeRight={() => {}}
              />
            </div>
          )}
        </div>
      </div>

      <div className="w-full pb-safe pb-6 pt-4 text-center text-gray-600 px-4">
        <p className="text-sm">Swipe or drag cards to explore profiles</p>
        <p className="text-xs mt-1">{currentIndex + 1} / {profiles.length}</p>
      </div>

      <MatchPopup isVisible={showMatch} onClose={() => setShowMatch(false)} />
    </div>
  );
}