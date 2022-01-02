module.exports = {
    apps : [{
      name   : "backend",
      script : "./index.js",
      env_production: {
        NODE_ENV: "production",
        HOST: '127.0.0.1',
        PORT: 8081
      },
      env_development: {
        NODE_ENV: "development",
        HOST: '127.0.0.1',
        PORT: 8081
      },
      exec_mode: "cluster",
      autorestart: true,
      max_memory_restart: "4G"
    }]
  }