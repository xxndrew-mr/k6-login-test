# 🔥 K6 Login Load Testing - Reqres API

This project demonstrates performance testing using [k6](https://k6.io) for the `POST /api/login` endpoint from [reqres.in](https://reqres.in).

## 📌 Scenario
This script:
- Sends POST requests with valid login payload
- Verifies status is `200` and `token` is returned
- Uses thresholds:
  - 95% of response times should be < 500ms
  - Failed request rate should be < 10%

## 📁 Structure
```
k6-login-test/
├── login-test.js
└── test-results/
    └── login-test-screenshot.png (optional)
```

## 🧪 Run the Test

### 1. Install k6  
Using Chocolatey (Windows):
```bash
choco install k6
```
Or download manually: https://github.com/grafana/k6/releases

### 2. Run script
```bash
k6 run login-test.js
```

## 📄 Script Overview

```js
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.1'],
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
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'token exists': (r) => JSON.parse(r.body).token !== undefined,
  });
}
```

## 🧾 Sample Output

```
http_req_duration... ✗ 'p(95)<500' p(95)=611.75ms
http_req_failed..... ✗ 'rate<0.1' rate=35.89%
checks_succeeded.... 64.10%
```

## 📸 Notes
Add screenshots of the test output (optional) under `test-results/`.

---

## 📬 About

Created by [Andre Marshandito](https://www.linkedin.com/in/andre-marshandito/)  
Feel free to fork or star ⭐ this repo if you found it helpful!

