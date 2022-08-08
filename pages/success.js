import Layout from "../components/Layout";
import css from "../styles/Success.module.css";
import OrderModal from "../components/OrderModal";

function Success() {
    return (
        <Layout>
            <OrderModal opened={true} paymentMethod={1} />
        </Layout>
    );
}

export default Success;
