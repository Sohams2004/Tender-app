import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { ProfileCard } from './components/ProfileCard';
import { MatchPopup } from './components/MatchPopup';
import { Heart } from 'lucide-react';

// Add your own profiles here! Replace the image URLs with your own images and customize the details
const profiles = [
  {
    id: 1,
    name: "john",
    age: 25,
    bio: "blah blah blah",
    image: "https://t4.ftcdn.net/jpg/02/98/28/89/360_F_298288984_8i0PB7s9aWPzi1LeuNGGrnjXkmXRpcZn.jpg"
  }
  /*{
    id: 2,
    name: "Another Person",
    age: 28,
    bio: "Customize this bio with their interests and personality",
    image: "https://via.placeholder.com/400x600/9370DB/FFFFFF?text=Add+Your+Image"
  },
  {
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
    <div className="size-full bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex items-center gap-3">
        <Heart className="w-10 h-10 text-pink-500 fill-pink-500" />
        <h1 className="text-4xl text-gray-800">LoveSwipe</h1>
      </div>

      <div className="relative w-full max-w-sm h-[600px]">
        <motion.div
          style={{ x, rotate, opacity }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
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

      <div className="mt-8 text-center text-gray-600">
        <p className="text-sm">Swipe or drag cards to explore profiles</p>
        <p className="text-xs mt-1">{currentIndex + 1} / {profiles.length}</p>
      </div>

      <MatchPopup isVisible={showMatch} onClose={() => setShowMatch(false)} />
    </div>
  );
}