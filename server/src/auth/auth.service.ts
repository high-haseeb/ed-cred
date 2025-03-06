import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async signup(username: string, email: string, password: string) {
    const existingUser = await this.userRepository.findOne({ where: [{ username }, { email }] });

    if (existingUser) {
      if (existingUser.username === username) throw new ConflictException('Username already taken');
      if (existingUser.email === email) throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ username, email, password: hashedPassword });
    await this.userRepository.save(newUser);

    return { message: 'Signup successful' };
  }

  async login(identifier: string, password: string) {
    // Allow login with either username or email
    const user = await this.userRepository.findOne({
      where: [{ email: identifier }, { username: identifier }],
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ id: user.id, username: user.username, email: user.email });
    return { accessToken: token };
  }

  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId }, select: ['id', 'username', 'email'] });
    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }
}
