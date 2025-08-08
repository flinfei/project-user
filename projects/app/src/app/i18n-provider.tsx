'use client';

import { ReactNode, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入翻译资源
import enCommon from '../../public/locales/en/common.json';
import zhCNCommon from '../../public/locales/zh-CN/common.json';

// 防止在服务器端多次初始化
const isInitialized = i18n.isInitialized;

if (!isInitialized) {
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources: {
        en: { common: enCommon },
        'zh-CN': { common: zhCNCommon },
      },
      lng: 'zh-CN',
      fallbackLng: 'zh-CN',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['cookie', 'navigator'],
        lookupCookie: 'NEXT_LOCALE',
      },
      react: {
        useSuspense: false,
      },
    });
}

export default function I18nProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return <>{children}</>;
}
