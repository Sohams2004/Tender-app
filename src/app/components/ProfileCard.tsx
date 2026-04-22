import { Heart, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileCardProps {
  name: string;
  age: number;
  bio: string;
  image: string;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function ProfileCard({ name, age, bio, image, onSwipeLeft, onSwipeRight }: ProfileCardProps) {
  return (
    <div className="relative w-full max-w-sm h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden">
      <ImageWithFallback
        src={image}
        alt={name}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
        <h2 className="text-3xl mb-1">{name}, {age}</h2>
        <p className="text-sm opacity-90">{bio}</p>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-6 pb-8 mb-32">
        <button
          onClick={onSwipeLeft}
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
          aria-label="Pass"
        >
          <X className="w-8 h-8 text-red-500" strokeWidth={3} />
        </button>
        <button
          onClick={onSwipeRight}
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
          aria-label="Like"
        >
          <Heart className="w-8 h-8 text-pink-500 fill-pink-500" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
