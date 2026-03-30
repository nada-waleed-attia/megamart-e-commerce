"use client";

import Head from 'next/head';

interface StructuredDataProps {
  type: 'WebSite' | 'Organization' | 'Product' | 'Article';
  data: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const getStructuredData = () => {
    switch (type) {
      case 'WebSite':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "متجر إلكتروني الأفضل",
          "alternateName": "أفضل متجر إلكتروني في الشرق الأوسط",
          "url": "https://my-company-site.com",
          "description": "المتجر الإلكتروني الأفضل في الشرق الأوسط. تسوق أونلاين هواتف ذكية، لابتوبات، ساعات ذكية، ملابس رياضية من أفضل الماركات العالمية",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://my-company-site.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://www.facebook.com/BestECommerceSA",
            "https://www.twitter.com/BestECommerceSA",
            "https://www.instagram.com/BestECommerceSA",
            "https://www.linkedin.com/company/best-ecommerce-sa"
          ],
          "publisher": {
            "@type": "Organization",
            "name": "متجر إلكتروني الأفضل",
            "url": "https://my-company-site.com"
          }
        };

      case 'Organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "متجر إلكتروني الأفضل",
          "alternateName": "أفضل متجر إلكتروني في الشرق الأوسط",
          "url": "https://my-company-site.com",
          "logo": "https://my-company-site.com/logo.png",
          "description": "المتجر الإلكتروني الأفضل في الشرق الأوسط. نقدم أفضل المنتجات الإلكترونية والملابس بأسعار ممتازة مع شحن سريع وضمان الجودة",
          "foundingDate": "2020",
          "areaServed": {
            "@type": "Country",
            "name": "Saudi Arabia"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "شارع الملك فهد، حي النخيل",
            "addressLocality": "الرياض",
            "addressRegion": "الرياض",
            "postalCode": "12345",
            "addressCountry": "SA"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+966-50-123-4567",
            "contactType": "customer service",
            "availableLanguage": "Arabic",
            "email": "info@best-ecommerce.sa"
          },
          "sameAs": [
            "https://www.facebook.com/BestECommerceSA",
            "https://www.twitter.com/BestECommerceSA",
            "https://www.instagram.com/BestECommerceSA",
            "https://www.linkedin.com/company/best-ecommerce-sa",
            "https://www.youtube.com/@BestECommerceSA"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "منتجات متجر إلكتروني الأفضل",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "هواتف ذكية"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "لابتوبات"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "ساعات ذكية"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "ملابس رياضية"
                }
              }
            ]
          }
        };

      case 'Product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "image": data.image,
          "description": data.description,
          "brand": {
            "@type": "Brand",
            "name": data.brand
          },
          "offers": {
            "@type": "Offer",
            "price": data.price,
            "priceCurrency": "SAR",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "متجر إلكتروني"
            }
          },
          "aggregateRating": data.rating ? {
            "@type": "AggregateRating",
            "ratingValue": data.rating,
            "reviewCount": data.reviewCount || 100
          } : undefined
        };

      default:
        return {};
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData(), null, 2)
      }}
    />
  );
};

export default StructuredData;
