"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MdEdit, MdDelete, MdAdd, MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import styles from './sliders.module.css';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
  order: number;
  bgColor?: string;
}

export default function SlidersPage() {
  const router = useRouter();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    buttonText: '',
    buttonLink: '',
    isActive: true,
    bgColor: '#3b82f6',
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // TODO: Replace with actual API call
      const mockSlides: Slide[] = [
        {
          id: 1,
          title: 'SMART WEARABLE',
          subtitle: 'UP TO 50% OFF',
          description: 'Best Deal Online on smart watches',
          image: '/images/slide1.webp',
          buttonText: 'تسوق الآن',
          buttonLink: '/categories/electronics',
          isActive: true,
          order: 1,
          bgColor: '#3b82f6',
        },
        {
          id: 2,
          title: 'Premium Fruits Fresh from Farm',
          subtitle: 'ORGANIC & FRESH',
          description: 'منتجات طازجة من المزرعة مباشرة',
          image: '/images/slide2.webp',
          buttonText: 'اكتشف المزيد',
          buttonLink: '/categories/food',
          isActive: true,
          order: 2,
          bgColor: '#10b981',
        },
        {
          id: 3,
          title: 'Fashion Trends 2024',
          subtitle: 'NEW COLLECTION',
          description: 'أحدث صيحات الموضة',
          image: '/images/slide3.webp',
          buttonText: 'تسوق الآن',
          buttonLink: '/categories/fashion',
          isActive: true,
          order: 3,
          bgColor: '#8b5cf6',
        },
        {
          id: 4,
          title: 'Electronics Mega Sale',
          subtitle: 'UP TO 50% OFF',
          description: 'خصومات هائلة على الإلكترونيات',
          image: '/images/slide4.webp',
          buttonText: 'تسوق الآن',
          buttonLink: '/categories/electronics',
          isActive: false,
          order: 4,
          bgColor: '#ef4444',
        },
        {
          id: 5,
          title: 'Home & Kitchen Essentials',
          subtitle: 'QUALITY PRODUCTS',
          description: 'منتجات عالية الجودة للمنزل',
          image: '/images/slide5.jpg',
          buttonText: 'اكتشف المزيد',
          buttonLink: '/categories/home',
          isActive: true,
          order: 5,
          bgColor: '#f59e0b',
        },
      ];
      
      setSlides(mockSlides.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Error fetching slides:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const activeCount = slides.filter(s => s.isActive).length;
  const inactiveCount = slides.filter(s => !s.isActive).length;

  const handleAdd = () => {
    setEditingSlide(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image: '',
      buttonText: 'تسوق الآن',
      buttonLink: '',
      isActive: true,
      bgColor: '#3b82f6',
    });
    setShowModal(true);
  };

  const handleEdit = (slide: Slide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description || '',
      image: slide.image,
      buttonText: slide.buttonText || '',
      buttonLink: slide.buttonLink || '',
      isActive: slide.isActive,
      bgColor: slide.bgColor || '#3b82f6',
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا السلايد؟')) {
      setSlides(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setSlides(prev => prev.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const handleMoveUp = (id: number) => {
    const index = slides.findIndex(s => s.id === id);
    if (index > 0) {
      const newSlides = [...slides];
      [newSlides[index], newSlides[index - 1]] = [newSlides[index - 1], newSlides[