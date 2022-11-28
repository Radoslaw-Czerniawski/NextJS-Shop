import { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface ProductDetails {
    slug: string;
    name: string;
    description: string;
    longDescription: MDXRemoteSerializeResult<
        Record<string, unknown>,
        Record<string, string>
    >;
    thumbnailUrl: string;
    thumbnailAlt: string;
    rating: number;
}

type ProductListItem = Pick<
    ProductDetails,
    'slug' | 'name' | 'thumbnailAlt' | 'thumbnailUrl'
>;
