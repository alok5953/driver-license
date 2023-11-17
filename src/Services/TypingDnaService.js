import axios from 'axios';
import { baseURL } from './BaseApi';

const getHeaders = () => {
  const accessToken = sessionStorage.getItem('userAccessToken')
  return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}

export const TypingDnaService = {

  getQuotes: (min, max) => {
    return axios.get(baseURL + `/api/user/typing-dna/quote?min=${min}&max=${max}`, getHeaders()

    )
  },
  typing_dna_save: (typing_pattern) => {
    return axios.post(baseURL + `/api/user/typing-dna/save`, typing_pattern, getHeaders()

    )
  },
  typing_dna_verify: (typing_pattern, module_id) => {
    return axios.post(baseURL + `/api/user/typing-dna/verify`, typing_pattern, getHeaders()

    )
  },
  check_user: () => {
    return axios.get(baseURL + `/api/user/typing-dna/user`, getHeaders()
    )
  },
  typing_dna_session_verified_user: () => {
    return axios.get(baseURL + `/api/user/typing-dna/sessionVerified`, getHeaders()
    )
  }
}