export default () => ({
  port: parseInt(process.env.PORT || '3001', 10),

  // JWT 配置
  jwt: {
    secret: process.env.JWT_SECRET || 'hard!to-guess_secret_for_development_only',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // 数据库配置 - 开发环境默认值
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '12345678', // 默认无密码
    name: process.env.DB_DATABASE || 'nestjs_db',
    synchronize: process.env.DB_SYNCHRONIZE === 'false' ? false : true, // 默认启用同步
    logging: process.env.DB_LOGGING === 'false' ? false : true, // 默认启用日志
  },
});
