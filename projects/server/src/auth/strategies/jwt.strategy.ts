import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: any) {
    try {
      // 获取用户信息
      const user = await this.userService.findOne(payload.sub);
      if (!user || !user.isActive) {
        throw new UnauthorizedException('用户不存在或已被禁用');
      }

      // 确保返回的用户对象包含角色信息
      return {
        ...user,
        // 确保角色信息正确
        roles: payload.roles || user.roles,
      };
    } catch (error) {
      throw new UnauthorizedException('无效的令牌');
    }
  }
}
