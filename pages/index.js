import Head from "next/head";
import Layout from "../components/Layout";

export default function Home() {
    return (
        <Layout>
            <div>
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
                    <h1>Hello</h1>
                </main>
            </div>
        </Layout>
    );
}
