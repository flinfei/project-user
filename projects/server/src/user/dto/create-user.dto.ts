import { IsNotEmpty, IsString, MinLength, IsEmail, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'johndoe' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  username: string;

  @ApiProperty({ description: '密码', example: 'Password123!' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(6, { message: '密码不能少于6个字符' })
  password: string;

  @ApiProperty({ description: '昵称', required: false, example: 'John Doe' })
  @IsOptional()
  @IsString({ message: '昵称必须是字符串' })
  nickname?: string;

  @ApiProperty({
    description: '头像URL',
    required: false,
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString({ message: '头像URL必须是字符串' })
  avatar?: string;

  @ApiProperty({ description: '用户角色', required: false, example: 'user', default: 'user' })
  @IsOptional()
  @IsString({ message: '角色必须是字符串' })
  roles?: string;
}
