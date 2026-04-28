'use client';

import Link from 'next/link';
import { useState } from 'react';
import ProductModal from './ProductModal';

export default function ProductCard({ product }: any) {
  const [open, setOpen] = useState(false);

  const image = product.images.edges[0]?.node.url;
  const price = product.variants.edges[0]?.node.price;

  return (
    <>
      <Link href={`/product/${encodeURIComponent(product.id)}`}>
        <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer">
          
          {image && (
            <img
              src={image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md"
            />
          )}

          <h2 className="mt-3 font-semibold text-lg">
            {product.title}
          </h2>

          {price && (
            <p className="text-gray-600">
              {price.amount} {price.currencyCode}
            </p>
          )}

          <button
            onClick={(e) => {
              e.preventDefault(); // 👈 evita navegación
              setOpen(true);
            }}
            className="mt-3 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Show Details
          </button>
        </div>
      </Link>

      {open && (
        <ProductModal
          product={product}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}