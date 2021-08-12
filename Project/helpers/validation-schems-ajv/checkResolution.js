import { MAX_LENGTH, MIN_LENGTH } from '../../constants/LENGTH.js';

export const checkResolutionSchema = {
  type: 'string',
  maxLength: MAX_LENGTH,
  minLength: MIN_LENGTH,
};
