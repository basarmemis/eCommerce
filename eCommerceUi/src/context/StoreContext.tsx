import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

export interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: string, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);


export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error("Not Inside The Provider");
    }

    return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId: string, quantity: number) {
        if (!basket) return;
        const newBasket = { ...basket };
        const itemIndex = newBasket.items.findIndex(i => i.productId === productId);
        if (itemIndex >= 0) {
            newBasket.items[itemIndex].quantity -= quantity;
            if (newBasket.items[itemIndex].quantity <= 0) newBasket.items.splice(itemIndex, 1);
            setBasket(newBasket);
        }
    }

    return (
        <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
            {children}
        </StoreContext.Provider>
    )
}
