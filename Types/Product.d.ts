interface ProductDetails {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    thumbnailAlt: string;
    rating: number;
}

type ProductListItem = Pick<
    ProductDetails,
    'id' | 'title' | 'thumbnailAlt' | 'thumbnailUrl'
>;
