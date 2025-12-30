declare namespace NodeJS {
  export interface ProcessEnv {
    // Nodemailer
    EMAIL_SERVER_USER: string;
    EMAIL_SERVER_PASSWORD: string;
    EMAIL_FROM: string;
    EMAIL_TO: string;
    
    // Resend
    RESEND_API_KEY: string;
    
    // Other
    NODE_ENV: 'development' | 'production';
    NEXT_PUBLIC_SITE_URL: string;
  }
}