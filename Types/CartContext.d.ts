type CartItem = ProductListItem & { amount: number };

type CartState = {
    items: CartItem[];
    amountTotal: number;
};

type Api = {
    readonly addItem: (item: ProductListItem) => void;
    readonly removeItem: (id: number) => void;
};
