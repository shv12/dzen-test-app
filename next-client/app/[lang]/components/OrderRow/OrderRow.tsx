import { Order, OrderRowMode } from "@/app/types/definitions";
import { BiListUl, BiTrash, BiSolidChevronRight } from "react-icons/bi";
import { getLongDate, getShortDate } from "@/app/lib/dates";
import { useAppSelector } from "@/app/lib/hooks";
import { localeSelector } from "@/app/lib/redux/selectors";

interface OrderRowProps {
  order: Order;
  mode: OrderRowMode;
  onDelete: () => void;
  onOrderClick: (e: React.MouseEvent<HTMLTableRowElement>, order: Order) => void;
  isCurrent: boolean;
}

export default function OrderRow({order, mode, onDelete, onOrderClick, isCurrent}: OrderRowProps) {
  const createdAt = new Date(order.createdAt);
  const { locale } = useAppSelector(localeSelector);

  return <tr key={order.id} className="cursor-pointer" onClick={(e) => {
      onOrderClick(e, order)
  }}>
  {mode === "long" &&<td>{ order.orderName}</td>}
  <td>
    <div className="d-flex align-items-center">
      <BiListUl size={24} className="mx-2 border rounded-circle" />
      <div>
        <div className="text-lg fw-bold">
          {order.productsCount}
        </div>
        product(s)
      </div>
    </div>
  </td>
  <td className="text-center">
    <div className="small text-gray-400 text-nowrap">
    {getShortDate(createdAt)}
    </div>
    <div className="text-nowrap">
      {getLongDate(createdAt, locale)}
    </div>
  </td>
    {mode === "long" && <td className="text-nowrap">{order.amountUSD} USD<br />{order.amountUAH} UAH</td>}
    {mode === "long" && <td><button
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
    ><BiTrash size={24} /></button></td>
    }
    {mode === "short" && <td className={`text-white px-2 ${isCurrent ? "orders-table__active-cell" : ""}`}>{isCurrent &&
        <BiSolidChevronRight size={ 20} />
    }</td>}
  </tr>

}