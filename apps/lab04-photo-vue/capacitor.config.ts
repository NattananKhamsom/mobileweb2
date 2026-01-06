import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'lab04-photo-vue',
  webDir: 'dist', // แก้จาก 'public' เป็น 'dist'
  bundledWebRuntime: false
};

export default config;