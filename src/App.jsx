import React, { useState, useEffect } from 'react';

// Toast Notification Component
const ToastNotification = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // Hide after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white p-4 rounded-lg shadow-xl transition-opacity duration-300">
            <p className="font-semibold">{message}</p>
        </div>
    );
};

// Modal for order confirmation
const OrderConfirmationModal = ({ isOpen, onClose, orderId, cartItems, total }) => {
    if (!isOpen) return null;

    // Helper to format currency (defined again here for self-contained components)
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

    const whatsappMessage = encodeURIComponent(
        `Hello! I've placed an order on NFXSELLERAASHU. Order Details:\n` +
        cartItems.map(item => `${item.name} x${item.quantity} (${item.validity ? item.validity : 'one-time'}) - ${formatIndianCurrency(item.price)}`).join('\n') +
        `\nTotal: ${formatIndianCurrency(total)}\nKindly provide your UPI transaction ID and payment screenshot here for verification.`
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

// Refund Policy Modal Component
const RefundPolicyModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 border border-gray-700">
                <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <h2 className="text-2xl font-bold text-amber-500">Refund Policy – NFXSELLERAASHU</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="text-left space-y-4 text-gray-300 text-sm">
                    <p>At NFXSELLERAASHU, customer satisfaction is important to us. However, due to the nature of our digital and service-based products, refunds are only granted under specific conditions as outlined below.</p>
                    
                    <h3 className="text-lg font-bold text-green-400">✅ Eligible for Refund</h3>
                    <p>We offer a refund only in the following situations:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                        <li><strong>Product Out of Stock</strong> – If the product you ordered is unavailable or cannot be delivered.</li>
                        <li><strong>Technical or Product Issues</strong> – If the product has a verified issue from our end that prevents proper use.</li>
                        <li><strong>Plan or Order Cancellation by Us</strong> – If your order or plan is canceled due to an internal error or issue on our side.</li>
                    </ul>
                    <p className="pl-4">In such cases, the full refund will be processed to your original payment method within **5–7 business days**.</p>

                    <h3 className="text-lg font-bold text-red-400">❌ Not Eligible for Refund</h3>
                    <p>Refunds will not be provided under the following conditions:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                        <li><strong>Customer Mistake</strong> – If you entered incorrect details, selected the wrong product, or made any other mistake during purchase.</li>
                        <li><strong>Active or Delivered Products</strong> – Once a digital product, plan, or service has been activated or delivered, it becomes non-refundable.</li>
                        <li><strong>Ignoring Provided Disclaimers</strong> – If you request a refund after failing to read or follow the disclaimers or product descriptions clearly stated on our website.</li>
                    </ul>
                    
                    <h3 className="text-lg font-bold text-yellow-400">⚠️ Important Note</h3>
                    <p>All users are requested to read the product description and disclaimer carefully before purchase. By placing an order, you agree to our Refund Policy and acknowledge these terms.</p>
                    
                    <p className="mt-4">If you believe your case qualifies for a refund under our policy, please contact our support team at:</p>
                    <p className="text-green-400 font-bold">📧 tempaashu8252@gmail.com</p>
                </div>
            </div>
        </div>
    );
};


// Navbar Component
const Navbar = ({ cartItemCount, onCartClick, onHomeClick, onShowRefundPolicy }) => {
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
                <button onClick={onShowRefundPolicy} className="relative hover:text-amber-400 transition-colors duration-200 transition-transform hover:scale-105">
                    Refund Policy
                </button>
                <a href="https://t.me/NETFLIXCHEAPSERVICE" target="_blank" rel="noopener noreferrer" className="relative hover:text-amber-400 transition-colors duration-200 transition-transform hover:scale-105">PROOF</a>
                <button className="text-amber-500 hover:text-amber-400 transition-colors duration-200 hover:scale-105">
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
    }, [banners.length]);

    const { text, bgColor } = banners[currentBannerIndex];

    return (
        <div className={`p-4 rounded-xl shadow-lg mt-8 transition-colors duration-1000 ${bgColor} w-full`}>
            <p className="text-xl md:text-2xl font-extrabold tracking-tight text-white flex items-center justify-center space-x-4 animate-fade-in-out">
                {text}
            </p>
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
const HeroSection = ({ searchTerm, onSearchChange }) => {
    const placeholders = ["WELCOME BY AASHU","SEARCH FOR NETFLIX", "SEARCH FOR AMAZON PRIME", "SEARCH FOR CANVA", "SEARCH FOR MANY MORE...."];
    const [placeholder, setPlaceholder] = useState("");
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    
    // Typing speeds (adjusted for smoother transition)
    const TYPING_SPEED = 100;
    const DELETING_SPEED = 50;
    const PAUSE_TIME = 1500;

    useEffect(() => {
        let timer;
        let isMounted = true;
        
        // Stop animation if user is actively searching
        if (searchTerm) {
            setPlaceholder(searchTerm);
            return () => clearTimeout(timer);
        }

        const currentPhrase = placeholders[placeholderIndex];
        
        const handleTyping = () => {
            if (!isMounted) return;
            
            if (!isDeleting) {
                // Typing phase
                if (placeholder.length < currentPhrase.length) {
                    setPlaceholder(prev => currentPhrase.slice(0, prev.length + 1));
                    timer = setTimeout(handleTyping, TYPING_SPEED);
                } else {
                    // Start pause before deleting
                    timer = setTimeout(() => setIsDeleting(true), PAUSE_TIME);
                }
            } else {
                // Deleting phase
                if (placeholder.length > 0) {
                    setPlaceholder(prev => currentPhrase.slice(0, prev.length - 1));
                    timer = setTimeout(handleTyping, DELETING_SPEED);
                } else {
                    // Deleting complete, move to next phrase
                    setIsDeleting(false);
                    setPlaceholderIndex(prevIndex => (prevIndex + 1) % placeholders.length);
                    // Next cycle starts immediately via dependency array change
                }
            }
        };

        timer = setTimeout(handleTyping, TYPING_SPEED);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [placeholder, isDeleting, placeholderIndex, placeholders, searchTerm]);
    

    return (
        <div className="text-center w-full max-w-4xl mx-auto">
            <div className="relative mx-auto w-full">
                <input
                    type="text"
                    value={searchTerm} // Controlled component value
                    onChange={(e) => onSearchChange(e.target.value)} // Update parent state on change
                    placeholder={searchTerm || placeholder} // Show search term or dynamic placeholder
                    className="w-full py-3 pl-12 pr-4 text-slate-200 bg-indigo-700 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 hover:scale-[1.01]"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </div>
            <DynamicTextBanner />
        </div>
    );
};

// New Scrolling Alert Component
const ScrollingAlert = () => {
    return (
        <div className="w-full overflow-hidden bg-amber-500 py-2 rounded-lg shadow-lg my-4 border border-amber-600">
            <div className="text-black font-extrabold text-xl whitespace-nowrap marquee-container">
                <span className="marquee-content inline-block px-8">
                     CHATGPT ARRIVED  &nbsp; AI COMBO ARRIVED  &nbsp;
                     CHATGPT ARRIVED  &nbsp;  AI COMBO ARRIVED  &nbsp;
                </span>
                <style>{`
                    @keyframes marquee-rtl {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-50%); }
                    }
                    .marquee-container {
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .marquee-content {
                        display: inline-block;
                        padding-left: 100%;
                        animation: marquee-rtl 15s linear infinite;
                        animation-direction: alternate; /* Alternates between left-to-right and right-to-left */
                    }
                `}</style>
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
            onClick={() => { 
                !product.isUnavailable && onProductClick('product-detail', product); 
            }}
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
            {product.isNewArrival && (
                 <span className="absolute top-2 right-2 bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    NEW!
                </span>
            )}
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
            {products.length === 0 ? (
                <p className="text-center text-xl text-gray-400">No products found matching your search criteria.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} onProductClick={onProductClick} />
                    ))}
                </div>
            )}
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
                        <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 flex flex-col md:flex-row items-center justify-between font-bold text-xl">
                            <span className="mb-4 md:mb-0">Total: {formatIndianCurrency(total)}</span>
                            <div className="flex space-x-2 w-full md:w-auto">
                                <button onClick={onClear} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors hover:scale-105 transition-transform">
                                    Clear Cart
                                </button>
                                <button onClick={onCheckout} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors hover:scale-105 transition-transform">
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
                        
                        {/* Static Image tag for QR Code - Uses /qrcodedaashu.png from the public folder */}
                        <div className="w-48 h-48 bg-white p-2 rounded-lg">
                            <img src="/qrcodeaashu.png" alt="UPI QR Code" className="w-full h-full object-contain" />
                        </div>

                        <div className="text-sm text-gray-400 text-center space-y-1">
                            <p className="font-bold text-red-400">IMPORTANT:</p>
                            <p>BANK NAME : ADITYA KUMAR : After completing your UPI payment, please send the transaction ID and a screenshot of the payment on WhatsApp **8863889778** along with your cart details for quick verification.</p>
                        </div>
                        <p className="text-white text-lg font-bold">UPI ID: aashusinghadi8252@okaxis</p>
                        <button 
                            onClick={() => onCheckoutWithUpi(cartItems, total)} // This correctly calls the parent function
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center hover:scale-105 transition-transform"
                        >
                            Proceed with UPI
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Image Slider Component for Proofs
const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative w-full md:w-1/3 h-64 shadow-lg rounded-lg overflow-hidden flex items-center justify-center bg-gray-700">
            {/* Image */}
            <img 
                src={images[currentIndex]} 
                alt={`Proof ${currentIndex + 1}`} 
                className="w-full h-full object-contain"
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src=`https://placehold.co/300x300/555/FFF?text=Proof+Image+${currentIndex + 1}`;
                }}
            />
            
            {/* Navigation Arrows */}
            <button onClick={goToPrevious} className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={goToNext} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 flex space-x-1">
                {images.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${index === currentIndex ? 'bg-white' : 'bg-gray-400 bg-opacity-70'}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};


// ProductDetailPage Component
const ProductDetailPage = ({ product, allProducts, onBack, onAddToCart, onProductClick }) => {
    // Define the proof images for the AICTE Certificate
    const aicteProofImages = [
        "https://placehold.co/300x300/FF4500/FFFFFF?text=dm",
        "https://placehold.co/300x300/FF8C00/FFFFFF?text=contact+info",
        "https://placehold.co/300x300/FFD700/000000?text=certicate"
    ];

    // Determine initial validity and price for the product detail page
    const getInitialValidity = (p) => {
        if (p.availableValidities?.length > 0) {
            return p.availableValidities[0];
        }
        // Fallback for single-price items (like "one-time")
        return p.prices && Object.keys(p.prices).length > 0 ? Object.keys(p.prices)[0] : null;
    };


    // --- CRITICAL FIX: Ensure product object is fully valid before proceeding ---
    if (!product) {
        return (
             <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 pt-24 bg-gray-900 text-white justify-center">
                 <p className="text-xl text-red-500">Error loading product details. Please return to home and try again.</p>
                 <button onClick={() => onProductClick('home', null)} className="mt-4 bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Back to Products
                 </button>
             </div>
        );
    }
    // -------------------------------------------------------------------------
    
    // Set initial state only after product validation
    const initialValidity = getInitialValidity(product);

    const [quantity, setQuantity] = useState(1);
    const [selectedValidity, setSelectedValidity] = useState(initialValidity);
    const [isAdded, setIsAdded] = useState(false);

    // Recalculate price based on selection
    const currentPrice = selectedValidity && product.prices && product.prices[selectedValidity] !== undefined 
                         ? product.prices[selectedValidity] 
                         : product.price;

    const handleAddToCartClick = () => {
        // Fallback for validity if none selected (for one-time items)
        const finalValidity = selectedValidity || 'one-time';
        onAddToCart(product, finalValidity, currentPrice, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const allOtherProducts = allProducts.filter(p => p._id !== product._id);

    // Conditional rendering for the product image/slider
    const renderProductVisual = () => {
        if (product._id === 'a1') {
            return <ImageSlider images={aicteProofImages} />;
        }
        return (
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full md:w-1/3 h-auto rounded-lg object-cover shadow-lg"
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src=`https://placehold.co/300x200/555/FFF?text=${product.name.replace(/ /g, '+')}`;
                }}
            />
        );
    };
        
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
                    {renderProductVisual()}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                        <p className="text-md text-gray-400 mb-4 whitespace-pre-line">{product.description}</p>
                        
                        {!product.contactForPrice && !product.isUnavailable && (
                            <>
                                <div className="space-y-4 mb-4">
                                    {product.availableValidities?.length > 1 && ( // Only show dropdown if more than one validity exists
                                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                            <label className="text-lg font-semibold">Select Validity:</label>
                                            <select
                                                value={selectedValidity}
                                                onChange={(e) => setSelectedValidity(e.target.value)}
                                                className="w-full sm:w-auto p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            >
                                                {product.availableValidities.map(validity => (
                                                    <option key={validity} value={validity}>
                                                        {validity} - {formatIndianCurrency(product.prices?.[validity])}
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
                                    Price: {formatIndianCurrency(currentPrice * quantity)}
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
                            <ProductCard key={p._id} product={p} onProductClick={(page, product) => onProductClick('product-detail', p)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


// Main App component that combines all the features
const App = () => {
    
    const [cart, setCart] = useState({});
    const cartItemCount = Object.values(cart).reduce((total, item) => total + item.quantity, 0);

    const [isDropboxOpen, setIsDropboxOpen] = useState(false);
    
    // New state for user name and modals
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
    const [showRefundPolicy, setShowRefundPolicy] = useState(false); // NEW STATE FOR REFUND POLICY
    const [orderId, setOrderId] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State for live search

    // Toast Notification State
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');


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

        // Show Toast Notification
        setToastMessage(`Added ${quantity}x ${product.name} to cart!`);
        setShowToast(true);
    };

    const handleToastClose = () => {
        setShowToast(false);
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
        // Scrolls to top on page change for better UX
        window.scrollTo(0, 0);
    };
    
    // FIX: This function now correctly handles generating the order ID and showing the modal
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

    const toggleDropbox = () => {
        setIsDropboxOpen(!isDropboxOpen);
    };
    
    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };


    const [allProducts] = useState([
        { _id: 's1', name: 'Netflix', description: 'Streaming Services (Movies & TV Shows)', price: 159.00, imageUrl: 'https://placehold.co/300x200/FF0000/FFFFFF?text=Netflix', availableValidities: ['1-month', '6-month', '1-year'], prices: { '1-month': 159.00, '6-month': 899.00, '1-year': 1699.00 }, createdAt: new Date(Date.now() - 86400000 * 2) }, // MARKED AS AVAILABLE (removed isUnavailable: true)
        { _id: 's2', name: 'Amazon Prime Video', description: 'Streaming Services (Movies & TV Shows)', price: 49.00, imageUrl: 'https://placehold.co/300x200/00A8E1/FFFFFF?text=Prime+Video', availableValidities: ['1-month', '6-month'], prices: { '1-month': 49.00, '6-month': 249.00 }, createdAt: new Date(Date.now() - 86400000 * 3) }, // UPDATED PRICE
        { _id: 's3', name: 'Jio Hotstar', description: 'Streaming Services (Movies & TV Shows)', price: 1149.00, imageUrl: 'https://placehold.co/300x200/007bff/FFFFFF?text=Hotstar', availableValidities: ['1-year'], prices: { '1-year': 1149.00 }, createdAt: new Date(Date.now() - 86400000 * 4) },
        { _id: 's4', name: 'ZEE5', description: 'Streaming Services (Movies & TV Shows)', price: 499.00, imageUrl: 'https://placehold.co/300x200/800080/FFFFFF?text=ZEE5', availableValidities: ['1-year'], prices: { '1-year': 499.00 }, createdAt: new Date(Date.now() - 86400000 * 5) },
        { _id: 's5', name: 'Sony LIV', description: 'Streaming Services (Movies & TV Shows)', price: 499.00, imageUrl: 'https://placehold.co/300x200/228B22/FFFFFF?text=Sony+LIV', availableValidities: ['1-year'], prices: { '1-year': 499.00 }, createdAt: new Date(Date.now() - 86400000 * 6) },
        { _id: 's6', name: 'Docubay', description: 'Streaming Services (Movies & TV Shows)', price: 3.99, imageUrl: 'https://placehold.co/300x200/4682B4/FFFFFF?text=Docubay', availableValidities: ['1-month', '6-month', '1-year'], prices: { '1-month': 3.99, '6-month': 3.99 * 5, '1-year': 3.99 * 9 }, createdAt: new Date(Date.now() - 86400000 * 7), isUnavailable: true },
        { _id: 'm1', name: 'Spotify Premium', description: "Get a premium ad-free experience. Note: This will only work on non-premium or fresh accounts. To continue listening to your old playlists, you can collaborate on them and listen to them on your new ad-free account.", price: 69.00, imageUrl: 'https://placehold.co/300x200/1DB954/FFFFFF?text=Spotify', availableValidities: ['2-month', '3-month', '6-month'], prices: { '2-month': 99.00, '3-month': 449.00, '6-month': 749.00 }, createdAt: new Date(Date.now() - 86400000 * 8) },
        { _id: 'm2', name: 'Youtube Premium', description: 'Video & Ad-Free Services - Ad-Free Viewing', price: 599.00, imageUrl: 'https://placehold.co/300x200/FF0000/FFFFFF?text=YouTube', availableValidities: ['6-month'], prices: { '6-month': 599.00 }, createdAt: new Date(Date.now() - 86400000 * 9) },
        { _id: 'd1', name: 'Adobe Creative All Apps', description: 'Design & Creativity - Full Suite Access', price: 1399.00, imageUrl: 'https://placehold.co/300x200/FF0000/FFFFFF?text=Adobe', availableValidities: ['1-month', '1-year'], prices: { '1-month': 1399.00, '1-year': 6199.00 }, createdAt: new Date(Date.now() - 86400000 * 10) },
        { _id: 'd2', name: 'Autodesk All Apps', description: 'Design & Creativity - Professional Design Tools', price: 2399.00, imageUrl: 'https://placehold.co/300x200/00BFFF/FFFFFF?text=Autodesk', availableValidities: ['1-year'], prices: { '1-year': 2399.00 }, createdAt: new Date(Date.now() - 86400000 * 11) },
        { _id: 'd3', name: 'Canva Pro', description: 'Design & Creativity - Advanced Graphic Design', price: 249.00, imageUrl: 'https://placehold.co/300x200/00C4CC/FFFFFF?text=Canva+Pro', availableValidities: ['1-year'], prices: { '1-year': 249.00 }, createdAt: new Date(Date.now() - 86400000 * 12) },
        { _id: 'o1', name: 'MS Office 365 | Lifetime', description: 'Office & Productivity - Lifetime Access', price: 1299.00, imageUrl: 'https://placehold.co/300x200/FF5722/FFFFFF?text=MS+Office', availableValidities: ['lifetime'], prices: { 'lifetime': 1299.00 }, createdAt: new Date(Date.now() - 86400000 * 13) },
        { _id: 'o2', name: 'Cursor', description: 'Office & Productivity - AI-powered Code Editor', price: 15.99, imageUrl: 'https://placehold.co/300x200/4CAF50/FFFFFF?text=Cursor', availableValidities: ['1-month', '6-month', '1-year'], prices: { '1-month': 15.99, '6-month': 15.99 * 5, '1-year': 15.99 * 9 }, createdAt: new Date(Date.now() - 86400000 * 14), isUnavailable: true },
        { _id: 'o5', 
          name: 'ChatGPT Go', 
          description: 'Office & Productivity - AI Chatbot Subscription. Note: login required', 
          price: 199.00, 
          imageUrl: 'https://placehold.co/300x200/74AA9C/FFFFFF?text=ChatGPT', 
          availableValidities: ['1 year'], 
          prices: { '1 year': 199.00 }, 
          createdAt: new Date(Date.now() - 86400000 * 16) 
        },
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
          price: 399.00,
          imageUrl: 'https://placehold.co/300x200/6A5ACD/FFFFFF?text=Gemini+Individual',
          availableValidities: ['1-year'],
          prices: { '1-year': 399.00 },
          createdAt: new Date(Date.now() + 1000)
        },
        // NEWLY ADDED PRODUCTS START HERE
        { _id: 'new_l1', name: 'Lovable', description: 'AI/Tech Service.', price: 6000, imageUrl: 'https://placehold.co/300x200/FF69B4/FFFFFF?text=Lovable', availableValidities: ['1 year'], prices: { '1 year': 6000 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_d1', name: 'Devin', description: 'AI/Tech Service.', price: 4900, imageUrl: 'https://placehold.co/300x200/6495ED/FFFFFF?text=Devin', availableValidities: ['1 year'], prices: { '1 year': 4900 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_g1', name: 'Gamma', description: 'AI/Tech Service.', price: 4200, imageUrl: 'https://placehold.co/300x200/20B2AA/FFFFFF?text=Gamma', availableValidities: ['1 year'], prices: { '1 year': 4200 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_r1', name: 'Replit', description: 'AI/Tech Service.', price: 4200, imageUrl: 'https://placehold.co/300x200/F08080/FFFFFF?text=Replit', availableValidities: ['1 year'], prices: { '1 year': 4200 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_n1', name: 'N8N', description: 'AI/Tech Service.', price: 4200, imageUrl: 'https://placehold.co/300x200/87CEEB/FFFFFF?text=N8N', availableValidities: ['1 year'], prices: { '1 year': 4200 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_w1', name: 'Warp', description: 'AI/Tech Service.', price: 3200, imageUrl: 'https://placehold.co/300x200/FFA07A/FFFFFF?text=Warp', availableValidities: ['1 year'], prices: { '1 year': 3200 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_b1', name: 'Bolt', description: 'AI/Tech Service.', price: 3200, imageUrl: 'https://placehold.co/300x200/9370DB/FFFFFF?text=Bolt', availableValidities: ['1 year'], prices: { '1 year': 3200 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_de1', name: 'Descript', description: 'AI/Tech Service.', price: 3200, imageUrl: 'https://placehold.co/300x200/B0C4DE/FFFFFF?text=Descript', availableValidities: ['1 year'], prices: { '1 year': 3200 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_wp1', name: '1 year of Wispr Flow Pro', description: 'Software Subscription.', price: 2600, imageUrl: 'https://placehold.co/300x200/00CED1/FFFFFF?text=Wispr+Pro', availableValidities: ['1 year'], prices: { '1 year': 2600 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_m2', name: '1 year of Magic Patterns Hobby', description: 'Software Subscription.', price: 2600, imageUrl: 'https://placehold.co/300x200/FFD700/000000?text=Magic+Patterns', availableValidities: ['1 year'], prices: { '1 year': 2600 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_g2', name: '1 year of Granola Business', description: 'Software Subscription.', price: 1800, imageUrl: 'https://placehold.co/300x200/DA70D6/FFFFFF?text=Granola+Business', availableValidities: ['1 year'], prices: { '1 year': 1800 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_l2', name: '1 year of Linear Business', description: 'Software Subscription.', price: 1800, imageUrl: 'https://placehold.co/300x200/4682B4/FFFFFF?text=Linear+Business', availableValidities: ['1 year'], prices: { '1 year': 1800 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_s1', name: '1 year of Superhuman Starter', description: 'Software Subscription.', price: 1800, imageUrl: 'https://placehold.co/300x200/FF69B4/FFFFFF?text=Superhuman+Starter', availableValidities: ['1 year'], prices: { '1 year': 1800 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_r2', name: '1 year of Raycast Pro', description: 'Software Subscription.', price: 1800, imageUrl: 'https://placehold.co/300x200/8A2BE2/FFFFFF?text=Raycast+Pro', availableValidities: ['1 year'], prices: { '1 year': 1800 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_p1', name: '1 year of Perplexity Pro', description: 'Software Subscription.', price: 1199, imageUrl: 'https://placehold.co/300x200/673AB7/FFFFFF?text=Perplexity+Pro', availableValidities: ['1 year'], prices: { '1 year': 1199 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_c1', name: '1 year of ChatPRD Pro', description: 'Software Subscription.', price: 2500, imageUrl: 'https://placehold.co/300x200/00A8E1/FFFFFF?text=ChatPRD+Pro', availableValidities: ['1 year'], prices: { '1 year': 2500 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'new_m3', name: '1 year of Mobbin Pro', description: 'Software Subscription.', price: 2500, imageUrl: 'https://placehold.co/300x200/1DB954/FFFFFF?text=Mobbin+Pro', availableValidities: ['1 year'], prices: { '1 year': 2500 }, createdAt: new Date(Date.now()), isNewArrival: true },
        { _id: 'ott1', name: 'ott play', description: 'OTT Play Premium Pack – 5 OTTs FREE for 1 Year!\n\n🎬 Unlimited Entertainment\n📺 Sony LIV – Top shows, sports & originals\n🎥 Lionsgate Play – Hollywood blockbusters & series\n🎭 Bollywood Play – Classic & trending Hindi movies\n🎞 Runn TV – 24x7 live TV & entertainment\n🎬 ShortsTV – Award-winning short films\n\n✅ Limited-Time Offer\n✅ 100% Genuine Activation Codes\n✅ Instant Delivery', price: 599, imageUrl: 'https://placehold.co/300x200/0000FF/FFFFFF?text=OTT+Play', availableValidities: ['1 year'], prices: { '1 year': 599 }, createdAt: new Date(Date.now()), isNewArrival: true } // New Product
    ].map(p => ({
        ...p,
        isUnavailable: (p.price > 0 && p.price < 48) || p.isUnavailable
    })));

    // Filtering logic based on searchTerm
    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-gray-900 text-white">
            <style>
            
            {`
                /* Global utility to prevent horizontal scrolling on small screens */
                body {
                    overflow-x: hidden;
                }
                .text-shadow {
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                }
            `}
            </style> 
            <Navbar 
                cartItemCount={cartItemCount} 
                onCartClick={() => togglePage('cart')} 
                onHomeClick={() => togglePage('home')} 
                onShowRefundPolicy={() => setShowRefundPolicy(true)} 
            />
            
            {currentPage === 'home' && (
                <div className="w-full max-w-6xl pt-24 space-y-10">
                    
                    <HeroSection searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                    
                    {/* New Scrolling Alert Banner */}
                    <ScrollingAlert />

                    {/* BGMI Alert Poster */}
                    <div className="bg-red-600 text-white p-4 rounded-xl shadow-2xl animate-pulse">
                        <div className="text-center font-bold text-xl mb-2">
                            For more info, packages & instant delivery
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-2xl font-extrabold text-yellow-300">BGMI UC 30% OFF.</p>
                                <p className="font-semibold">WHY PAYING FULL PRICE? NO CARDING FULL SAFE SOURCE</p>
                            </div>
                            <ul className="list-disc list-inside text-left mx-auto md:mx-0 space-y-1">
                                <li>💎 Trusted by hundreds of BGMI players!</li>
                                <li>✅ Instant Delivery</li>
                                <li>✅ 100% Safe & Secure</li>
                                <li>✅ 24/7 Support</li>
                            </ul>
                        </div>
                    </div>

                    {/* Gemini AI Offer Section */}
                    <div className="p-4 sm:p-8 rounded-xl bg-indigo-900 shadow-2xl flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0">
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <p className="text-4xl sm:text-5xl font-extrabold text-white text-shadow">
                                Gemini AI
                            </p>
                            <p className="text-xl sm:text-2xl font-semibold text-amber-300">
                                One year with 2TB storage and many more.
                            </p>
                        </div>
                        <div className="flex-1 max-w-xs w-full p-4 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
                            {allProducts.filter(p => p._id === 'g_individual').map(product => (
                                <div key={product._id} className="text-center">
                                    <h3 className="text-2xl font-bold mb-2 text-white">Individual Plan</h3>
                                    <p className="text-sm text-gray-400 mb-4">Perfect for a single user.</p>
                                    <p className="text-3xl font-extrabold text-amber-400">
                                        {formatIndianCurrency(product.prices['1-year'])}/yearly*
                                    </p>
                                    <button
                                        onClick={() => handleAddToCart(product, '1-year', product.prices['1-year'], 1)}
                                        className="block mt-4 w-full text-center bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition-colors hover:scale-105 transition-transform"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Alerts/Offer Section */}
                    <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-700">
                        <div className="text-center">
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <a href="https://t.me/NETFLIXCHEAPSERVICE" target="_blank" rel="noopener noreferrer" className="flex-1 w-full text-center bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition-colors hover:scale-105 transition-transform">
                                    <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M18.3 5.66c-.32-.23-.74-.29-1.12-.13L3.4 11.13c-.45.19-.74.6-.74 1.05s.29.86.74 1.05l13.78 5.6c.38.15.8.09 1.12-.13.32-.23.51-.62.51-1.04v-11.2c0-.42-.19-.81-.51-1.04zM16.5 13l-9.1-3.7 9.1-3.7v7.4z"/></svg>
                                    Get on Telegram
                                </a>
                                <a href="https://chat.whatsapp.com/DJYW1k5F5Dm2JcSvNph3ut" target="_blank" rel="noopener noreferrer" className="flex-1 w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors hover:scale-105 transition-transform">
                                    <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12.001 2.001C6.476 2.001 2 6.477 2 12.002c0 3.32 1.6 6.3 4.21 8.23l-.86 2.72c-.09.28.16.55.45.45l2.72-.86c1.93 2.61 4.91 4.21 8.23 4.21 5.525 0 10.001-4.476 10.001-10.001s-4.476-10.001-10.001-10.001zm4.706 14.542c-.08-.07-.21-.11-.36-.18l-1.3-.64c-.11-.05-.24-.07-.36-.07-.12 0-.25.02-.37.07l-.95.48c-.08.04-.15.06-.24.06-.09 0-.17-.02-.24-.06l-.95-.48c-.12-.05-.25-.07-.37-.07-.12 0-.25.02-.36.07l-1.3.64c.15.07-.28.11-.36.18-.08.07-.12.16-.12.27s.04.2.12.27l.95.48c.12.05.25.07.37.07z"/></svg>
                                    Get on WhatsApp
                                </a>
                            </div>

                            <button 
                                onClick={toggleDropbox} 
                                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors hover:scale-105 transition-transform mt-4"
                            >
                                {isDropboxOpen ? 'Show Less' : 'Show More Details'}
                            </button>
                            {isDropboxOpen && (
                                <div className="mt-4 p-6 bg-gray-900 rounded-xl shadow-inner text-left">
                                    {/* Gemini AI Offer Details */}
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

                                    {/* Google One Offer Details */}
                                    <h3 className="text-lg font-bold mb-2">📦 Google One Premium Storage Offer</h3>
                                    <ul className="list-disc list-inside space-y-2 mt-2 text-gray-300">
                                        <li>✨ 2 TB Cloud Space – Store your photos, videos & files safely</li>
                                        <li>📸 Google Photos Backup Included</li>
                                        <li>🔗 Access via Invitation Link</li>
                                        <li>🕒 1 Year Validity</li>
                                        <li>💰 Only ₹399</li>
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

                    <ProductsSection products={filteredProducts} onProductClick={(page, product) => togglePage(page, product)} />
                </div>
            )}

            {currentPage === 'cart' && (
                <CartPage 
                    cart={cart} 
                    products={allProducts} 
                    onIncrease={handleIncreaseQuantity} 
                    onDecrease={handleDecreaseQuantity} 
                    onRemove={handleRemoveProduct} 
                    onClear={handleClearCart}
                    onCheckout={() => togglePage('checkout')} 
                />
            )}
            
            {currentPage === 'checkout' && (
                <CheckoutPage 
                    cart={cart} 
                    products={allProducts} 
                    onBack={() => togglePage('cart')} 
                    onCheckoutWithUpi={handleCheckoutWithUpi}
                />
            )}

            {selectedProduct && currentPage === 'product-detail' && (
                <ProductDetailPage 
                    product={selectedProduct} 
                    allProducts={allProducts} 
                    onBack={() => togglePage('home')} 
                    onAddToCart={handleAddToCart}
                    onProductClick={togglePage}
                />
            )}

            {showOrderConfirmation && (
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
            )}

            <RefundPolicyModal 
                isOpen={showRefundPolicy} 
                onClose={() => setShowRefundPolicy(false)} 
            />

            <ToastNotification 
                message={toastMessage} 
                isVisible={showToast} 
                onClose={handleToastClose} 
            />


            {/* Footer */}
            <footer className="w-full mt-16 p-6 bg-indigo-900 border-t border-gray-700 text-center text-gray-400">
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="https://t.me/NETFLIXCHEAPSERVICE" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors duration-200 hover:scale-110">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.3 5.66c-.32-.23-.74-.29-1.12-.13L3.4 11.13c-.45.19-.74.6-.74 1.05s.29.86.74 1.05l13.78 5.6c.38.15.8.09 1.12-.13.32-.23.51-.62.51-1.04v-11.2c0-.42-.19-.81-.51-1.04zM16.5 13l-9.1-3.7 9.1-3.7v7.4z"/></svg>
                    </a>
                    <a href="https://chat.whatsapp.com/DJYW1k5F5Dm2JcSvNph3ut" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors duration-200 hover:scale-110">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.001 2.001C6.476 2.001 2 6.477 2 12.002c0 3.32 1.6 6.3 4.21 8.23l-.86 2.72c-.09.28.16.55.45.45l2.72-.86c1.93 2.61 4.91 4.21 8.23 4.21 5.525 0 10.001-4.476 10.001-10.001s-4.476-10.001-10.001-10.001zm4.706 14.542c-.08-.07-.21-.11-.36-.18l-1.3-.64c-.11-.05-.24-.07-.36-.07-.12 0-.25.02-.37.07l-.95.48c-.08.04-.15.06-.24.06-.09 0-.17-.02-.24-.06l-.95-.48c-.12-.05-.25-.07-.37-.07-.12 0-.25.02-.36.07l-1.3.64c.15.07-.28.11-.36.18-.08.07-.12.16-.12.27s.04.2.12.27l.95.48c.12.05.25.07.37.07z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/nfxseller/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors duration-200 hover:scale-110">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.16c3.21 0 3.61.01 4.88.07 1.1.05 1.77.23 2.22.45.6.3 1.05.74 1.45 1.13.4.4.78.84 1.09 1.42.3.57.48 1.34.52 2.39.06 1.28.07 1.68.07 4.88s-.01 3.6-.07 4.88c-.04 1.05-.22 1.82-.52 2.39-.31.58-.69 1.02-1.09 1.42-.4.4-.85.78-1.45 1.13-.45.22-1.12.4-2.22.45-1.27.06-1.67.07-4.88.07s-3.61-.01-4.88-.07c-1.1-.05-1.77-.23-2.22-.45-.6-.3-1.05-.74-1.45-1.13-.4-.4-.78-.84-1.09-1.42-.3-.57-.48-1.34-.52-2.39-.06-1.28-.07-1.68-.07-4.88s.01-3.6.07-4.88c.04-1.05.22-1.82.52-2.39.31-.58.69-1.02 1.09-1.42.4-.4.85-.78 1.45-1.13.45-.22 1.12-.4 2.22-.45 1.27-.06 1.67-.07 4.88-.07zm0 2.5c-3.13 0-3.52.01-4.75.06-1.02.05-1.44.22-1.72.35-.45.23-.74.52-1.03.81-.29.29-.58.58-.81 1.03-.13.28-.3.7-.35 1.72-.05 1.23-.06 1.62-.06 4.75s.01 3.52.06 4.75c.05 1.02.22 1.44.35 1.72.23.45.52.74.81 1.03.29.29.58.58 1.03.81.28.13.7.3 1.72.35 1.23.05 1.62.06 4.75.06s3.52-.01 4.75-.06c1.02-.05 1.44-.22 1.72-.35.45-.23.74-.52 1.03-.81.29-.29.58-.58 1.03-.81.13-.28.3-.7.35-1.72.05-1.23.06-1.62.06-4.75s-.01-3.52-.06-4.75c-.05-1.02-.22-1.44-.35-1.72-.23-.45-.52-.74-.81-1.03-.29-.29-.58-.58-1.03-.81-.28-.13-.7-.3-1.72-.35-1.23-.05-1.62-.06-4.75-.06zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm5.5-8.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/></svg>
                    </a>
                </div>
                <p className="text-sm font-semibold">Trusted Since 2018</p>
                <p className="text-xs mt-1">&copy; 2025 NFXSELLERAASHU. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;