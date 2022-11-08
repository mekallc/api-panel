export const messageData = {
  info: {
    message: '',
    show: true,
    header: 'Show',
    autohide: true,
    delay: 1000,
  },
  success: {
    message: '',
    show: true,
    header: 'Show',
    autohide: true,
    delay: 1000,
  }
}

export interface ToastInterface {
  message?: string;
  show: boolean;
  header?: string;
  autohide: true;
  delay: number;
}
