import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'bookingapp',
  webDir: 'dist\\bookingapp',
  server: {
    androidScheme: 'https'
  },
	bundledWebRuntime: false
};

export default config;
