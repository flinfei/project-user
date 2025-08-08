import { GetServerSideProps } from 'next';

// 这个组件不会被渲染，因为我们在服务器端就会执行重定向
const Home = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // 从请求中获取cookie
  const cookies = context.req.cookies;
  const token = cookies['token'];

  // 根据是否有token决定重定向到哪个页面
  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

export default Home;
