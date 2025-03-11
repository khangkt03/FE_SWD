// Pet Slider
const petImages = [
  {
    url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    caption: "Chú chó đáng yêu"
  },
  {
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1143&q=80",
    caption: "Mèo xinh xắn"
  },
  {
    url: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1586&q=80",
    caption: "Chó con vui vẻ"
  },
  {
    url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    caption: "Mèo con dễ thương"
  }
];

let currentSlide = 0;
const petSlider = document.getElementById('petSlider');

function createSliderContent() {
  petSlider.innerHTML = petImages.map((image, index) => `
    <div class="absolute w-full h-full transition-opacity duration-1000 ${
      index === currentSlide ? 'opacity-100' : 'opacity-0'
    }">
      <img
        src="${image.url}"
        alt="${image.caption}"
        class="w-full h-full object-cover"
      />
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
        <p class="text-white text-xl font-semibold">${image.caption}</p>
      </div>
    </div>
  `).join('');

  // Add navigation buttons
  petSlider.innerHTML += `
    <button onclick="prevSlide()" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    </button>
    <button onclick="nextSlide()" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </button>
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      ${petImages.map((_, index) => `
        <button
          onclick="goToSlide(${index})"
          class="w-3 h-3 rounded-full transition-colors ${
            index === currentSlide ? 'bg-white' : 'bg-white/50'
          }"
          aria-label="Slide ${index + 1}"
        ></button>
      `).join('')}
    </div>
  `;
}

window.prevSlide = () => {
  currentSlide = (currentSlide - 1 + petImages.length) % petImages.length;
  createSliderContent();
};

window.nextSlide = () => {
  currentSlide = (currentSlide + 1) % petImages.length;
  createSliderContent();
};

window.goToSlide = (index) => {
  currentSlide = index;
  createSliderContent();
};

// Initialize slider
createSliderContent();

// Auto-advance slides
setInterval(window.nextSlide, 5000);

// Featured Products
const products = [
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

let currentIndex = 0;
let selectedProduct = null;
let quantity = 1;

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
}

function updateFeaturedProducts() {
  const featuredProducts = document.getElementById('featuredProducts');
  const currentProducts = [
    products[currentIndex % products.length],
    products[(currentIndex + 1) % products.length],
    products[(currentIndex + 2) % products.length],
  ];

  featuredProducts.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Sản Phẩm Nổi Bật</h2>
      
      <div class="relative">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${currentProducts.map(product => `
            <div
              class="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
              onclick="showProductDetail(${product.id})"
            >
              <div class="relative">
                <img
                  src="${product.image}"
                  alt="${product.name}"
                  class="w-full h-48 object-cover"
                />
                <div class="absolute top-2 right-2 bg-rose-500 text-white px-2 py-1 rounded-full">
                  -${product.discount}%
                </div>
              </div>
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">${product.name}</h3>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-rose-500 font-bold">${formatPrice(product.price)}</p>
                    <p class="text-gray-500 text-sm line-through">${formatPrice(product.originalPrice)}</p>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <button
          onclick="prevProduct()"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-gray-800">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        
        <button
          onclick="nextProduct()"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-gray-800">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  if (selectedProduct) {
    showProductDetail(selectedProduct.id);
  }
}

window.prevProduct = () => {
  currentIndex = (currentIndex - 1 + products.length) % products.length;
  updateFeaturedProducts();
};

window.nextProduct = () => {
  currentIndex = (currentIndex + 1) % products.length;
  updateFeaturedProducts();
};

window.showProductDetail = (productId) => {
  selectedProduct = products.find(p => p.id === productId);
  quantity = 1;
  
  const dialog = document.createElement('div');
  dialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
  dialog.innerHTML = `
    <div class="bg-white rounded-lg max-w-2xl w-full">
      <div class="relative">
        <button
          onclick="closeProductDetail()"
          class="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>
        
        <div class="p-6">
          <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/2">
              <img
                src="${selectedProduct.image}"
                alt="${selectedProduct.name}"
                class="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div class="md:w-1/2">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">${selectedProduct.name}</h3>
              <p class="text-gray-600 mb-4">${selectedProduct.description}</p>
              <div class="mb-4">
                <p class="text-2xl font-bold text-rose-500">${formatPrice(selectedProduct.price)}</p>
                <p class="text-gray-500 line-through">${formatPrice(selectedProduct.originalPrice)}</p>
              </div>
              
              <div class="flex items-center gap-4 mb-6">
                <span class="text-gray-700">Số lượng:</span>
                <div class="flex items-center border rounded-lg">
                  <button
                    onclick="updateQuantity(-1)"
                    class="p-2 hover:bg-gray-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14"/>
                    </svg>
                  </button>
                  <span class="px-4 py-2 border-x">${quantity}</span>
                  <button
                    onclick="updateQuantity(1)"
                    class="p-2 hover:bg-gray-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 5v14"/><path d="M5 12h14"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <button
                onclick="addToCart()"
                class="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(dialog);
};

window.closeProductDetail = () => {
  const dialog = document.querySelector('.fixed.inset-0');
  if (dialog) {
    dialog.remove();
  }
  selectedProduct = null;
  quantity = 1;
};

window.updateQuantity = (change) => {
  quantity = Math.max(1, quantity + change);
  showProductDetail(selectedProduct.id);
};

window.addToCart = () => {
  console.log('Added to cart:', { ...selectedProduct, quantity });
  closeProductDetail();
};

// Initialize featured products
updateFeaturedProducts();

// Auto-advance products
setInterval(window.nextProduct, 5000);

// Mobile menu
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('hidden');
  if (isOpen) {
    mobileMenu.classList.remove('hidden');
  } else {
    mobileMenu.classList.add('hidden');
  }
});

// Services
const services = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9"/><path d="M21 9V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"/><path d="M3 9h18"/></svg>`,
    title: 'Khách Sạn Thú Cưng',
    description: 'Nơi lưu trú an toàn và thoải mái cho thú cưng khi bạn vắng nhà'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,
    title: 'Cắt Tỉa & Spa',
    description: 'Dịch vụ làm đẹp chuyên nghiệp giúp thú cưng luôn sạch sẽ và khỏe mạnh'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344- 2.5"/><path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306"/></svg>`,
    title: 'Huấn Luyện',
    description: 'Các khóa huấn luyện chuyên nghiệp giúp cải thiện hành vi của thú cưng'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    title: 'Chăm Sóc Y Tế',
    description: 'Dịch vụ chăm sóc sức khỏe và khám chữa bệnh chuyên nghiệp'
  }
];

const servicesContainer = document.getElementById('services');
servicesContainer.innerHTML = services.map(service => `
  <div class="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition">
    <div class="text-rose-500 mb-4">${service.icon}</div>
    <h3 class="text-xl font-semibold text-gray-900 mb-2">${service.title}</h3>
    <p class="text-gray-600">${service.description}</p>
  </div>
`).join('');