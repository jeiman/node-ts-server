declare namespace Config {
  interface Application {
    app: { 
      host: string, 
      port: number
    },
    cors: {
      allowedOrigins: Array<string>
    }
  }
}