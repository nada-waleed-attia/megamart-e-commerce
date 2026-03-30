'use client';

import { MdEdit, MdDelete, MdHome, MdWork, MdLocationOn, MdCheck } from 'react-icons/md';
import styles from './AddressCard.module.css';

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  fullName: string;
  phone: string;
  city: string;
  area: string;
  street: string;
  building: string;
  floor?: string;
  apartment?: string;
  landmark?: string;
  isDefault: boolean;
}

interface AddressCardProps {
  address: Address;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
}

const addressTypes = {
  home: { icon: MdHome, label: 'منزل', color: '#0891b2' },
  work: { icon: MdWork, label: 'عمل', color: '#f59e0b' },
  other: { icon: MdLocationOn, label: 'آخر', color: '#64748b' },
};

export default function AddressCard({ address, onEdit, onDelete, onSetDefault }: AddressCardProps) {
  const typeInfo = addressTypes[address.type];
  const Icon = typeInfo.icon;

  return (
    <div className={styles.addressCard}>
      {address.isDefault && (
        <div className={styles.defaultBadge}>
          <MdCheck size={16} />
          <span>افتراضي</span>
        </div>
      )}

      <div className={styles.addressHeader}>
        <div 
          className={styles.typeIcon}
          style={{ backgroundColor: `${typeInfo.color}15`, color: typeInfo.color }}
        >
          <Icon size={24} />
        </div>
        <div>
          <h3>{typeInfo.label}</h3>
          <p>{address.fullName}</p>
        </div>
      </div>

      <div className={styles.addressBody}>
        <p className={styles.phone}>{address.phone}</p>
        <p className={styles.addressText}>
          {address.city}، {address.area}<br />
          {address.street}، مبنى {address.building}<br />
          الدور {address.floor}، شقة {address.apartment}
          {address.landmark && <><br />{address.landmark}</>}
        </p>
      </div>

      <div className={styles.addressActions}>
        {!address.isDefault && onSetDefault && (
          <button 
            className={styles.defaultBtn}
            onClick={() => onSetDefault(address.id)}
          >
            تعيين كافتراضي
          </button>
        )}
        {onEdit && (
          <button className={styles.editBtn} onClick={() => onEdit(address.id)}>
            <MdEdit size={18} />
            <span>تعديل</span>
          </button>
        )}
        {onDelete && (
          <button 
            className={styles.deleteBtn}
            onClick={() => onDelete(address.id)}
          >
            <MdDelete size={18} />
            <span>حذف</span>
          </button>
        )}
      </div>
    </div>
  );
}
