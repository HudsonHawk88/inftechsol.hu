module.exports = {
    apps : [{
      name   : "backend",
      script : "index.js",
      env: {
        NODE_ENV: "production",
        HOST: '127.0.0.1',
        PORT: 8081
      },
      exec_mode: "cluster",
      autorestart: true,
      max_memory_restart: "4G"
    }]
  }