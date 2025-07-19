# 🔥 K6 Load Testing - Login API

Proyek ini digunakan untuk melakukan **performance testing** pada endpoint login menggunakan [k6](https://k6.io/) — tool open-source untuk load testing berbasis JavaScript. Tes dilakukan untuk mengukur kecepatan, reliabilitas, dan ketahanan API login.

---

## 📌 Endpoint yang Diuji

- **URL**: `POST https://reqres.in/api/login`  
- **Payload**:
  ```json
  {
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
  }
  ```

---

## 📁 Struktur Folder

```
k6-login-test/
├── login-test.js                      # Script utama load testing
└── test-results/
    └── hasil-k6-performance-test.png  
```

---

## ⚙️ Cara Menjalankan

1. **Instalasi K6 via Chocolatey (Windows)**:
   Buka PowerShell sebagai Administrator dan jalankan:
   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; `
   [System.Net.ServicePointManager]::SecurityProtocol = `
   [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; `
   iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

   choco install k6
   ```

2. **Jalankan Script**:
   Masuk ke folder project dan jalankan:
   ```bash
   k6 run login-test.js
   ```

---

## ✅ Script: `login-test.js`

```javascript
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% request harus <500ms
    http_req_failed: ['rate<0.1'],    // Gagal <10%
  },
};

export default function () {
  const url = 'https://reqres.in/api/login';
  const payload = JSON.stringify({
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  });

  const headers = { 'Content-Type': 'application/json' };

  const res = http.post(url, payload, { headers });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'token exists': (r) => JSON.parse(r.body).token !== undefined,
  });
}
```

---

## 📊 Contoh Hasil Tes

```
checks_succeeded...................: 64.10% 100 out of 156
checks_failed......................: 35.89% 56 out of 156

✗ status is 200
  ↳  64% — ✓ 50 / ✗ 28
✗ token exists
  ↳  64% — ✓ 50 / ✗ 28

thresholds:
✗ 'http_req_duration: p(95)<500' => 611.75ms
✗ 'http_req_failed: rate<0.1' => 35.89%
```

🖼 Screenshot hasil uji di `test-results/hasil-k6-performance-test.png`

---

## 🧠 Insight & Analisis

- **Request gagal 35.89%** = server belum stabil untuk 10 user paralel.
- **p95 latency 611ms** = melebihi batas optimal (500ms).
- Rekomendasi: optimasi backend dan monitoring beban server.

---

## 🧑‍💻 Author

**Andre Marshandito**  
📌 QA Automation & Performance Testing Enthusiast  
🔗 [linkedin.com/in/andre-marshandito](https://www.linkedin.com/in/andre-marshandito)

---

## 🏁 Next Step

- Tambahkan test untuk metode HTTP lain seperti `GET`, `PUT`, `DELETE`.
- Upload ke GitHub untuk memperkuat portofolio QA kamu.
