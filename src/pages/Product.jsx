import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { IoStarSharp } from "react-icons/io5";
import 'swiper/css';
import 'swiper/css/navigation';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const fetchProductData = () => {
    const foundProduct = products.find(item => item._id === productId);
    if (foundProduct) {
      setProductData({
        ...foundProduct,
        reviews: foundProduct.reviews || [],
        image: foundProduct.image || [],
        selectedColor: foundProduct.selectedColor || [],
      });
      setImage(foundProduct.image?.[0] || '');
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId, products]);

  if (!productData) return <div className='opacity-0'></div>;

  return (
    <div className='pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='ml-2 sm:ml-10 flex gap-6 sm:gap-18 flex-col sm:flex-row max-w-6xl mx-auto'>

        {/* ------------------ Product Images ------------------ */}
        <div className='flex flex-col-reverse sm:flex-row gap-4 w-full sm:w-2/5'>
          {/* Thumbnails */}
          <div className='flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:w-[80px] w-full'>
            {productData.image.map((item, index) => (
              <div
                key={index}
                className={`w-20 h-20 sm:w-20 sm:h-20 border cursor-pointer ${image === item ? 'border-blue-500' : 'border-gray-300'} overflow-hidden rounded`}
                onClick={() => setImage(item)}
              >
                <img
                  src={item}
                  alt={`thumbnail-${index}`}
                  className='w-full h-full object-cover'
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className='flex-1 w-full sm:h-[500px] h-[400px] overflow-hidden rounded'>
            <img
              src={image}
              alt='product-main'
              className='w-full h-full object-contain hover:scale-105 transition-transform duration-300'
            />
          </div>
        </div>

        {/* ------------------ Product Info ------------------ */}
        <div className='flex-1 flex flex-col'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

          <div className='flex items-center gap-1 mt-2'>
            {Array.from({ length: 3 }).map((_, idx) => (
              <IoStarSharp key={idx} className='text-yellow-500 text-3xl w-3.5'/>
            ))}
            <IoStarSharp className='text-yellow-200 text-3xl w-3.5'/>
            <span className='ml-2'>
              {productData.ratings || 0}
              <span className='text-gray-500'> ({productData.reviews?.length || 0} reviews)</span>
            </span>
          </div>

          <div className='flex gap-2 items-center mt-5'>
            <span className='text-gray-600 font-medium'>{productData.discount || ''}</span>
            <span className='ml-2 line-through text-gray-400'>{currency}{productData.originalPrice || 0}</span>
            <span className='ml-1 font-semibold'>{currency}{productData.price || 0}</span>
          </div>

          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description || ''}</p>

          {/* Offers */}
          <div className="mt-3 text-sm text-gray-700 space-y-1">
            <p>🎟️ Save extra with coupon</p>
            <p>% Bank Offer</p>
            <p>% Cashback</p>
            <p>○ Partner Offer</p>
          </div>

          {/* Color Options */}
          <div className="mt-4">
            <p className="text-sm font-medium">Color</p>
            <div className="flex gap-2 mt-2">
              {productData.selectedColor.map((color, index) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>

          {/* Delivery */}
          <p className="text-sm mt-4 text-gray-700">
            📍 Check delivery <span className="text-green-600">FREE delivery</span>
          </p>

          {/* Action Buttons */}
          <div className="mt-5 flex gap-3">
            <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded text-sm font-semibold">
              Buy Now
            </button>
            <button
              onClick={() => addToCart(productData._id)}
              className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded text-sm font-semibold"
            >
              Add to Cart
            </button>
          </div>

          {/* Specifications */}
          <div className="mt-6">
            <h2 className="font-semibold">Specifications</h2>
            <div className="grid grid-cols-2 text-sm text-gray-600 mt-2 gap-y-1">
              <p><b>Occasion:</b> Casual</p>
              <p><b>Material:</b> Genuine Leather</p>
              <p><b>Sole Material:</b> EVA</p>
              <p><b>Pattern:</b> Textured</p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="font-semibold">Description</h2>
            <p className="text-sm text-gray-600 mt-1">{productData.description || ''}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  );
};

export default Product;
