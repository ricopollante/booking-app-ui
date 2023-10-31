import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'bookingapp',
  webDir: 'dist\\bookingapp',
  server: {
    androidScheme: 'https'
  }
};

export default config;
