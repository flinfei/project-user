'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Button from './Button';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLocale = i18n.language === 'zh-CN' ? 'en' : 'zh-CN';
    // 设置cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    // 切换i18next语言
    i18n.changeLanguage(newLocale);
    // 刷新页面以应用新语言
    router.refresh();
  };

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} className="fixed top-4 right-4">
      {i18n.language === 'zh-CN' ? 'English' : '中文'}
    </Button>
  );
};

export default LanguageSwitcher;
