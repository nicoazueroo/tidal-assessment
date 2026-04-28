'use client';

import { useState } from 'react';

type Product = any;

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [quantity, setQuantity] = useState(1);

  const images = product.images.edges;
  const price = product.variants.edges[0]?.node.price;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">{product.title}</h2>

        {/* Images */}
        <div className="flex gap-2 overflow-x-auto mb-4">
          {images.map((img: any, i: number) => (
            <img
              key={i}
              src={img.node.url}
              className="w-24 h-24 object-cover rounded"
            />
          ))}
        </div>

        {/* Price */}
        {price && (
          <p className="text-lg mb-2">
            {price.amount} {price.currencyCode}
          </p>
        )}

        {/* Quantity */}
        <div className="flex items-center gap-3 mb-4">
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

        {/* Add to cart */}
        <button className="w-full bg-black text-white py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
}