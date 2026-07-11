const i18ns = {
    en: () => import("./i18n/en.json").then((module) => module.default),
    ru: () => import("./i18n/ru.json").then((module) => module.default),
};

export const getI18n = async (locale: 'en' | 'ru') => i18ns[locale] ? i18ns[locale]() : i18ns.en();