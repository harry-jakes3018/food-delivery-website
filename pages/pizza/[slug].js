import Image from "next/image";
import Layout from "../../components/Layout";
import { client, urlFor } from "../../lib/client";
import css from "../../styles/Pizza.module.css";
import LeftArrow from "../../assets/arrowLeft.png";
import RightArrow from "../../assets/arrowRight.png";
import { useState } from "react";
import { useStore } from "../../store/store";
import toast, { Toaster } from "react-hot-toast";

function Pizza({ pizza }) {
    const src = urlFor(pizza.image).url();
    const [size, setSize] = useState(1);
    const [quantity, setQuantity] = useState(1);

    const handleQuantity = (type) => {
        type === "increment"
            ? setQuantity((prev) => prev + 1)
            : quantity === 1
            ? null
            : setQuantity((prev) => prev - 1);
    };

    // Add to Cart Function
    const addPizza = useStore((state) => state.addPizza);
    const addToCart = () => {
        addPizza({
            ...pizza,
            price: pizza.price[size],
            quantity: quantity,
            size: size,
        });
        // console.log("Pizza added");
        toast.success("Added to Cart");
    };

    return (
        <Layout>
            <div className={css.container}>
                <div className={css.imageWrapper}>
                    <Image
                        loader={() => src}
                        src={src}
                        alt=""
                        layout="fill"
                        unoptimized
                        objectFit="cover"
                    />
                </div>

                {/* Right Side */}
                <div className={css.right}>
                    <span>{pizza.name}</span>
                    <span>{pizza.details}</span>

                    <span>
                        <span style={{ color: "var(--themeRed)" }}>$</span>{" "}
                        {pizza.price[size]}
                    </span>
                    <div className={css.size}>
                        <span>Size</span>
                        <div className={css.sizeVariants}>
                            <div
                                onClick={() => setSize(0)}
                                className={size === 0 ? css.selected : ""}
                            >
                                Small
                            </div>
                            <div
                                onClick={() => setSize(1)}
                                className={size === 1 ? css.selected : ""}
                            >
                                Medium
                            </div>
                            <div
                                onClick={() => setSize(2)}
                                className={size === 2 ? css.selected : ""}
                            >
                                Large
                            </div>
                        </div>
                    </div>

                    {/* Quantity Counter */}
                    <div className={css.quantity}>
                        <span>Quantity</span>

                        <div className={css.counter}>
                            <Image
                                src={LeftArrow}
                                alt=""
                                height={20}
                                width={20}
                                objectFit="contain"
                                onClick={() => handleQuantity("decrement")}
                            />

                            <span>{quantity}</span>

                            <Image
                                src={RightArrow}
                                alt=""
                                height={20}
                                width={20}
                                objectFit="contain"
                                onClick={() => handleQuantity("increment")}
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <div onClick={addToCart} className={`btn ${css.btn}`}>
                        Add to Cart
                    </div>
                </div>
                <Toaster />
            </div>
        </Layout>
    );
}

export default Pizza;

export async function getStaticPaths() {
    const paths = await client.fetch(
        `*[_type=="pizza" && defined(slug.current)][].slug.current`
    );

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: "blocking",
    };
}

export async function getStaticProps(context) {
    const { slug = "" } = context.params;
    const pizza = await client.fetch(
        `*[_type=="pizza" && slug.current == '${slug}'][0]`
    );

    return {
        props: {
            pizza,
        },
    };
}
