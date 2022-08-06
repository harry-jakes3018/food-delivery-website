import css from "../styles/Cart.module.css";
import Layout from "../components/Layout";
import { useStore } from "../store/store";
import Image from "next/image";
import { urlFor } from "../lib/client";
import toast, { Toaster } from "react-hot-toast";

function Cart() {
    const cartData = useStore((state) => state.cart);
    const removePizza = useStore((state) => state.removePizza);

    const handleRemove = (i) => {
        removePizza(i);
        toast.success("Item Removed");
    };

    const total = () => {
        return cartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0);
    };

    return (
        <Layout>
            <div className={css.container}>
                {/* Details */}
                <div className={css.details}>
                    <table className={css.table}>
                        <thead>
                            <th>Pizza</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </thead>
                        <tbody className={css.tbody}>
                            {cartData.pizzas.length > 0 ? (
                                cartData.pizzas.map((pizza, i) => {
                                    const src = urlFor(pizza.image).url();

                                    return (
                                        <tr key={i}>
                                            <td className={css.imageTd}>
                                                <Image
                                                    loader={() => src}
                                                    src={src}
                                                    alt=""
                                                    objectFit="cover"
                                                    width={85}
                                                    height={85}
                                                />
                                            </td>

                                            <td>{pizza.name}</td>

                                            <td>
                                                {pizza.size === 0
                                                    ? "Small"
                                                    : pizza.size === 1
                                                    ? "Medium"
                                                    : "Large"}
                                            </td>

                                            <td>{pizza.price}</td>

                                            <td>{pizza.quantity}</td>

                                            <td>
                                                {pizza.price * pizza.quantity}
                                            </td>

                                            <td
                                                style={{
                                                    color: "var(--themeRed)",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => handleRemove(i)}
                                            >
                                                Remove
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <div style={{ textAlign: "center" }}>
                                    No Items Available
                                </div>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div className={css.cart}>
                    <span>Cart</span>
                    <div className={css.cartDetails}>
                        <div>
                            <span>Items</span>
                            <span>{cartData.pizzas.length}</span>
                        </div>

                        <div>
                            <span>Total</span>
                            <span>$ {total()}</span>
                        </div>
                    </div>

                    <div className={css.buttons}>
                        <button className="btn">Pay on Delivery</button>
                        <button className="btn">Pay Now</button>
                    </div>
                </div>
            </div>

            <Toaster />
        </Layout>
    );
}

export default Cart;
