import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {
    return { signedIn: true };
  }
  singup() {
    return { signedIn: true };
  }
}
