import css from "../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/Logo.png";
import { UilShoppingBag, UilReceipt } from "@iconscout/react-unicons";
import { useStore } from "../store/store";
import { useEffect, useState } from "react";

function Header() {
    // State in terminal
    // const state = useStore((state) => state);
    // console.log(state);

    const [order, setOrder] = useState("");

    useEffect(() => {
        setOrder(localStorage.getItem("order"));
    }, []);

    const items = useStore((state) => state.cart.pizzas.length);

    return (
        <div className={css.header}>
            {/* Logo Side */}
            <div className={css.logo}>
                <Image src={Logo} alt="" width={50} height={50} />
                <span>Fudo</span>
            </div>

            {/* Menu Side */}
            <ul className={css.menu}>
                <li>
                    <Link href="../">Home</Link>
                </li>
                <li>Menu</li>
                <li>Contact</li>
            </ul>

            {/* Right Side */}
            <div className={css.rightSide}>
                <Link href="/cart">
                    <div className={css.cart}>
                        <UilShoppingBag size={35} color="#2e2e2e" />
                        <div className={css.badge}>{items}</div>
                    </div>
                </Link>

                {order && (
                    <Link href={`/order/${order}`}>
                        <div className={css.cart}>
                            <UilReceipt size={35} color="#2e2e2e" />
                            {order != "" && <div className={css.badge}>1</div>}
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
