'use client';

import { useState, useEffect, useRef } from "react";
import { FiClock } from "react-icons/fi";
import { useAppSelector } from "@/app/lib/hooks";
import { localeSelector } from "@/app/lib/redux/selectors";

const intlLocaleDict = {
    'en': 'en-US',
    'ru': 'ru-RU'
}

export default function DateTimeBlock() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const { locale } = useAppSelector(localeSelector);
    const intlLocale = intlLocaleDict[locale];

    const weekday = new Intl.DateTimeFormat(intlLocale, {
        weekday: 'long',
    }).format(currentDateTime);
    const formattedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

    const date = new Intl.DateTimeFormat(intlLocale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(currentDateTime);

    const time = new Intl.DateTimeFormat(intlLocale, {
        hour: '2-digit',
        minute: '2-digit',
    }).format(currentDateTime);

    const dateTimeRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
    useEffect(() => {
        dateTimeRef.current = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => {
            clearInterval(dateTimeRef.current);
        }
    }, []);

    return <div>
      {formattedWeekday}
      <div className="d-flex align-middle">
        {date}<FiClock className="d-inline mx-2 text-green-700" size={20} />{time}
      </div>
    </div>;
}