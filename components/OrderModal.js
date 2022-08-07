import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { createOrder } from "../lib/orderHandler";
import { useStore } from "../store/store";
import css from "../styles/OrderModal.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

function OrderModal({ opened, setOpened, paymentMethod }) {
    const theme = useMantineTheme();
    const [formData, setFormData] = useState({});
    const router = useRouter();

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetCart = useStore((state) => state.resetCart);

    const total =
        typeof window !== "undefined" && localStorage.getItem("total");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        const id = await createOrder({ ...formData, total, paymentMethod });
        // console.log(`Order for id = ${id} is placed successfully!`);
        toast.success("Order Placed");
        resetCart();
        {
            typeof window !== "undefined" && localStorage.setItem("order", id);
        }

        router.push(`/order/${id}`);
    };

    return (
        <Modal
            overlayColor={
                theme.colorScheme === "dark"
                    ? theme.colors.dark[9]
                    : theme.colors.gray[2]
            }
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={opened}
            onClose={() => setOpened(null)}
        >
            {/* Modal content */}
            <form className={css.formContainer}>
                <input
                    onChange={handleInput}
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                />
                <input
                    onChange={handleInput}
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone Number"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                />
                <textarea
                    name="address"
                    onChange={handleInput}
                    rows={3}
                    placeholder="Address"
                    required
                ></textarea>

                <span>
                    You will pay <span>$ {total}</span> on delivery.
                </span>

                <button type="submit" className="btn" onClick={handleSubmit}>
                    Place Order
                </button>
            </form>

            <Toaster />
        </Modal>
    );
}

export default OrderModal;
