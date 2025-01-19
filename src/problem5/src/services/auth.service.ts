import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { JWT_SECRET } from '../config/constants';
import { CreateUserDto } from '../types';

export class AuthService {
  async signup(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const user = await User.create({
      email: data.email,
      password: data.password
    });
    
    const { password: _password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async signin(email: string, password: string): Promise<string> {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }

    return jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
  }
} 