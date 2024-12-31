import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false); // Corrected from 'flase' to 'false'
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }
    
        let cartData = structuredClone(cartItems);
        const key = `${itemId}_${size}`; // Use a combination of itemId and size as the key
    
        if (cartData[key]) {
            cartData[key] += 1;
        } else {
            cartData[key] = 1;
        }
    
        setCartItems(cartData);
    };
    

    const getCartCount = () => {
        let totalCount = 0;
        for (const key in cartItems) {
            try {
                if (cartItems[key] > 0) {
                    totalCount += cartItems[key];
                }
            } catch (error) {
                console.error(error); // It's a good practice to log the error
            }
        }
        return totalCount;
    };
    

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems,addToCart,
        getCartCount
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
