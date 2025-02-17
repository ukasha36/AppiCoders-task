import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

// Create a context for the Cart
const CartContext = createContext();

// Create a provider component for the Cart
export const CartProvider = ({ children }) => {
    const [CartItems, setCartItems] = useState(() => {
        // Load Cart items from localStorage if available, otherwise use an empty array
        const savedCart = localStorage.getItem('CartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save Cart items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('CartItems', JSON.stringify(CartItems));
    }, [CartItems]);

    // Function to add an item to the Cart
    const addToCart = (product_id, product_name, product_img, total_price, weights, selected_Weight, quantity, category_id, weight_id, brand_id) => {
        // Check if the product is already in the Cart
        const existingItem = CartItems.find(item => item.product_id === product_id);
        // if (!existingItem) {
            const newItem = {
                id: uuidv4(),
                product_id,
                product_name,
                product_img,
                total_price,
                weights,
                selected_Weight,
                quantity,
                category_id,
                weight_id,
                brand_id
            };
            setCartItems((prevItems) => [...prevItems, newItem]);
        // }
    };

    // Function to remove an item from the Cart
    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    };

// Function to update the selected weight of an item in the Cart
const updateSelectedWeight = (itemId, newWeight) => {
    setCartItems((prevItems) =>
        prevItems.map((item) => {
            if (item.id === itemId) {
                // Find the selected weight object
                const selectedWeight = item.weights.find(weight => weight.weight.name === newWeight || weight.weight.weight_name === newWeight);
                
                // Update total_price based on the amount of the selected weight
                const updatedPrice = selectedWeight ? parseFloat(selectedWeight.amount) : item.total_price;

                // Update the weight_id from the selected weight object
                const updatedWeightId = selectedWeight ? selectedWeight.weight_id : item.weight_id;

                return {
                    ...item,
                    selected_Weight: newWeight, // Update the selected weight
                    total_price: updatedPrice * item.quantity, // Update total_price according to quantity
                    weight_id: updatedWeightId       // Update the weight_id
                };
            }
            return item;
        })
    );
};



const updateQuantity = (itemId, amount) => {
    setCartItems((prevItems) => 
        prevItems.map((item) => {
            if (item.id === itemId) {
                // Find the selected weight object
                const selectedWeight = item.weights.find(
                    (weight) =>
                      weight.weight.weight_name === item.selected_Weight || 
                      weight.weight.name === item.selected_Weight
                  );

                // Calculate the updated total price based on quantity and selected weight amount
                const updatedPrice = selectedWeight 
                    ? parseFloat(selectedWeight.amount) * Math.max(1, item.quantity + amount) 
                    : item.total_price;

                return {
                    ...item,
                    quantity: Math.max(1, item.quantity + amount), // Ensure quantity doesn't go below 1
                    total_price: updatedPrice, // Update total_price based on new quantity
                };
            }
            return item;
        })
    );
};


    // Function to check if an item is in the Cart
    const isInCart = (product_id) => {
        return CartItems.some(item => item.product_id === product_id);
    };

    // Function to get the total number of items in the Cart
    const getCartCount = () => {
        return CartItems.length;
    };

    return (
        <CartContext.Provider value={{ CartItems, addToCart, removeFromCart, updateSelectedWeight, updateQuantity, isInCart, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the Cart context
export const useCart = () => useContext(CartContext);
