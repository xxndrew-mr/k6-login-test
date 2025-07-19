import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% request harus di bawah 500ms
    http_req_failed: ['rate<0.1'],    // Maks 10% boleh gagal
  },
};


export default function () {
  const url = 'https://reqres.in/api/login';
  const payload = JSON.stringify({
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1' 
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'token exists': (r) => r.json('token') !== undefined,
  });

  sleep(1);
}
