module.exports = {
  apps: [
    {
      name: "Stats",
      namespace: "Stats",
      script: 'Mys.js',
      watch: true,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Src/Stats-Main",
      node_args: "--trace-warnings"
    },
    
    {
      name: "StatsDB",
      namespace: "StatsDB",
      script: 'Mys.js',
      watch: true,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Src/Stats-Database",
      node_args: "--trace-warnings"
    },
  ]
};

