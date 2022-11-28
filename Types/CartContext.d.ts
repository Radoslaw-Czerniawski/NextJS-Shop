import { ProductListItem } from './Product';

type CartItem = ProductListItem & { amount: number };

export type CartState = {
    items: CartItem[];
    amountTotal: number;
};

type Api = {
    readonly addItem: (item: ProductListItem) => void;
    readonly removeItem: (slug: string) => void;
};
