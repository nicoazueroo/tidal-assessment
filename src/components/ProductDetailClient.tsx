'use client';

import { useState } from 'react';
import Link from 'next/link';
import ImageGallery from './ImageGallery';

function parseVariant(title: string) {
  const parts = title.split(' / ');
  return {
    size: parts[0],
    color: parts[1],
  };
}

const colorMap: Record<string, string> = {
  Green: '#22c55e',
  Red: '#ef4444',
  Blue: '#3b82f6',
  Purple: '#a855f7',
  Olive: '#4d7c0f',
  Ocean: '#0284c7',
  Black: '#000000',
  White: '#ffffff',
};

export default function ProductDetailClient({ product }: any) {
  const images = product.images.edges;
  const variants = product.variants.edges;

  const parsedVariants = variants.map((v: any) => ({
    ...v,
    ...parseVariant(v.node.title),
  }));

  const sizes = [...new Set(parsedVariants.map((v: any) => v.size))] as string[];
  const colors = [...new Set(parsedVariants.map((v: any) => v.color))] as string[];

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [quantity, setQuantity] = useState<number>(1);

  const selectedVariant = parsedVariants.find(
    (v: any) => v.size === selectedSize && v.color === selectedColor
  );

  const price = selectedVariant?.node.price;

  return (
    <div className="p-6 grid md:grid-cols-2 gap-10">
      
      {/* LEFT */}
      <ImageGallery images={images} />

      {/* RIGHT */}
      <div className="flex flex-col h-full justify-between">

        <div>
          {/* BREADCRUMB */}
          <div className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <span className="mx-1">/</span>
            <span className="text-black">{product.title}</span>
          </div>

          <h1 className="text-2xl font-bold mb-4">
            {product.title}
          </h1>

          {/* SIZE */}
          <div className="mb-4">
            <p className="text-sm mb-2">Size</p>
            <div className="flex gap-2">
              {sizes.map((size: string, i: number) => (
                <button
                  key={`${size}-${i}`}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? 'bg-black text-white'
                      : 'bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* COLOR */}
          <div className="mb-4">
            <p className="text-sm mb-2">Color</p>
            <div className="flex gap-3">
              {colors.map((color: string, i: number) => (
                <button
                  key={`${color}-${i}`}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
                      ? 'border-black'
                      : 'border-gray-300'
                  }`}
                  style={{
                    backgroundColor: colorMap[color] || '#ccc',
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* PRICE */}
          {price && (
            <p className="text-xl mb-4">
              {price.amount} {price.currencyCode}
            </p>
          )}

          {/* DESCRIPTION */}
          <p className="text-gray-600 mb-6">
            {product.description}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 border rounded"
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>
        </div>

        {/* ADD TO CART */}
        <button className="bg-black text-white px-6 py-3 rounded w-full hover:bg-gray-800">
          Add to Cart
        </button>

      </div>
    </div>
  );
}