import React, { useState, useEffect } from 'react';
import { Minus, Plus, ShoppingCart, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  description: string;
  discount: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Royal Canin Medium Adult",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 850000,
    originalPrice: 1000000,
    description: "Thức ăn cao cấp cho chó trưởng thành giống vừa",
    discount: 15
  },
  {
    id: 2,
    name: "Whiskas Adult Ocean Fish",
    image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    price: 255000,
    originalPrice: 300000,
    description: "Thức ăn cho mèo trưởng thành vị cá biển",
    discount: 15
  },
  {
    id: 3,
    name: "Pedigree Puppy",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 170000,
    originalPrice: 200000,
    description: "Thức ăn cho chó con các giống",
    discount: 15
  },
  {
    id: 4,
    name: "Me-O Kitten",
    image: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 110500,
    originalPrice: 130000,
    description: "Thức ăn cho mèo con dưới 1 năm tuổi",
    discount: 15
  },
  {
    id: 5,
    name: "SmartHeart Gold",
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    price: 595000,
    originalPrice: 700000,
    description: "Thức ăn cao cấp cho chó trưởng thành",
    discount: 15
  }
];

const FeaturedProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const currentProducts = [
    products[currentIndex % products.length],
    products[(currentIndex + 1) % products.length],
    products[(currentIndex + 2) % products.length],
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      // Implement add to cart logic here
      console.log('Added to cart:', { ...selectedProduct, quantity });
      setSelectedProduct(null);
      setQuantity(1);
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sản Phẩm Nổi Bật</h2>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-rose-500 text-white px-2 py-1 rounded-full">
                    -{product.discount}%
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-rose-500 font-bold">{formatPrice(product.price)}</p>
                      <p className="text-gray-500 text-sm line-through">{formatPrice(product.originalPrice)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
            aria-label="Next products"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Product Detail Dialog */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="relative">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
                    <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-rose-500">{formatPrice(selectedProduct.price)}</p>
                      <p className="text-gray-500 line-through">{formatPrice(selectedProduct.originalPrice)}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-gray-700">Số lượng:</span>
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuantity(Math.max(1, quantity - 1));
                          }}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border-x">{quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuantity(quantity + 1);
                          }}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart();
                      }}
                      className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;