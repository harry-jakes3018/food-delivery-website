import Layout from "../components/Layout";
import OrderModal from "../components/OrderModal";

function Success() {
    return (
        <Layout>
            <OrderModal opened={true} paymentMethod={1} />
        </Layout>
    );
}

export default Success;
