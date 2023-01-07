import axios from 'axios';

export default function applyVerificationCode(email: string) {
  return axios.post(`/api/email/verification_code/${email}`);
}
