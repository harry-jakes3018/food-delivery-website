import Head from "next/head";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Services from "../components/Services";
import { client } from "../lib/client";
import css from "../styles/Home.module.css";

export default function Home({ pizzas }) {
    console.log(pizzas);

    return (
        <Layout>
            <div className={css.container}>
                <Head>
                    <title>FUDO</title>
                    <meta
                        name="description"
                        content="Generated by create next app"
                    />
                    <link rel="icon" href="/Logo.png" />
                </Head>

                {/* Body */}
                <main>
                    <Hero />
                    <Services />
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
