export enum MessageType {
    User = 'user',
    Bot = 'bot',
    Error = 'error',
  }
  
  export interface Message {
    type: MessageType;
    content: string;
    timestamp: Date;
  }