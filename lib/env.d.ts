declare namespace NodeJS {
  export interface ProcessEnv {
    // Email Configuration
    EMAIL_SERVER_USER: string;
    EMAIL_SERVER_PASSWORD: string;
    EMAIL_FROM: string;
    EMAIL_TO: string;
    
    // Application
    NODE_ENV: 'development' | 'production' | 'test';
    
    // Optional
    ALLOWED_ORIGINS?: string;
    RATE_LIMIT_MAX?: string;
    RATE_LIMIT_WINDOW_MS?: string;
  }
}