'use client';

import styles from './ShippingAddress.module.css';

export interface ShippingAddressData {
  fullName: string;
  phone: string;
  city: string;
  area: string;
  street: string;
  building: string;
  floor?: string;
  apartment?: string;
}

interface ShippingAddressProps {
  address: ShippingAddressData;
}

export default function ShippingAddress({ address }: ShippingAddressProps) {
  return (
    <div className={styles.address}>
      <p><strong>{address.fullName}</strong></p>
      <p>{address.phone}</p>
      <p>{address.city}، {address.area}</p>
      <p>
        {address.street}، مبنى {address.building}
        {address.floor && `، الدور ${address.floor}`}
        {address.apartment && `، شقة ${address.apartment}`}
      </p>
    </div>
  );
}
