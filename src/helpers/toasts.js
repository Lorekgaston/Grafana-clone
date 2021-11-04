import { toast } from 'react-toastify';

export const toastPending = (message) => {
  toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000,
    theme: 'dark',
  });
};

export const toastError = (message) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
    theme: 'dark',
  });
};
