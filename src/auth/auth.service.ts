import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ message: string }> {
    const { name, email, password } = signupDto;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }
    const user = this.userRepository.create({
      name,
      email,
      password,
    });
    await this.userRepository.save(user);

    return { message: 'User registered successfully' };
  }

  async login(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
