import { client } from '@/lib/graphql/client';
import { GET_PRODUCTS } from '@/lib/graphql/queries';
import ProductCard from '@/components/ProductCard';

export default async function Home() {
  const { data } = await client.query({
    query: GET_PRODUCTS,
  }) as any;

  const products = data.products.edges.map((edge: any) => edge.node);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}