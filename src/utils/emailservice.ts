export const sendPasswordChangeEmail = async (email: string) => {
    try {
      // In a real application, this would integrate with your email service provider
      // For demonstration, we'll log the email content
      console.log(`
        To: ${email}
        Subject: Password Change Notification
        
        Your password has been successfully changed. If you did not make this change, 
        please contact support immediately.
      `);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }