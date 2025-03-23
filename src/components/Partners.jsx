import React from 'react';

const Partners = () => {
  const partners = [
    { name: 'Lotte Mart', image: '/lotemart.png' },
    { name: 'Nekko', image: '/nekkomart.png' },
    { name: 'Pedigree', image: '/pedigreeMart.png' },
    { name: 'Royal Canin', image: '/royalCaninMart.png' },
    { name: 'Smart Heart', image: '/smartHeartMart.png' },
    { name: 'Whiskas', image: '/whiskasMart.png' },
    { name: 'Farmina', image: '/farminaMart.png' }
  ];

  return (
    <div className="border-t border-gray-200">
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Đối tác của chúng tôi
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div key={index} className="w-40 h-28 flex items-center justify-center p-4">
              <img
                src={partner.image}
                alt={partner.name}
                className="max-w-full max-h-full object-contain transition-all duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners; 