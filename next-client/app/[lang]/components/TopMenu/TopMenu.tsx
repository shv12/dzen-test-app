import DateTimeBlock from "../DateTimeBlock/DateTimeBlock";
import SessionsCount from "../SessionsCount/SessionsCount";
import LocaleSelect from "../LocaleSelect/LocaleSelect";

export default function TopMenu() {
    return <div className="d-flex justify-content-end px-5 py-2 bg-white text-dark shadow position-relative z-3">
        <DateTimeBlock />
        <SessionsCount />
        <LocaleSelect />
    </div>;
}