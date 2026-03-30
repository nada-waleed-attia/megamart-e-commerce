'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MdDelete, MdShoppingCart, MdAddShoppingCart } from 'react-icons/md';
import { useCart } from '../../components/cart/cart-context';
import { getWishlist } from '../data';
import styles from './wishlist.module.css';

const filterOptions = [
  { value: 'all', label: 'الكل' },
  { value: 'inStock', label: 'متوفر' },
  { value: 'outOfStock', label: 'غير متوفر' },
];

export default function WishlistPage() {
  const initialWishlist = getWishlist();
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [activeFilter, setActiveFilter] = useState('all');
  const { addToCart } = useCart();

  const filteredWishlist = wishlist.filter((item) => {
    if (activeFilter === 'inStock') return item.inStock;
    if (activeFilter === 'outOfStock') return !item.inStock;
    return true;
  });

  const handleRemove = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const handleAddToCart = (item: typeof initialWishlist[0]) => {
    if (!item.inStock) return;
    
    addToCart({
      id: Number(item.productId),
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
    }, 1);
  };

  const handleAddAllToCart = () => {
    const inStockItems = wishlist.filter(item => item.inStock);
    inStockItems.forEach(item => {
      addToCart({
        id: Number(item.productId),
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
      }, 1);
    });
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>المفضلة</h1>
          <h2>منتجاتك المفضلة</h2>
          <p>احتفظ بمنتجاتك المفضلة وأضفها للسلة في أي وقت</p>
        </div>
      </div>

      <div className={styles.header}>
        <div>
          <p>{wishlist.length} منتج</p>
        </div>
        {wishlist.some(item => item.inStock) && (
          <button className={styles.addAllBtn} onClick={handleAddAllToCart}>
            <MdAddShoppingCart size={20} />
            <span>إضافة الكل للسلة</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {filterOptions.map((option) => (
          <button
            key={option.value}
            className={`${styles.filterBtn} ${
              activeFilter === option.value ? styles.filterBtnActive : ''
            }`}
            onClick={() => setActiveFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Wishlist Grid */}
      {filteredWishlist.length > 0 ? (
        <div className={styles.wishlistGrid}>
          {filteredWishlist.map((item) => (
            <div key={item.id} className={styles.productCard}>
              {item.discount > 0 && (
                <div className={styles.discountBadge}>-{item.discount}%</div>
              )}
              {!item.inStock && (
                <div className={styles.outOfStockBadge}>غير متوفر</div>
              )}

              <button 
                className={styles.removeBtn}
                onClick={() => handleRemove(item.id)}
              >
                <MdDelete size={20} />
              </button>

              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
              </div>

              <div className={styles.productInfo}>
                <h3>{item.name}</h3>
                
                <div className={styles.priceSection}>
                  <span className={styles.price}>{item.price} جنيه</span>
                  {item.discount > 0 && (
                    <span className={styles.originalPrice}>{item.originalPrice} جنيه</span>
                  )}
                </div>

                <button 
                  className={styles.addToCartBtn}
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.inStock}
                >
                  <MdShoppingCart size={18} />
                  <span>{item.inStock ? 'إضافة للسلة' : 'غير متوفر'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>❤️</div>
          <h3>لا توجد منتجات في المفضلة</h3>
          <p>ابدأ بإضافة منتجاتك المفضلة</p>
          <a href="/" className={styles.shopBtn}>
            تصفح المنتجات
          </a>
        </div>
      )}
    </div>
  );
}
