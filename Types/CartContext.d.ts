type CartItem = ProductListItem & { amount: number };

type CartState = {
    items: CartItem[];
    amountTotal: number;
};

type Api = {
    addItem: (item: ProductListItem) => void;
    removeItem: (id: number) => void;
};
