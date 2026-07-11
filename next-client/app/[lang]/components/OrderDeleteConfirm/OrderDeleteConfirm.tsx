import { useAppSelector, useTranslations } from "@/app/lib/hooks";
import { localeSelector } from "@/app/lib/redux/selectors";

interface ConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  orderName?: string;
}

export default function OrderDeleteConfirm({ isOpen, orderName, onClose, onDelete }: ConfirmProps) {
  const { dict } = useAppSelector(localeSelector);
  const t = useTranslations(dict);

  if (!isOpen) {
    return null;
  }

  return <>
    <div
      className="modal-backdrop fade show z-10"
      onClick={onClose}
    />

    <div
      className="modal fade show d-block z-20"
      tabIndex={-1}
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-md" role="document"
      >
        <div className="modal-content">
          <div
            className="modal-header border-0"
          >
            <div className="modal-title fw-bold">{ t('sureDeleteOrder')}</div>
            <button
              type="button"
              className="btn-close app__btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-content border-0 px-6">{orderName}</div>
          <div className="modal-footer border-0 bg-green-400 app__modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>{ t('cancel')}</button>
            <button className="btn btn-primary" onClick={onDelete}>{ t('delete')}</button>
          </div>
        </div>

      </div>
    </div>
  </>;
}