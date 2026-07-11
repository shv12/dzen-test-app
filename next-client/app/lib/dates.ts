import { format } from "date-fns";
import { ru, enUS } from "date-fns/locale";

const getOptions = (locale?: string) => {
  if (locale === 'ru') {
    return { locale: ru };
  } else if (locale === 'en') {
    return { locale: enUS };
  } else {
    return { locale: enUS };
  }
}

export const getLongDate = (date: Date, locale: string) => {
  const options = getOptions(locale);
  const strMonth = format(date, 'MMM', options);
  const strDay = format(date, "dd", options);
  const strYear = format(date, "yyyy", options);
  const formattedMonth = strMonth.charAt(0).toUpperCase() + strMonth.slice(1).replace(/\./, "");
  return `${strDay} / ${formattedMonth} / ${strYear}`;
}

export const getShortDate = (date: Date) => {
  return format(date, "dd / MM", getOptions());
}