import {
    createContext,
    ReactNode,
    useState,
    useMemo,
    useContext,
    useEffect,
} from 'react';
import { Api, CartItem, CartState } from '../Types/CartContext';
import { getValueFromLocalStorage } from '../utils/localStorageHelpers';

const CartContext = createContext<CartState | null>(null);
const ApiContext = createContext<Api | null>(null);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartState>({
        items: [],
        amountTotal: 0,
    });

    useEffect(() => {
        const cartItems = getValueFromLocalStorage('SHOPPING_CART');

        if (!cartItems) {
            return;
        }

        setCartItems(cartItems);
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
                        (el) => el.slug === item.slug
                    );

                    if (isAlreadyInCart) {
                        const newItems = items.map((el) =>
                            el.slug === item.slug
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
            removeItem: (slug: string) => {
                setCartItems(({ items, amountTotal }) => {
                    let amountToDecrease: number | undefined;
                    const newItems = items.filter((item: CartItem) => {
                        if (item.slug !== slug) return true;
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
