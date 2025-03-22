
import { Capacitor } from '@capacitor/core';

export const isNativePlatform = () => {
  return Capacitor.isNativePlatform();
};

export const isIOS = () => {
  return Capacitor.getPlatform() === 'ios';
};

export const isAndroid = () => {
  return Capacitor.getPlatform() === 'android';
};

export const getDeviceInfo = async () => {
  if (isNativePlatform()) {
    try {
      const { Device } = await import('@capacitor/device');
      return await Device.getInfo();
    } catch (error) {
      console.error('Error getting device info:', error);
      return null;
    }
  }
  return null;
};

export const getPlatformVersion = async () => {
  const deviceInfo = await getDeviceInfo();
  return deviceInfo?.osVersion || 'unknown';
};
