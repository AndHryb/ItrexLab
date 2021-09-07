import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import decodeToken from '../../helpers/decode-token.js';

export default class UserService {
  constructor(userRepository, patientRepository) {
    this.userRepository = userRepository;
    this.patientRepository = patientRepository;
  }

  async registration(data) {
    try {
      const candidate = await this.userRepository.checkEmail(data.email);
      if (candidate) {
        return false;
      }
      const salt = bcrypt.genSaltSync(10);
      const { password } = data;
      const user = await this.userRepository.add(data.email, bcrypt.hashSync(password, salt));
      const patient = await this.patientRepository.add(data.name, data.gender, new Date(data.birthday), user.id);
      if (!patient) {
        return false;
      }
      return this.login(data);
    } catch (err) {
      console.log(`User service registration error :${err.name} : ${err.message}`);
    }
  }

  async login(data) {
    try {
      const candidate = await this.userRepository.checkEmail(data.email);
      if (candidate) {
        const resultPassword = bcrypt.compareSync(data.password, candidate.password);
        if (resultPassword) {
          const token = jwt.sign({
            email: candidate.email,
            userId: candidate.id,
          }, process.env.JWT_KEY, { expiresIn: 3600 });

          return token;
        }
        return 'password!';
      }
      return 'email!';
    } catch (err) {
      console.log(`User service login error :${err.name} : ${err.message}`);
    }
  }

  async getByToken(token) {
    try {
      const decoded = decodeToken(token);
      const { userId } = decoded;
      const result = await this.patientRepository.getByUserId(userId);
      return result;
    } catch (err) {
      console.log(`User service getByToken error :${err.name} : ${err.message}`);
    }
  }

  async getByUserId(userId) {
    try {
      const result = await this.patientRepository.getByUserId(userId);
      return result;
    } catch (err) {
      console.log(`User service getByToken error :${err.name} : ${err.message}`);
    }
  }
}
