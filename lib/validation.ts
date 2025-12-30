export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function validateContactForm(data: unknown): {
  success: boolean;
  data?: ContactFormData;
  errors?: Record<string, string>;
} {
  try {
    const { name, email, message } = data as ContactFormData;
    
    const errors: Record<string, string> = {};
    
    // Name validation
    if (!name || name.trim().length < 2) {
      errors["name"] = 'Name must be at least 2 characters';
    } else if (name.length > 100) {
      errors["name"] = 'Name must be less than 100 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors["email"] = 'Please enter a valid email address';
    } else if (email.length > 100) {
      errors["email"] = 'Email must be less than 100 characters';
    }
    
    // Message validation
    if (!message || message.trim().length < 10) {
      errors["message"] = 'Message must be at least 10 characters';
    } else if (message.length > 5000) {
      errors["message"] = 'Message must be less than 5000 characters';
    }
    
    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }
    
    return { 
      success: true, 
      data: { 
        name: name.trim(), 
        email: email.trim(), 
        message: message.trim() 
      } 
    };
  } catch (error) {
    return { 
      success: false, 
      errors: { general: 'Invalid form data' } 
    };
  }
}