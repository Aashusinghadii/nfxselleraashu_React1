import React, { useState, useEffect } from 'react';

// Modal for order confirmation
const OrderConfirmationModal = ({ isOpen, onClose, orderId, cartItems, total }) => {
    if (!isOpen) return null;

    const whatsappMessage = encodeURIComponent(
        `Hello! I've placed an order on NFXSELLERAASHU. Order Details:\n` +
        cartItems.map(item => `${item.name} x${item.quantity} (${item.validity ? item.validity : 'one-time'}) - ₹${item.price.toLocaleString('en-IN')}`).join('\n') +
        `\nTotal: ₹${total.toLocaleString('en-IN')}\nKindly provide your UPI transaction ID and payment screenshot here for verification.`
    );
    const whatsappLink = `https://wa.me/+918863889778?text=${whatsappMessage}`;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full text-center space-y-4">
                <h3 className="text-2xl font-bold text-green-400">Order Initiated!</h3>
                <p className="text-gray-300">Your order UPI-ORD-{orderId} has been initiated with UPI payment.</p>
                <p className="text-gray-400">Please complete the UPI payment and send the transaction details via WhatsApp.</p>
                <a 
                    href={whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors hover:scale-105 transition-transform"
                >
                    Proceed to WhatsApp
                </a>
                <button
                    onClick={onClose}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors hover:scale-105 transition-transform mt-2"
                >
                    Close! Go Home
                </button>
            </div>
        </div>
    );
};


// Navbar Component
const Navbar = ({ cartItemCount, onCartClick, onHomeClick }) => {
    return (
        <nav className="flex items-center justify-between p-4 bg-indigo-900 fixed top-0 left-0 right-0 z-10">
            <div onClick={onHomeClick} className="text-xl font-bold flex items-center space-x-2 cursor-pointer transition-transform duration-200 hover:scale-105">
                <span className="text-amber-500">NFX</span><span className="text-white">SELLERAASHU</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
                <a href="#" onClick={onCartClick} className="relative hover:text-amber-400 transition-colors duration-200 transition-transform hover:scale-105">
                    Cart
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </a>
                <a href="https://t.me/NETFLIXCHEAPSERVICE" target="_blank" rel="noopener noreferrer" className="relative hover:text-amber-400 transition-colors duration-200 transition-transform hover:scale-105">PROOF</a>
                <button className="text-amber-500 hover:text-amber-400 transition-colors duration-200 transition-transform hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

// Dynamic Banner Component
const DynamicTextBanner = () => {
    const banners = [
        { text: "PREMIUM ACCOUNTS ARE BACK IN STOCK", bgColor: "bg-purple-700" },
        { text: "NEW ARRIVALS EVERY WEEK", bgColor: "bg-orange-600" },
        { text: "LIMITED TIME OFFERS", bgColor: "bg-green-600" },
    ];
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const { text, bgColor } = banners[currentBannerIndex];

    return (
        <div className={`p-8 rounded-xl shadow-lg mt-8 transition-colors duration-1000 ${bgColor}`}>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white flex items-center justify-center space-x-4 animate-fade-in-out">
                {text}
            </h1>
            <style>{`
                @keyframes fade-in-out {
                    0% { opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { opacity: 0; }
                }
                .animate-fade-in-out {
                    animation: fade-in-out 3s infinite;
                }
            `}</style>
        </div>
    );
};

// Hero Section Component with typing effect
const HeroSection = () => {
    const placeholders = ["Search for Netflix", "Search for Spotify", "Search for Canva"];
    const [placeholder, setPlaceholder] = useState("");
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    useEffect(() => {
        let isMounted = true;
        let charIndex = 0;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseTime = 1500;

        const typeText = () => {
            if (!isMounted) return;
            const currentPhrase = placeholders[placeholderIndex];
            if (charIndex < currentPhrase.length) {
                setPlaceholder(currentPhrase.slice(0, charIndex + 1));
                charIndex++;
                setTimeout(typeText, typingSpeed);
            } else {
                setTimeout(() => {
                    const deleteText = () => {
                        if (!isMounted) return;
                        if (charIndex > 0) {
                            setPlaceholder(currentPhrase.slice(0, charIndex - 1));
                            charIndex--;
                            setTimeout(deleteText, deletingSpeed);
                        } else {
                            setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
                        }
                    };
                    deleteText();
                }, pauseTime);
            }
        };
        typeText();
        return () => {
            isMounted = false;
        };
    }, [placeholderIndex]);

    return (
        <div className="text-center">
            <DynamicTextBanner />
            <div className="relative mx-auto max-w-lg mt-8">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full py-3 pl-12 pr-4 text-slate-200 bg-indigo-700 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 hover:scale-105"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    );
};

// Helper function to format numbers in Indian currency system
const formatIndianCurrency = (num) => {
    if (num === null || num === undefined) return '';
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    return formatter.format(num).replace('₹', '₹');
};

// ProductCard Component for displaying a single product
const ProductCard = ({ product, onProductClick }) => {
    return (
        <div 
            className={`bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg text-center flex flex-col items-center transition-transform duration-200 ${product.isUnavailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
            onClick={() => !product.isUnavailable && onProductClick(product)}
        >
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-48 rounded-lg mb-4 object-cover transition-transform duration-200 hover:scale-110" 
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src=`https://placehold.co/300x200/555/FFF?text=${product.name.replace(/ /g, '+')}`;
                }}
            />
            <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
            {product._id !== 'a1' && (
                <p className="text-sm text-gray-400 mb-4 flex-grow">{product.description}</p>
            )}
            {product.contactForPrice ? (
                <p className="text-amber-500 font-bold text-lg mt-auto">Contact for Price</p>
            ) : product.isUnavailable ? (
                <p className="text-red-500 font-bold text-lg mt-auto">Service Unavailable</p>
            ) : (
                <p className="text-3xl font-extrabold text-white mt-auto">
                    {formatIndianCurrency(product.price)}
                </p>
            )}
            
        </div>
    );
};

// ProductsSection Component to display the grid of all products
const ProductsSection = ({ products, onProductClick }) => {
    return (
        <div className="mt-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} onProductClick={onProductClick} />
                ))}
            </div>
        </div>
    );
};

// CartPage Component
const CartPage = ({ cart, products, onIncrease, onDecrease, onRemove, onClear, onCheckout }) => {
    const cartItems = Object.entries(cart).map(([key, item]) => {
        const product = products.find(p => p._id === item.productId);
        return { ...product, quantity: item.quantity, validity: item.validity, price: item.price };
    }).filter(item => item.quantity > 0);

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return (
        <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 pt-24 bg-gray-900 text-white">
            <div className="w-full max-w-4xl space-y-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">Your Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                        <p className="text-lg text-gray-400">Your cart is empty.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={`${item._id}-${item.validity}`} className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 flex flex-col sm:flex-row items-center justify-between transition-transform duration-200">
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.name} 
                                        className="w-16 h-16 rounded-lg object-cover" 
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src=`https://placehold.co/64x64/555/FFF?text=${item.name.replace(/ /g, '+')}`;
                                        }}
                                    />
                                    <div className="text-left">
                                        <h3 className="text-lg font-bold">{item.name}</h3>
                                        {item.validity && <p className="text-sm text-gray-400">Validity: {item.validity}</p>}
                                        <p className="text-sm text-gray-400">{formatIndianCurrency(item.price)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                                    <div className="flex items-center space-x-2 bg-gray-700 rounded-full px-2 py-1">
                                        <button onClick={() => onDecrease(`${item._id}_${item.validity}`)} className="text-gray-400 hover:text-white transition-colors">-</button>
                                        <span className="text-sm font-bold">{item.quantity}</span>
                                        <button onClick={() => onIncrease(`${item._id}_${item.validity}`)} className="text-gray-400 hover:text-white transition-colors">+</button>
                                    </div>
                                    <div className="text-lg font-bold">{formatIndianCurrency(item.price * item.quantity)}</div>
                                    <button onClick={() => onRemove(`${item._id}_${item.validity}`)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 flex items-center justify-between font-bold text-xl">
                            <span>Total: {formatIndianCurrency(total)}</span>
                            <div className="flex space-x-2">
                                <button onClick={onClear} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                    Clear Cart
                                </button>
                                <button onClick={onCheckout} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// CheckoutPage Component
const CheckoutPage = ({ cart, products, onBack, onCheckoutWithUpi }) => {
    const cartItems = Object.entries(cart).map(([key, item]) => {
        const product = products.find(p => p._id === item.productId);
        return { ...product, quantity: item.quantity, validity: item.validity, price: item.price };
    }).filter(item => item.quantity > 0);

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const [qrCodeUrl, setQrCodeUrl] = useState("https://i.ibb.co/3k5fN4W/qr-code-placeholder.png");

    return (
        <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 pt-24 bg-gray-900 text-white">
            <div className="w-full max-w-4xl space-y-8">
                <button onClick={onBack} className="flex items-center space-x-2 text-white hover:text-amber-400 transition-colors duration-200 hover:scale-105 transition-transform mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Back to Cart</span>
                </button>
                <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">Checkout</h1>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Order Summary</h2>
                        {cartItems.map(item => (
                            <div key={`${item._id}-${item.validity}`} className="flex justify-between items-center text-gray-300">
                                <span>{item.name} ({item.validity ? item.validity : 'one-time'}) x{item.quantity}</span>
                                <span>{formatIndianCurrency(item.price * item.quantity)}</span>
                            </div>
                        ))}
                    </div>
                    <hr className="border-gray-700" />
                    <div className="flex justify-between items-center text-xl font-bold text-white">
                        <span>Total:</span>
                        <span>{formatIndianCurrency(total)}</span>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg space-y-6">
                    <h2 className="text-2xl font-bold">Payment Method</h2>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 flex flex-col items-center space-y-4">
                        <h3 className="text-xl font-bold">Scan with UPI</h3>
                        <div className="w-48 h-48 bg-white p-2 rounded-lg">
                            <img src={qrCodeUrl} alt="UPI QR Code" className="w-full h-full object-contain" />
                        </div>
                        <input
                            type="text"
                            placeholder="Paste your QR code image URL here"
                            value={qrCodeUrl}
                            onChange={(e) => setQrCodeUrl(e.target.value)}
                            className="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-center"
                        />
                        <div className="text-sm text-gray-400 text-center">
                            <p className="font-bold text-red-400">IMPORTANT: </p>
                            <p>BANK NAME : ADITYA KUMAR : After completing your UPI payment, please send the transaction ID and a screenshot of the payment on WhatsApp **8863889778** along with your cart details for quick verification.</p>
                        </div>
                        <p className="text-white text-lg font-bold">UPI ID: aashusinghadi8252@okaxis</p>
                        <button onClick={() => onCheckoutWithUpi(cartItems, total)} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center hover:scale-105 transition-transform">
                            Proceed with UPI
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ProductDetailPage Component
const ProductDetailPage = ({ product, allProducts, onBack, onAddToCart, onProductClick }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedValidity, setSelectedValidity] = useState(product.availableValidities.length > 0 ? product.availableValidities[0] : null);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCartClick = () => {
        onAddToCart(product, selectedValidity, product.prices[selectedValidity], quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const allOtherProducts = allProducts.filter(p => p._id !== product._id);
        
    return (
        <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 pt-24 bg-gray-900 text-white">
            <div className="w-full max-w-4xl space-y-8">
                <button onClick={onBack} className="flex items-center space-x-2 text-white hover:text-amber-400 transition-colors duration-200 hover:scale-105 transition-transform mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Back to Products</span>
                </button>

                <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full md:w-1/3 h-auto rounded-lg object-cover shadow-lg"
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src=`https://placehold.co/300x200/555/FFF?text=${product.name.replace(/ /g, '+')}`;
                        }}
                    />
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                        <p className="text-md text-gray-400 mb-4 whitespace-pre-line">{product.description}</p>
                        
                        {!product.contactForPrice && !product.isUnavailable && (
                            <>
                                <div className="space-y-4 mb-4">
                                    {product.availableValidities.length > 0 && (
                                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                            <label className="text-lg font-semibold">Select Validity:</label>
                                            <select
                                                value={selectedValidity}
                                                onChange={(e) => setSelectedValidity(e.target.value)}
                                                className="w-full sm:w-auto p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            >
                                                {product.availableValidities.map(validity => (
                                                    <option key={validity} value={validity}>
                                                        {validity} - {formatIndianCurrency(product.prices[validity])}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                        <label className="text-lg font-semibold">Quantity:</label>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            min="1"
                                            className="w-full sm:w-20 p-2 rounded-lg bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                    </div>
                                </div>
                                <div className="text-3xl font-extrabold text-amber-400 mb-4">
                                    Price: {formatIndianCurrency(product.prices[selectedValidity] * quantity)}
                                </div>
                            </>
                        )}
                        {(product.contactForPrice || product.isUnavailable) && (
                            <p className="text-red-500 font-bold text-lg mt-auto">Service Unavailable</p>
                        )}
                        <button
                            onClick={handleAddToCartClick}
                            disabled={product.contactForPrice || product.isUnavailable}
                            className={`w-full mt-4 text-center font-bold py-3 px-6 rounded-lg transition-colors hover:scale-105 transition-transform
                                ${isAdded ? 'bg-green-600' : 'bg-violet-600 hover:bg-violet-700'}
                                ${product.contactForPrice || product.isUnavailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isAdded ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-white text-center mb-6">You might also like...</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allOtherProducts.map(p => (
                            <ProductCard key={p._id} product={p} onProductClick={(p) => onProductClick('product-detail', p)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


// Main App component that combines all the features
const App = () => {
    const [endDate] = useState(() => {
        const targetDate = new Date('2025-09-30T00:00:00Z');
        return targetDate;
    });

    const [countdown, setCountdown] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });
    
    const [cart, setCart] = useState({});
    const cartItemCount = Object.values(cart).reduce((total, item) => total + item.quantity, 0);

    const [isDropboxOpen, setIsDropboxOpen] = useState(false);
    
    // New state for user name and modals
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const handleAddToCart = (product, validity, price, quantity) => {
        const cartKey = `${product._id}_${validity}`;
        setCart(prevCart => {
            const newCart = { ...prevCart };
            if (newCart[cartKey]) {
                newCart[cartKey].quantity += quantity;
            } else {
                newCart[cartKey] = {
                    productId: product._id,
                    validity,
                    price,
                    quantity
                };
            }
            return newCart;
        });
    };

    const handleIncreaseQuantity = (cartKey) => {
        setCart(prevCart => ({
            ...prevCart,
            [cartKey]: {
                ...prevCart[cartKey],
                quantity: prevCart[cartKey].quantity + 1
            }
        }));
    };

    const handleDecreaseQuantity = (cartKey) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            if (newCart[cartKey].quantity > 1) {
                newCart[cartKey].quantity -= 1;
            } else {
                delete newCart[cartKey];
            }
            return newCart;
        });
    };

    const handleRemoveProduct = (cartKey) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            delete newCart[cartKey];
            return newCart;
        });
    };

    const handleClearCart = () => {
        setCart({});
    };

    const togglePage = (page, product = null) => {
        setCurrentPage(page);
        setSelectedProduct(product);
    };

    const handleCheckoutWithUpi = (cartItems, total) => {
        const randomOrderId = Math.floor(100000000000 + Math.random() * 900000000000);
        setOrderId(randomOrderId);
        setShowOrderConfirmation(true);
    };
    
    const handleOrderConfirmationClose = () => {
        setShowOrderConfirmation(false);
        setCurrentPage('home');
        handleClearCart();
    };

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = endDate.getTime() - now;
            if (distance < 0) {
                clearInterval(interval);
                return;
            }
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setCountdown({
                days: String(days).padStart(2, '0'),
                hours: String(hours).padStart(2, '0'),
                minutes: String(minutes).padStart(2, '0'),
                seconds: String(seconds).padStart(2, '0')
            });
        };
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [endDate]);

    const toggleDropbox = () => {
        setIsDropboxOpen(!isDropboxOpen);
    };

    const [allProducts] = useState([
        { _id: 's1', name: 'Netflix', description: 'Streaming Services (Movies & TV Shows)', price: 159.00, imageUrl: 'https://placehold.co/300x200/FF0000/FFFFFF?text=Netflix', availableValidities: ['1-month', '6-month', '1-year'], prices: { '1-month': 159.00, '6-month': 899.00, '1-year': 1699.00 }, createdAt: new Date(Date.now() - 86400000 * 2) },
        { _id: 's2', name: 'Amazon Prime Video', description: 'Streaming Services (Movies & TV Shows)', price: 49.00, imageUrl: 'https://placehold.co/300x200/00A8E1/FFFFFF?text=Prime+Video', availableValidities: ['1-month', '6-month'], prices: { '1-month': 49.00, '6-month': 199.00 }, createdAt: new Date(Date.now() - 86400000 * 3) },
        { _id: 's3', name: 'Jio Hotstar', description: 'Streaming Services (Movies & TV Shows)', price: 1149.00, imageUrl: 'https://placehold.co/300x200/007bff/FFFFFF?text=Hotstar', availableValidities: ['1-year'], prices: { '1-year': 1149.00 }, createdAt: new Date(Date.now() - 86400000 * 4) },
        { _id: 's4', name: 'ZEE5', description: 'Streaming Services (Movies & TV Shows)', price: 499.00, imageUrl: 'https://placehold.co/300x200/800080/FFFFFF?text=ZEE5', availableValidities: ['1-year'], prices: { '1-year': 499.00 }, createdAt: new Date(Date.now() - 86400000 * 5) },
        { _id: 's5', name: 'Sony LIV', description: 'Streaming Services (Movies & TV Shows)', price: 499.00, imageUrl: 'https://placehold.co/300x200/228B22/FFFFFF?text=Sony+LIV', availableValidities: ['1-year'], prices: { '1-year': 499.00 }, createdAt: new Date(Date.now() - 86400000 * 6) },
        { _id: 's6', name: 'Docubay', description: 'Streaming Services (Movies & TV Shows)', price: 3.99, imageUrl: 'https://placehold.co/300x200/4682B4/FFFFFF?text=Docubay', availableValidities: ['1-month', '6-month', '1-year'], prices: { '1-month': 3.99, '6-month': 3.99 * 5, '1-year': 3.99 * 9 }, createdAt: new Date(Date.now() - 86400000 * 7), isUnavailable: true },
        { _id: 'm1', name: 'Spotify Premium', description: "Get a premium ad-free experience. Note: This will only work on non-premium or fresh accounts. To continue listening to your old playlists, you can collaborate on them and listen to them on your new ad-free account.", price: 99.00, imageUrl: 'https://placehold.co/300x200/1DB954/FFFFFF?text=Spotify', availableValidities: ['2-month', '3-month', '6-month'], prices: { '2-month': 99.00, '3-month': 449.00, '6-month': 749.00 }, createdAt: new Date(Date.now() - 86400000 * 8) },
        { _id: 'm2', name: 'Youtube Premium', description: 'Video & Ad-Free Services - Ad-Free Viewing', price: 599.00, imageUrl: 'https://placehold.co/300x200/FF0000/FFFFFF?text=YouTube', availableValidities: ['6-month'], prices: { '6-month': 599.00 }, createdAt: new Date(Date.now() - 86400000 * 9) },
        { _id: 'd1', name: 'Adobe Creative All Apps', description: 'Design & Creativity - Full Suite Access', price: 1399.00, imageUrl: 'https://placehold.co/300x200/FF0000/FFFFFF?text=Adobe', availableValidities: ['1-month', '1-year'], prices: { '1-month': 1399.00, '1-year': 6199.00 }, createdAt: new Date(Date.now() - 86400000 * 10) },
        { _id: 'd2', name: 'Autodesk All Apps', description: 'Design & Creativity - Professional Design Tools', price: 2399.00, imageUrl: 'https://placehold.co/300x200/00BFFF/FFFFFF?text=Autodesk', availableValidities: ['1-year'], prices: { '1-year': 2399.00 }, createdAt: new Date(Date.now() - 86400000 * 11) },
        { _id: 'd3', name: 'Canva Pro', description: 'Design & Creativity - Advanced Graphic Design', price: 249.00, imageUrl: 'https://placehold.co/300x200/00C4CC/FFFFFF?text=Canva+Pro', availableValidities: ['1-year'], prices: { '1-year': 249.00 }, createdAt: new Date(Date.now() - 86400000 * 12) },
        { _id: 'o1', name: 'MS Office 365 | Lifetime', description: 'Office & Productivity - Lifetime Access', price: 1299.00, imageUrl: 'https://placehold.co/300x200/FF5722/FFFFFF?text=MS+Office', availableValidities: ['lifetime'], prices: { 'lifetime': 1299.00 }, createdAt: new Date(Date.now() - 86400000 * 13) },
        { _id: 'o2', name: 'Cursor', description: 'Office & Productivity - AI-powered Code Editor', price: 15.99, imageUrl: 'https://placehold.co/300x200/4CAF50/FFFFFF?text=Cursor', availableValidities: ['1-month', '6-month', '1-year'], prices: { '1-month': 15.99, '6-month': 15.99 * 5, '1-year': 15.99 * 9 }, createdAt: new Date(Date.now() - 86400000 * 14), isUnavailable: true },
        { _id: 'o4', name: 'Perplexity Pro', description: 'Office & Productivity - Advanced AI Search', price: 149.00, imageUrl: 'https://placehold.co/300x200/673AB7/FFFFFF?text=Perplexity', availableValidities: ['1-month', '1-year'], prices: { '1-month': 149.00, '1-year': 1249.00 }, createdAt: new Date(Date.now() - 86400000 * 15) },
        { _id: 'o5', name: 'ChatGPT Plus', description: 'Office & Productivity - AI Chatbot Subscription', isUnavailable: true, imageUrl: 'https://placehold.co/300x200/74AA9C/FFFFFF?text=ChatGPT', availableValidities: ['1-month', '6-month', '1-year'], prices: { '1-month': 20.00, '6-month': 20.00 * 5, '1-year': 20.00 * 9 }, createdAt: new Date(Date.now() - 86400000 * 16) },
        { _id: 'l1', name: 'Coursera Plus', description: 'Online Learning & Courses - Unlimited Learning', price: 39.99, imageUrl: 'https://placehold.co/300x200/2A73CC/FFFFFF?text=Coursera', availableValidities: ['1-month', '6-month', '1-year'], prices: { '1-month': 39.99, '6-month': 39.99 * 5, '1-year': 39.99 * 9 }, createdAt: new Date(Date.now() - 86400000 * 17), isUnavailable: true },
        { _id: 'dt1', name: 'Tinder Gold', description: 'Dating & Social - Enhanced Dating Features', price: 499.00, imageUrl: 'https://placehold.co/300x200/FF6B6B/FFFFFF?text=Tinder+Gold', availableValidities: ['1-month', '6-month', '1-year'], prices: { '1-month': 499.00, '6-month': 1299.00, '1-year': 1999.00 }, createdAt: new Date(Date.now() - 86400000 * 18) },
        { _id: 'dt2', name: 'Tinder Platinum', description: 'Dating & Social - Premium Dating Features', price: 699.00, imageUrl: 'https://placehold.co/300x200/FF6B6B/FFFFFF?text=Tinder+Platinum', availableValidities: ['1-month', '6-month', '1-year'], prices: { '1-month': 699.00, '6-month': 1899.00, '1-year': 2999.00 }, createdAt: new Date(Date.now() - 86400000 * 19) },
        { _id: 'dt3', name: 'Tinder Plus', description: 'Dating & Social - Basic Premium Features', price: 449.00, imageUrl: 'https://placehold.co/300x200/FF6B6B/FFFFFF?text=Tinder+Plus', availableValidities: ['1-month', '6-month', '1-year'], prices: { '1-month': 449.00, '6-month': 999.00, '1-year': 1499.00 }, createdAt: new Date(Date.now() - 86400000 * 20) },
        { _id: 'v1', name: 'Youtube Premium', description: 'Video & Ad-Free Services - Ad-Free Viewing', price: 599.00, imageUrl: 'https://placehold.co/300x200/FF0000/FFFFFF?text=YouTube', availableValidities: ['6-month'], prices: { '6-month': 599.00 }, createdAt: new Date(Date.now() - 86400000 * 21) },
        { _id: 't1', name: 'Amazon Refund Trick', description: 'Tricks & Hacks - Learn the Refund Trick', price: 399.00, imageUrl: 'https://placehold.co/300x200/FF9900/FFFFFF?text=Amazon+Trick', availableValidities: [], prices: { 'one-time': 399.00 }, createdAt: new Date(Date.now() - 86400000 * 22) },
        { _id: 'g_wukong', name: 'Black Myth Wukong | GAME', description: 'Action RPG based on Journey to the West.', price: 499.00, imageUrl: 'https://placehold.co/300x200/8B4513/FFFFFF?text=Wukong', availableValidities: [], prices: { 'one-time': 499.00 }, createdAt: new Date(Date.now() - 86400000 * 23) },
        { _id: 'p4', name: 'Grammarly Premium', description: 'Advanced writing assistant.', price: 999.00, imageUrl: 'https://placehold.co/300x200/4CAF50/FFFFFF?text=Grammarly', availableValidities: ['1-month', '3-month', '1-year'], prices: { '1-month': 999.00, '3-month': 1899.00, '1-year': 3899.00 }, createdAt: new Date(Date.now() - 86400000 * 24) },
        { _id: 'p5', name: 'Linkedin Premium | Business', description: 'Business networking with advanced features (Activation Link).', price: 2399.00, imageUrl: 'https://placehold.co/300x200/0077B5/FFFFFF?text=LinkedIn+Business', availableValidities: ['3-month-activation', '1-year-activation', '1-year-login'], prices: { '3-month-activation': 2399.00, '1-year-activation': 4299.00, '1-year-login': 3299.00 }, createdAt: new Date(Date.now() - 86400000 * 25) },
        { _id: 'p6', name: 'Linkedin Premium | Career', description: 'Career development with enhanced job search (Login Required).', price: 649.00, imageUrl: 'https://placehold.co/300x200/0077B5/FFFFFF?text=LinkedIn+Career', availableValidities: ['3-month-activation', '1-year-login'], prices: { '3-month-activation': 649.00, '1-year-login': 3199.00 }, createdAt: new Date(Date.now() - 86400000 * 26) },
        { _id: 'ms1', name: 'Mega Storage | 16TB', description: 'Cloud storage with massive capacity.', price: 1399.00, imageUrl: 'https://placehold.co/300x200/FF00FF/FFFFFF?text=Mega+16TB', availableValidities: ['1-month', '1-year'], prices: { '1-month': 1399.00, '1-year': 6499.00 }, createdAt: new Date(Date.now() - 86400000 * 27) },
        { _id: 'ms2', name: 'Mega Storage | 2 TB', description: 'Cloud storage for personal use.', price: 599.00, imageUrl: 'https://placehold.co/300x200/FF00FF/FFFFFF?text=Mega+2TB', availableValidities: ['1-month', '1-year'], prices: { '1-month': 599.00, '1-year': 2899.00 }, createdAt: new Date(Date.now() - 86400000 * 28) },
        { _id: 'ms3', name: 'Mega Storage | 8 TB', description: 'Cloud storage for growing needs.', price: 999.00, imageUrl: 'https://placehold.co/300x200/FF00FF/FFFFFF?text=Mega+8TB', availableValidities: ['1-month', '1-year'], prices: { '1-month': 999.00, '1-year': 4259.00 }, createdAt: new Date(Date.now() - 86400000 * 29) },
        { _id: 't2', name: 'Telegram Automation', description: 'Automate your Telegram tasks for efficiency.', price: 249.00, imageUrl: 'https://placehold.co/300x200/0088CC/FFFFFF?text=Telegram+Automation', availableValidities: [], prices: { 'one-time': 249.00 }, createdAt: new Date(Date.now() - 86400000 * 30) },
        { _id: 'v2', name: 'v0 PREMIUM', description: 'Premium access to v0 services with advanced features.', price: 3599.00, imageUrl: 'https://placehold.co/300x200/FFD700/000000?text=v0+PREMIUM', availableValidities: ['1-year'], prices: { '1-year': 3599.00 }, createdAt: new Date(Date.now() - 86400000 * 31) },
        { _id: 'os1', name: 'Windows 11 Pro Key', description: 'Lifetime activation key for Windows 11 Pro.', price: 499.00, imageUrl: 'https://placehold.co/300x200/0078D4/FFFFFF?text=Windows+11+Pro', availableValidities: ['lifetime'], prices: { 'lifetime': 499.00 }, createdAt: new Date(Date.now() - 86400000 * 32) },
        {
          _id: 'ss1',
          name: 'Social Service',
          description: 'We sell social services like Instagram followers, likes, comments with cheap or expensive quality! Not only Instagram but other social services too.',
          price: 0,
          imageUrl: 'https://placehold.co/300x200/FF69B4/FFFFFF?text=Social+Service',
          availableValidities: [],
          prices: {},
          contactForPrice: true,
          createdAt: new Date(Date.now() - 86400000 * 33)
        },
        {
          _id: 'pc1',
          name: 'Premium Courses Selling',
          description: 'Coding, editing, EXAMS, ETC. DM ME WITH POSTER OF COURSE!',
          price: 0,
          imageUrl: 'https://placehold.co/300x200/8A2BE2/FFFFFF?text=Premium+Courses',
          availableValidities: [],
          prices: {},
          contactForPrice: true,
          createdAt: new Date(Date.now() - 86400000 * 34)
        },
        {
          _id: 'a1',
          name: 'AICTE CERTIFICATE',
          description: '✨ AICTE Approved Certificates Available! ✨\n🎓 Get your Course Completion Certificates with QR Code Authentication – check authenticity directly from our official website!\n😊 What We Offer:\n✅ AICTE Approved Certificates\n✅ QR Code for Online Verification (100% Genuine)\n✅ Offer Letters Provided\n✅ Available in Hard Copy & Soft Copy\n✅ Fast & Hassle-Free Process\n💼 Perfect for internships, career growth & academic recognition!\n✉️ DM Now to Get Yours Quickly!\n\n❤️ @nfxselleraashu\n\n🌫🌐🌫🌐🌟🌫🌐\nhttps://t.me/NETFLIXCHEAPSERVICE',
          price: 499.00,
          imageUrl: 'https://placehold.co/300x200/FF4500/FFFFFF?text=AICTE+Certificate',
          availableValidities: ['Internship Certificate', 'Offer Letter', 'Combo'],
          prices: { 'Internship Certificate': 499.00, 'Offer Letter': 499.00, 'Combo': 899.00 },
          createdAt: new Date()
        },
        {
          _id: 'g_individual',
          name: 'Gemini AI Individual Plan',
          description: 'One year with 1TB storage',
          price: 149.00,
          imageUrl: 'https://placehold.co/300x200/6A5ACD/FFFFFF?text=Gemini+Individual',
          availableValidities: ['1-month'],
          prices: { '1-month': 149.00 },
          createdAt: new Date(Date.now() + 1000)
        },
        {
          _id: 'g_family',
          name: 'Gemini AI Family Plan',
          description: 'Share with up to 5 family members.',
          price: 349.00,
          imageUrl: 'https://placehold.co/300x200/6A5ACD/FFFFFF?text=Gemini+Family',
          availableValidities: ['1-month'],
          prices: { '1-month': 349.00 },
          createdAt: new Date(Date.now() + 2000)
        }
    ].map(p => ({
        ...p,
        isUnavailable: (p.price > 0 && p.price < 48) || p.isUnavailable
    })));

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-gray-900 text-white">
            <style>
                {`
                @keyframes slide {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .slide-alert {
                    animation: slide 10s linear infinite;
                }
                `}
            </style>
            <Navbar cartItemCount={cartItemCount} onCartClick={() => togglePage('cart')} onHomeClick={() => togglePage('home')} />
            
            {currentPage === 'home' ? (
                <div className="w-full max-w-4xl space-y-8 mt-16">
                    <HeroSection />

                    <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-800 shadow-2xl flex items-center justify-center text-center p-4">
                        <div className="text-white">
                            <h1 className="text-3xl sm:text-5xl font-extrabold mb-2">Gemini AI</h1>
                            <p className="text-lg sm:text-2xl font-semibold">One year with 2TB storage and many more.</p>
                            <p className="text-sm mt-2 opacity-80">This offer is valid for a limited time only till 29 September!</p>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-700">
                        <div className="text-center">
                            <div className="w-full bg-red-500 py-1.5 rounded-full overflow-hidden mb-4">
                                <p className="text-white font-bold text-sm slide-alert whitespace-nowrap">
                                    HURRY UP! LIMITED TIME OFFER
                                </p>
                            </div>
                            
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Offer Ends In:</h2>
                            <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-6" id="countdown-timer">
                                <div className="text-center">
                                    <span className="text-3xl sm:text-5xl font-bold text-indigo-400 countdown-number">{countdown.days}</span>
                                    <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase">Days</p>
                                </div>
                                <span className="text-3xl sm:text-5xl font-bold text-gray-500">:</span>
                                <div className="text-center">
                                    <span className="text-3xl sm:text-5xl font-bold text-indigo-400 countdown-number">{countdown.hours}</span>
                                    <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase">Hours</p>
                                </div>
                                <span className="text-3xl sm:text-5xl font-bold text-gray-500">:</span>
                                <div className="text-center">
                                    <span className="text-3xl sm:text-5xl font-bold text-indigo-400 countdown-number">{countdown.minutes}</span>
                                    <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase">Minutes</p>
                                </div>
                                <span className="text-3xl sm:text-5xl font-bold text-gray-500">:</span>
                                <div className="text-center">
                                    <span className="text-3xl sm:text-5xl font-bold text-indigo-400 countdown-number">{countdown.seconds}</span>
                                    <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase">Seconds</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-inner">
                                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">Individual Plan</h3>
                                    <p className="text-sm text-gray-400 mb-4">Perfect for a single user.</p>
                                    <p className="text-4xl font-extrabold text-white">{formatIndianCurrency(149)}<span className="text-base text-gray-400 font-normal">/month*</span></p>
                                     <button
                                        onClick={() => handleAddToCart(allProducts.find(p => p._id === 'g_individual'), '1-month', 149.00, 1)}
                                        className="w-full mt-4 text-center bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition-colors hover:scale-105 transition-transform"
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-inner">
                                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">Family Plan</h3>
                                    <p className="text-sm text-gray-400 mb-4">Share with up to 5 family members.</p>
                                    <p className="text-4xl font-extrabold text-white">{formatIndianCurrency(349)}<span className="text-base text-gray-400 font-normal">/month*</span></p>
                                    <button
                                        onClick={() => handleAddToCart(allProducts.find(p => p._id === 'g_family'), '1-month', 349.00, 1)}
                                        className="w-full mt-4 text-center bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition-colors hover:scale-105 transition-transform"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-4">*Prices are approximate and subject to change.</p>
                            
                            <div className="mt-8">
                                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                                    <a href="https://t.me/NETFLIXCHEAPSERVICE" target="_blank" rel="noopener noreferrer" className="flex-1 w-full text-center bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition-colors hover:scale-105 transition-transform">
                                        <i className="fa-brands fa-telegram mr-2"></i>Get on Telegram
                                    </a>
                                    <a href="https://chat.whatsapp.com/DJYW1k5F5Dm2JcSvNph3ut" target="_blank" rel="noopener noreferrer" className="flex-1 w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors hover:scale-105 transition-transform">
                                        <i className="fa-brands fa-whatsapp mr-2"></i>Get on WhatsApp
                                    </a>
                                </div>

                                <button 
                                    onClick={toggleDropbox} 
                                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-4 hover:scale-105 transition-transform"
                                >
                                    {isDropboxOpen ? 'Show Less' : 'Show More Details'}
                                </button>
                                {isDropboxOpen && (
                                    <div className="mt-4 p-6 bg-gray-900 rounded-xl shadow-inner text-left">
                                        <h3 className="text-lg font-bold mb-2">🎉 Premium Google AI + 2TB Cloud Plan (1 Year) 🎉</h3>
                                        <h4 className="font-semibold mt-4">🔐 What You’ll Get:</h4>
                                        <ul className="list-disc list-inside space-y-2 mt-2 text-gray-300">
                                            <li>✨ Gemini Pro Access – Google’s most powerful AI (12 Months)</li>
                                            <li>🎞 Early Access to Veo 3 – HD AI Video Generator</li>
                                            <li>📓 NotebookLM Pro – Smarter research & note-taking</li>
                                            <li>🚀 Priority Access to Google’s Upcoming AI Tools</li>
                                            <li>☁️ 2TB Google One Storage + Premium Benefits</li>
                                            <li>👨‍👩‍👧‍👦 Family Plan – Add up to 5 members</li>
                                            <li>✅ Full Gmail Control – Change password & recovery anytime</li>
                                        </ul>
                                        <p className="mt-6 text-red-400 font-bold">⏳ Sale ending soon – 29sept price will increase in a few days!</p>
                                        <p className="mt-2 text-orange-400 font-bold">⚡️ Limited stock – Act now!</p>

                                        <hr className="my-6 border-gray-700" />

                                        <h3 className="text-lg font-bold mb-2">📦 Google One Premium Storage Offer</h3>
                                        <ul className="list-disc list-inside space-y-2 mt-2 text-gray-300">
                                            <li>✨ 2 TB Cloud Space – Store your photos, videos & files safely</li>
                                            <li>📸 Google Photos Backup Included</li>
                                            <li>🔗 Access via Invitation Link</li>
                                            <li>🕒 1 Year Validity</li>
                                            <li>💰 Only {formatIndianCurrency(149)}</li>
                                        </ul>
                                        <p className="mt-6 text-orange-400 font-bold">🚀 Grab now & enjoy secure storage anywhere, anytime!</p>
                                    </div>
                                )}
                                {isDropboxOpen && (
                                    <button 
                                        onClick={toggleDropbox} 
                                        className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors hover:scale-105 transition-transform"
                                    >
                                        Close
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Product Section */}
                    <ProductsSection products={allProducts} onProductClick={(product) => togglePage('product-detail', product)} />
                </div>
            ) : currentPage === 'cart' ? (
                <CartPage 
                    cart={cart}
                    products={allProducts}
                    onIncrease={handleIncreaseQuantity}
                    onDecrease={handleDecreaseQuantity}
                    onRemove={handleRemoveProduct}
                    onClear={handleClearCart}
                    onCheckout={() => togglePage('checkout')}
                />
            ) : currentPage === 'checkout' ? (
                <CheckoutPage
                    cart={cart}
                    products={allProducts}
                    onBack={() => togglePage('cart')}
                    onCheckoutWithUpi={handleCheckoutWithUpi}
                />
            ) : (
                <ProductDetailPage 
                    product={selectedProduct}
                    allProducts={allProducts}
                    onBack={() => togglePage('home')}
                    onAddToCart={handleAddToCart}
                    onProductClick={togglePage}
                />
            )}
            <OrderConfirmationModal
                isOpen={showOrderConfirmation}
                onClose={handleOrderConfirmationClose}
                orderId={orderId}
                cartItems={Object.entries(cart).map(([key, item]) => {
                    const product = allProducts.find(p => p._id === item.productId);
                    return { ...product, quantity: item.quantity, validity: item.validity, price: item.price };
                }).filter(item => item.quantity > 0)}
                total={Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0)}
            />
             <footer className="w-full text-center p-4 mt-12 bg-gray-800 rounded-t-xl shadow-inner">
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="https://t.me/NETFLIXCHEAPSERVICE" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.046 2.054a.97.97 0 0 0-.649-.125l-19.987 7.74a.89.89 0 0 0 .195 1.637l5.228 1.624a1.07 1.07 0 0 0 .762-.17l8.24-5.32c.264-.17.514.072.327.323L11.517 14.88a.936.936 0 0 0-.056.918l2.67 8.046a.834.834 0 0 0 1.25.597l2.84-2.148c.55-.415 1.036-.88 1.488-1.396.657-.75 1.087-1.42 1.34-2.025.253-.605.353-1.074.296-1.53-.13-1.05-.724-1.637-2.038-2.585l.235-5.3a.856.856 0 0 0-.64-.91z"/></svg>
                    </a>
                    <a href="https://chat.whatsapp.com/DJYW1k5F5Dm2JcSvNph3ut" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.03 2.001c-5.591 0-10.13 4.54-10.13 10.13 0 1.864.509 3.66 1.472 5.207l-1.59 5.823 6.002-1.579c1.503.829 3.171 1.264 4.248 1.264h.01c5.592 0 10.128-4.538 10.128-10.128s-4.536-10.13-10.129-10.13zm.022 2.09a8.04 8.04 0 0 1 5.727 2.378 8.04 8.04 0 0 1 2.378 5.728 8.04 8.04 0 0 1-2.378 5.728l-.01.01-.01.01-4.27 1.123 1.134-4.148-.012-.02c-1.229.68-2.67.994-4.23.994-4.455 0-8.077-3.621-8.077-8.077 0-4.456 3.622-8.077 8.077-8.077zm-3.056 6.54c.068.01.144.02.215.035.158.034.254.165.41.332.115.121.218.232.316.34.407.41.821.848 1.224 1.272.196.205.378.41.564.606l.01.012c.08.083.16.166.24.248.535.53.947.886 1.348.97.433.09.84.037 1.22-.11.233-.09.52-.22.75-.314.28-.112.51-.237.712-.358.55-.308.976-.563 1.54-.77.104-.04.22-.06.33-.08.156-.03.315-.02.476.028.188.058.337.114.475.195.42.235.795.54 1.05.908.205.295.328.618.328.98s-.24.79-.53 1.053c-.332.302-.68.44-1.047.53-.13.033-.274.05-.41.07-.15.023-.29.043-.43.058-.29.03-.58.03-.86.03l-.007.01-1.398-.01c-.57.008-1.14-.02-1.71-.05-.44-.02-.87-.06-1.3-.11-.47-.058-.93-.135-1.38-.225-.97-.19-1.93-.46-2.818-.847-1.127-.487-2.18-1.12-3.1-1.92-.857-.732-1.57-1.597-2.146-2.584-.526-.89-.884-1.93-1.04-3.04-.15-.96-.13-1.98.05-3.03.178-.992.51-1.9.99-2.73a.81.81 0 0 1 .157-.225c.18-.18.36-.36.54-.54.34-.34.69-.69.96-.96.22-.22.44-.44.66-.66.26-.26.54-.48.82-.7.21-.17.43-.32.65-.46l.006-.002.008-.005a.25.25 0 0 1 .18-.08c.07.01.128.02.186.028l.002.001z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/nfxseller/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.013 4.85.071 1.17.055 1.805.249 2.227.423.42.179.749.46.967.681.218.22.498.502.677.92.18.423.375 1.057.432 2.228.058 1.265.07 1.645.07 4.849 0 3.205-.012 3.584-.07 4.85-.056 1.17-.25 1.805-.425 2.227-.179.423-.46.751-.68 0.969-.22.218-.502.499-.92.678-.423.18-1.057.374-2.228.432-1.265.058-1.645.07-4.85.07-3.205 0-3.585-.012-4.85-.07-1.17-.055-1.805-.249-2.227-.423-.42-.179-.749-.46-.967-.681-.218-.22-.498-.502-.677-.92-.18-.423-.375-1.057-.432-2.228-.058-1.265-.07-1.645-.07-4.849 0-3.205.012-3.584.07-4.85.056-1.17.25-1.805.425-2.227.179-.423.46-.751.68-.969.22-.218.502-.499.92-.678.423-.18 1.057-.374 2.228-.432 1.265-.058 1.645-.07 4.85-.07zm0-2.163c-3.259 0-3.666.014-4.943.072-1.309.062-2.222.28-3.01.597-.79.317-1.424.773-2.062 1.412-.638.638-1.095 1.272-1.412 2.062-.317.788-.535 1.701-.597 3.01-.057 1.27-.07 1.676-.07 4.935 0 3.259.013 3.665.07 4.943.062 1.308.28 2.222.597 3.01.317.79.773 1.424 1.412 2.062.638.638 1.272 1.095 2.062 1.412.788.317 1.701.535 3.01.597 1.27.058 1.676.07 4.943.07s3.666-.013 4.943-.07c1.308-.062 2.222-.28 3.01-.597.79-.317 1.424-.773 2.062-1.412.638-.638 1.272-1.095 1.412-2.062.317-.788.535-1.701.597-3.01.057-1.27.07-1.676.07-4.943s-.013-3.666-.07-4.943c-.062-1.308-.28-2.222-.597-3.01-.317-.79-.773-1.424-1.412-2.062-.638-.638-1.272-1.095-2.062-1.412-.788-.317-1.701-.535-3.01-.597-1.27-.058-1.676-.07-4.943-.07zm0 13.883c-2.484 0-4.502-2.019-4.502-4.502s2.018-4.502 4.502-4.502 4.502 2.019 4.502 4.502-2.019 4.502-4.502 4.502zm0-2.163c1.289 0 2.339-1.05 2.339-2.339s-1.05-2.339-2.339-2.339-2.339 1.05-2.339 2.339 1.05 2.339 2.339 2.339zm-6.208-8.877c0 .546-.443.989-.989.989s-.989-.443-.989-.989.443-.989.989-.989.989.443.989.989z"/></svg>
                    </a>
                </div>
                <div className="text-sm text-gray-400">
                    <p className="mb-2">Trusted Since 2018</p>
                    <p>&copy; 2025 NFXSELLERAASHU. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
