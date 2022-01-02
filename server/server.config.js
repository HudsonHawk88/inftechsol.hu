module.exports = {
    apps : [{
      name   : "backend",
      script : "./index.js",
      env: {
        NODE_ENV: "production",
        HOST: '127.0.0.1',
        PORT: 8081,
        KEY_FILE: '/etc/letsencrypt/live/inftechsol.hu/privkey.pem',
        CERT_FILE:'/etc/letsencrypt/live/inftechsol.hu/cert.pem',
        FULL_FILE:'/etc/letsencrypt/live/inftechsol.hu/fullchain.pem',
        JWT_EXPIRE:'30s',
        JWT_SECRET:'{8883TGSZI-HLS101-ZEG-0318-20102013AG}',
        JWT_REFRESH_SECRET:'{20102013AG-0318-ZEG-HLS101-8883TGSZI}'
      },
      exec_mode: "cluster",
      autorestart: true,
      max_memory_restart: "4G"
    }]
  }