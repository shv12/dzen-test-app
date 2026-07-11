import { useState } from "react";
import { Product } from "@/app/types/definitions";
import { getLongDate, getShortDate } from "@/app/lib/dates";
import { BiTrash } from "react-icons/bi";
import { useAppDispatch, useAppSelector, useTranslations } from "@/app/lib/hooks";
import { localeSelector } from "@/app/lib/redux/selectors";
import { deleteProduct } from "@/app/lib/utils";

export default function ProductRow({ product }: { product: Product }) {
  const { locale, dict } = useAppSelector(localeSelector);
  const t = useTranslations(dict);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id, productName, productTypeName, guaranteeFrom, guaranteeUntil, priceUAH, priceUSD, orderName, orderID } = product;

  const guaranteeFromDate = new Date(guaranteeFrom);
  const guaranteeUntilDate = new Date(guaranteeUntil);

  const handleDelete = async (
    productID: number,
    priceUAH: number,
    priceUSD: number,
    orderID: number
  ) => {
    await deleteProduct(
      productID,
      orderID,
      priceUAH,
      priceUSD,
      dispatch,
      setIsLoading
    );
  }

  return <tr>
    <td>{productName}</td>
    <td>{productTypeName}</td>
    <td>
      <div className="small">
        <div className="d-flex"><div className="me-2 text-gray-400">{ t('from')}</div><div>{getLongDate(guaranteeFromDate, locale)} ({ getShortDate(guaranteeFromDate)})</div></div>
        <div className="d-flex"><div className="me-2 text-gray-400">{ t('until')}</div><div>{getLongDate(guaranteeUntilDate, locale)} ({ getShortDate(guaranteeUntilDate)})</div></div>
      </div>
    </td>
    <td>
      <div className="small">
        {priceUSD > 0 && <div>{ priceUSD} USD</div>}
      {priceUAH > 0 && <div>{ priceUAH} UAH</div>}
      </div>
    </td>
    <td>{ orderName}</td>
    <td className="text-center">
      <button type="button" onClick={() => handleDelete(id, priceUAH, priceUSD, orderID)} className="border-0">
        <BiTrash size={24} />
      </button>
    </td>
  </tr>;
}