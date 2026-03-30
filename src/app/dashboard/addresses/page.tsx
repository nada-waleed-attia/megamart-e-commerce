'use client';

import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import AddressCard, { Address } from '../components/AddressCard';
import EmptyState from '../components/EmptyState';
import AddressModal from '../components/AddressModal';
import { getAddresses } from '../data';
import styles from './addresses.module.css';

export default function AddressesPage() {
  const initialAddresses = getAddresses();
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleEdit = (id: string) => {
    const address = addresses.find(addr => addr.id === id);
    if (address) {
      setEditingAddress(address);
      setShowModal(true);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا العنوان؟')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  const handleSave = (addressData: Omit<Address, 'id'>) => {
    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id 
          ? { ...addressData, id: addr.id }
          : addressData.isDefault 
            ? { ...addr, isDefault: false }
            : addr
      ));
    } else {
      // Add new address
      const newAddress: Address = {
        ...addressData,
        id: Date.now().toString(),
      };
      
      setAddresses(prev => 
        addressData.isDefault
          ? [...prev.map(addr => ({ ...addr, isDefault: false })), newAddress]
          : [...prev, newAddress]
      );
    }
    
    setEditingAddress(null);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAddress(null);
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>عناوين التوصيل</h1>
          <h2>إدارة عناوينك بسهولة</h2>
          <p>أضف وعدل عناوين التوصيل الخاصة بك لتسهيل عملية الشراء</p>
        </div>
      </div>

      <div className={styles.header}>
        <h1>عناوين التوصيل</h1>
        <button className={styles.addBtn} onClick={handleAddNew}>
          <MdAdd size={20} />
          <span>إضافة عنوان جديد</span>
        </button>
      </div>

      {addresses.length > 0 ? (
        <div className={styles.addressesGrid}>
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="📍"
          title="لا توجد عناوين محفوظة"
          description="أضف عنوان توصيل لتسهيل عملية الشراء"
          actionLabel="إضافة عنوان جديد"
          onAction={handleAddNew}
        />
      )}

      <AddressModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSave}
        address={editingAddress}
      />
    </div>
  );
}
