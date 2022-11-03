import {
    createContext,
    ReactNode,
    useState,
    useMemo,
    useContext,
    useEffect,
} from 'react';

const CartContext = createContext<CartState | null>(null);
const ApiContext = createContext<Api | null>(null);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartState>({
        items: [],
        amountTotal: 0,
    });

    useEffect(() => {
        const cartItemsLocalStorage = localStorage.getItem('SHOPPING_CART');

        if (!cartItemsLocalStorage) {
            return;
        }

        try {
            const newCart = JSON.parse(cartItemsLocalStorage);
            setCartItems(newCart);
        } catch (err) {
            console.log(err);
            return;
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('SHOPPING_CART', JSON.stringify(cartItems));
    }, [cartItems]);

    const api = useMemo(
        () => ({
            addItem: (item: ProductListItem) => {
                setCartItems(({ items, amountTotal }) => {
                    if (items.length === 0)
                        return {
                            items: [{ ...item, amount: 1 }],
                            amountTotal: 1,
                        };

                    const isAlreadyInCart = items.some(
                        (el) => el.id === item.id
                    );

                    if (isAlreadyInCart) {
                        const newItems = items.map((el) =>
                            el.id === item.id
                                ? {
                                      ...el,
                                      amount: el.amount + 1,
                                  }
                                : el
                        );
                        return {
                            items: newItems,
                            amountTotal: amountTotal + 1,
                        };
                    }

                    const newItem: CartItem = { ...item, amount: 1 };

                    return {
                        items: [...items, newItem],
                        amountTotal: amountTotal + 1,
                    };
                });
            },
            removeItem: (id: number) => {
                setCartItems(({ items, amountTotal }) => {
                    let amountToDecrease: number | undefined;
                    const newItems = items.filter((item: CartItem) => {
                        if (item.id !== id) return true;
                        amountToDecrease = item.amount;
                        return false;
                    });

                    if (!amountToDecrease) amountToDecrease = 0;

                    return {
                        items: newItems,
                        amountTotal: amountTotal - amountToDecrease,
                    };
                });
            },
        }),
        []
    );

    console.log(cartItems);

    return (
        <CartContext.Provider value={cartItems}>
            <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
        </CartContext.Provider>
    );
};

export const useCartItems = () => {
    const value = useContext(CartContext);

    if (value === null) {
        throw new Error('Missing CartContextProvider');
    }

    return value;
};

export const useCartApi = () => {
    const api = useContext(ApiContext);

    if (api === null) {
        throw new Error('Missing CartContextProvider');
    }

    return api;
};
