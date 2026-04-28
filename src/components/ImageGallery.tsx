'use client';

import { useState } from 'react';

export default function ImageGallery({ images }: { images: any[] }) {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <img
        src={images[selected]?.node.url}
        className="w-full h-96 object-cover rounded-lg mb-4"
      />

      <div className="flex gap-2">
        {images.map((img: any, i: number) => (
          <img
            key={i}
            src={img.node.url}
            onClick={() => setSelected(i)}
            className={`w-20 h-20 object-cover rounded cursor-pointer border ${
              selected === i ? 'border-black' : 'border-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}