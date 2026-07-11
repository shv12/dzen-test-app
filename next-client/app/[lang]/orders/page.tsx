import AppPage from "../components/AppPage/AppPage";
import OrdersTitle from "../components/OrdersTitle/OrdersTitle";
import { OrdersList } from "../components/OrdersList";

export default function OrdersPage() {
    return <AppPage
        title={<OrdersTitle />}
    >
        <OrdersList />
    </AppPage>;
}