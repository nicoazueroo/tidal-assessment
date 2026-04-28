import { client } from '@/lib/graphql/client';
import { GET_PRODUCT_BY_ID } from '@/lib/graphql/queries';
import ProductDetailClient from '@/components/ProductDetailClient';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  const { data } = await client.query({
    query: GET_PRODUCT_BY_ID,
    variables: { id: decodedId },
  }) as any;

  const product = data.product;

  return <ProductDetailClient product={product} />;
}