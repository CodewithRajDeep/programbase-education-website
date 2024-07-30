import emailjs from 'emailjs-com';
import { toast } from 'react-hot-toast';

export const handleEmailSubmit = async (email) => {
  const serviceId = '';
  const templateId = ';
  const userId = '';

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase().trim());
  };

  if (!validateEmail(email)) {
    return Promise.reject('Invalid email address');
  }

  try {
    const response = await emailjs.send(serviceId, templateId, { email }, userId);
    console.log('SUCCESS!', response);
    toast.success('Email sent successfully');
    return await Promise.resolve('Email sent successfully');
  } catch (error) {
    console.error('FAILED...', error);
    toast.error('Error sending email');
    return await Promise.reject('Error sending email');
  }
};
