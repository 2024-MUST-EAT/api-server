import { AuthRepository } from 'src/domains/auth/auth.repository';
import { AuthService } from '../domains/auth/auth.service';
import { User } from 'src/domains/auth/auth';

describe('AuthService', () => {
  let authRepository: AuthRepository;
  let authService: AuthService;

  const userData = {
    email: 'test@test.com',
    password: 'password',
  };
  beforeEach(() => {
    authRepository = new AuthRepository();
    authService = new AuthService(authRepository);
  });

  describe('doSignup', () => {
    it('should return user if user is not exist', async () => {
      const user: User = await authService.doSignup(userData);

      expect(user.email).toBe(userData.email);
    });

    it('should throw error if user is already exist', async () => {
      expect(async () => {
        await authService.doSignup(userData);
      }).rejects.toThrow();
    });
  });
});
