import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import styles from "./header.module.css";
import { FaTractor } from "react-icons/fa6";
import { IoBasketballOutline } from "react-icons/io5";


const Header = () => {
  return (
    <>
     {/* header top */}
    <header className="w-full bg-white shadow-md">
            <div className={`${styles.headertop} flex justify-between items-center`}>
                {/* left section */}
                <div className="flex-shrink-0">
                    <Link href="/">
                        <span className={styles.welcometext}>Welcome to Worldwide Megamart!</span>
                    </Link>
                </div>

                {/* right section */}
                <div className={styles.deliverybar}>
                    <nav className={`${styles.navlinks} flex justify-between items-center`}>
                        <CiLocationOn className={styles.headericon}/>
                        <Link href="/" className="text-gray-600 hover:text-gray-800">
                            Deliver to 423651
                            <span className={styles.sapratore}>|</span>
                        </Link>
                        <FaTractor className={styles.headericon}/>
                        <Link href="/about" className="text-gray-600 hover:text-gray-800">
                            track your order
                           <span className={styles.sapratore}>|</span>
                        </Link>
                            <IoBasketballOutline className={styles.headericon}/>
                        <Link href="/contact" className="text-gray-600 hover:text-gray-800">
                            All Offers
                        </Link>
                    </nav>
                </div>
            </div>
    </header>

</>
  );
};

export default Header;