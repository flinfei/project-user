import React from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import MainLayout from '@/components/Layout';
import '../styles/globals.css';

// 不需要布局的页面路径
const NO_LAYOUT_PAGES = ['/login'];

// 创建Chakra UI系统配置
const system = createSystem(defaultConfig);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 检查当前页面是否需要布局
  const needsLayout = !NO_LAYOUT_PAGES.includes(router.pathname);

  return (
    <ChakraProvider value={system}>
      {needsLayout ? (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </ChakraProvider>
  );
}

export default MyApp;
