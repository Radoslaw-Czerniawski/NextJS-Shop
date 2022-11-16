export const getValueFromLocalStorage = (itemName: string) => {
    const localStorageItem = localStorage.getItem('SHOPPING_CART');

    if (!localStorageItem) {
        return localStorageItem;
    }

    const parsedItem = JSON.parse(localStorageItem);

    return parsedItem;
};
