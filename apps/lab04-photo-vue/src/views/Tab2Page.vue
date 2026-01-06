<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div style="padding: 10px;">
        <p>โดย [ณัฐนันท์ ขำสม] รหัส [663380382-3]</p>
      </div>

      <ion-grid>
        <ion-row>
          <ion-col size="6" v-for="photo in photos" :key="photo.filepath">
            <ion-img :src="photo.webviewPath"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="takePhoto()">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { camera } from 'ionicons/icons';
import { 
  IonPage, IonHeader, IonFab, IonFabButton, IonIcon, 
  IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonImg 
} from '@ionic/vue';

// 1. Import Composable ที่เราสร้างไว้
import { usePhotoGallery } from '@/composables/usePhotoGallery';

// 2. ดึงฟังก์ชัน takePhoto และตัวแปร photos ออกมาใช้งาน
const { photos, takePhoto } = usePhotoGallery();
</script>

