import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './components/auth/auth-context';
import { ToastProvider } from './components/toast/toast-container';
import { CartProvider } from './components/cart/cart-context';
import ErrorBoundary from './components/ui/error-boundary';

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "متجر إلكتروني الأفضل | تسوق أونلاين بأسعار ممتازة",
    template: "%s | متجر إلكتروني الأفضل"
  },
  description: "متجر إلكتروني الأفضل في الشرق الأوسط. تسوق أونلاين هواتف ذكية، لابتوبات، ساعات ذكية، ملابس رياضية من نايكي، أبل، سامسونج، أديداس. شحن سريع وضمان الجودة.",
  keywords: [
    "متجر إلكتروني الأفضل",
    "أفضل متجر إلكتروني",
    "تسوق أونلاين",
    "متجر إلكتروني سعودي",
    "تسوق إلكتروني",
    "منتجات إلكترونية",
    "ملابس رياضية",
    "هواتف ذكية",
    "لابتوبات",
    "ساعات ذكية",
    "نايكي السعودية",
    "أبل السعودية",
    "سامسونج السعودية",
    "أديداس السعودية",
    "شحن سريع",
    "ضمان الجودة",
    "أسعار ممتازة",
    "تخفيضات",
    "عروض خاصة",
    "متجر معتمد"
  ],
  authors: [{ name: "متجر إلكتروني الأفضل", url: "https://my-company-site.com" }],
  creator: "متجر إلكتروني الأفضل",
  publisher: "متجر إلكتروني الأفضل",
  applicationName: "متجر إلكتروني الأفضل",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://my-company-site.com"),
  alternates: {
    canonical: "/",
    languages: {
      "ar-SA": "/ar",
      "en-US": "/en"
    }
  },
  openGraph: {
    title: "متجر إلكتروني الأفضل | تسوق أونلاين بأسعار ممتازة",
    siteName: "متجر إلكتروني الأفضل",
    description: "المتجر الإلكتروني الأفضل في الشرق الأوسط. تسوق أونلاين هواتف ذكية، لابتوبات، ساعات ذكية، ملابس رياضية من أفضل الماركات العالمية",
    type: "website",
    locale: "ar_SA",
    url: "https://my-company-site.com",
    images: [
      {
        url: "/images/hero-banner.webp",
        width: 1200,
        height: 630,
        alt: "متجر إلكتروني الأفضل - تسوق أونلاين"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "متجر إلكتروني الأفضل | تسوق أونلاين بأسعار ممتازة",
    description: "المتجر الإلكتروني الأفضل في الشرق الأوسط. تسوق أونلاين هواتف ذكية، لابتوبات، ساعات ذكية، ملابس رياضية",
    site: "@BestECommerceSA",
    creator: "@BestECommerceSA",
    images: ["/images/hero-banner.webp"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${cairo.variable} antialiased`}
      >
        <ErrorBoundary>
          <AuthProvider>
            <CartProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </CartProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
