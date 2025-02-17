import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

// Create a context for the wishlist
const WishlistContext = createContext();

// Create a provider component for the Wishlist
export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState(() => {
        // Load wishlist items from localStorage if available, otherwise use an empty array
        const savedWishlist = localStorage.getItem('wishlistItems');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // Save wishlist items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    // Function to add an item to the wishlist
    const addToWishlist = (product_id, product_name, product_img, total_price, weights, selected_Weight, quantity, category_id, weight_id, brand_id) => {
        // Check if the product is already in the wishlist
        const existingItem = wishlistItems.find(item => item.product_id === product_id);
        if (!existingItem) {
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
            setWishlistItems((prevItems) => [...prevItems, newItem]);
        }
    };

    // Function to remove an item from the wishlist
    const removeFromWishlist = (itemId) => {
        setWishlistItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    };

// Function to update the selected weight of an item in the wishlist
const updateSelectedWeight = (itemId, newWeight) => {
    setWishlistItems((prevItems) =>
        prevItems.map((item) => {
            if (item.id === itemId) {
                // Find the selected weight object
                const selectedWeight = item.weights.find(weight => weight.weight.name === newWeight || weight.weight.weight_name === newWeight);
                
                // Update total_price based on the amount of the selected weight
                const updatedPrice = selectedWeight ? parseFloat(selectedWeight.amount) : item.total_price;

                return {
                    ...item,
                    selected_Weight: newWeight, // Update the selected weight
                    total_price: updatedPrice * item.quantity // Update total_price according to quantity
                };
            }
            return item;
        })
    );
};



const updateQuantity = (itemId, amount) => {
    setWishlistItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          // Find the selected weight object (based on the selected_Weight)
          const selectedWeight = item.weights.find(
            (weight) =>
              weight.weight.weight_name === item.selected_Weight ||
              weight.weight.name === item.selected_Weight
          );
  
          // Check if selectedWeight is found
          if (!selectedWeight) {
            console.error("Selected weight not found for item:", item);
            return item; // If no valid weight is found, return the item unchanged
          }
  
          // Check if stock quantity is greater than 0
          if (parseInt(selectedWeight.stockQty) <= 0) {
            console.warn("Stock is not available for selected weight:", selectedWeight);
            return item; // If stock is not available, return the item unchanged
          }
  
          // Calculate new quantity, ensuring it doesn't go below 1
          const newQuantity = Math.max(1, item.quantity + amount);
  
          // Calculate updated price using the selected weight's amount * newQuantity
          const updatedPrice = parseFloat(selectedWeight.amount) * newQuantity;
  
          return {
            ...item,
            quantity: newQuantity,  // Update quantity
            total_price: updatedPrice, // Update total price based on new quantity and weight amount
          };
        }
        return item;
      })
    );
  };
  
  
  


    // Function to check if an item is in the wishlist
    const isInWishlist = (product_id) => {
        return wishlistItems.some(item => item.product_id === product_id);
    };

    // Function to get the total number of items in the wishlist
    const getWishlistCount = () => {
        return wishlistItems.length;
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, updateSelectedWeight, updateQuantity, isInWishlist, getWishlistCount }}>
            {children}
        </WishlistContext.Provider>
    );
};

// Custom hook to use the Wishlist context
export const useWishlist = () => useContext(WishlistContext);
