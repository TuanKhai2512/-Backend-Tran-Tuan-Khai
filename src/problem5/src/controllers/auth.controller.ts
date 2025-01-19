import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
  async signup(req: Request, res: Response): Promise<Response> {
    try {
      const user = await authService.signup(req.body);
      return res.status(201).json(user);
    } catch (error) {
      console.error('Signup controller error:', error);
      if (error.message === 'Email already exists') {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ 
        message: 'Error creating user',
        error: error.message 
      });
    }
  }

  async signin(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const token = await authService.signin(email, password);
      return res.json({ token });
    } catch (error) {
      console.error('Signin controller error:', error);
      return res.status(401).json({ 
        message: 'Invalid credentials',
        error: error.message 
      });
    }
  }
} 