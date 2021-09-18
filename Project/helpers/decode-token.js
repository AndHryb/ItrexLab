import jwt from 'jsonwebtoken';

export default function decodeToken(token) {
  const splitToken = token.split(' ');
  const clearToken = splitToken[1];
  const decoded = jwt.verify(clearToken, process.env.JWT_KEY);
  return decoded;
}
