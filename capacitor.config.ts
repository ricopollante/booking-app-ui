import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'carecom',
  webDir: 'dist\\bookingapp',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '216907772562-k80aqsd288sdpmo27bn51rhvtslbm4sc.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
      clientId: '216907772562-k80aqsd288sdpmo27bn51rhvtslbm4sc.apps.googleusercontent.com',
      androidClientId: '216907772562-k80aqsd288sdpmo27bn51rhvtslbm4sc.apps.googleusercontent.com'
    },
  },
};

export default config;
