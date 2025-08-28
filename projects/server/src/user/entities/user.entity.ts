import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '用户ID' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ description: '用户名' })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true }) // 在响应中排除密码
  password: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '昵称' })
  nickname: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '头像' })
  avatar: string;

  @Column({ default: true })
  @ApiProperty({ description: '是否激活' })
  isActive: boolean;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty({ description: '角色', example: ['user'] })
  roles: string;

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;

  @BeforeInsert()
  setDefaultRoles() {
    if (!this.roles) {
      this.roles = 'user';
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // 如果密码已经被修改，则重新加密
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
