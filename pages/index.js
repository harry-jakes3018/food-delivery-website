import Head from "next/head";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import Services from "../components/Services";
import { client } from "../lib/client";
import css from "../styles/Home.module.css";

export default function Home({ pizzas }) {
    // console.log(pizzas);

    return (
        <Layout>
            <div className={css.container}>
                {/* Body */}
                <main>
                    <Hero />
                    <Services />
                    <Menu pizzas={pizzas} />
                </main>
            </div>
        </Layout>
    );
}

export const getServerSideProps = async () => {
    const query = '*[_type == "pizza"]';
    const pizzas = await client.fetch(query);

    return {
        props: { pizzas },
    };
};
