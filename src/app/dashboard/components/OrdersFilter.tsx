'use client';

import { MdSearch } from 'react-icons/md';
import styles from './OrdersFilter.module.css';

interface OrdersFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filterOptions = [
  { value: 'all', label: 'الكل' },
  { value: 'pending', label: 'قيد الانتظار' },
  { value: 'processing', label: 'قيد التجهيز' },
  { value: 'shipped', label: 'تم الشحن' },
  { value: 'delivered', label: 'تم التوصيل' },
  { value: 'cancelled', label: 'ملغي' },
];

export default function OrdersFilter({ 
  searchQuery, 
  onSearchChange, 
  activeFilter, 
  onFilterChange 
}: OrdersFilterProps) {
  return (
    <div className={styles.filters}>
      <div className={styles.searchBox}>
        <MdSearch className={styles.searchIcon} size={20} />
        <input
          type="text"
          placeholder="ابحث برقم الطلب..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className={styles.filterTabs}>
        {filterOptions.map((option) => (
          <button
            key={option.value}
            className={`${styles.filterTab} ${
              activeFilter === option.value ? styles.filterTabActive : ''
            }`}
            onClick={() => onFilterChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
