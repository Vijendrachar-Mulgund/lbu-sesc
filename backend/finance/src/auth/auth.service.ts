import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signUp() {
    return { message: 'SignUp Service' };
  }

  login() {
    return { message: 'Login Service' };
  }

  logout() {
    return { message: 'Logout Service' };
  }
}
