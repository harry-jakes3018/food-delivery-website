import css from "../styles/Header.module.css";
import Image from "next/image";
import Logo from "../assets/Logo.png";
import { UilShoppingBag } from "@iconscout/react-unicons";
import { useStore } from "../store/store";

function Header() {
    // State in terminal
    const state = useStore((state) => state);
    console.log(state);

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
                <li>Home</li>
                <li>Menu</li>
                <li>Contact</li>
            </ul>

            {/* Right Side */}
            <div className={css.rightSide}>
                <div className={css.cart}>
                    <UilShoppingBag size={35} color="#2e2e2e" />
                    <div className={css.badge}>{items}</div>
                </div>
            </div>
        </div>
    );
}

export default Header;
