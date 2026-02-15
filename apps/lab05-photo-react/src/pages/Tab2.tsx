import { camera } from 'ionicons/icons';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonFab, 
  IonFabButton, 
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg 
} from '@ionic/react';
// นำเข้าทั้ง usePhotoGallery และ Interface UserPhoto เพื่อแก้ปัญหา error implicitly has an 'any' type
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery'; 
import './Tab2.css';

const Tab2: React.FC = () => {
  // ดึงทั้งฟังก์ชันถ่ายภาพและตัวแปรรายการรูปภาพมาใช้งาน 
  const { photos, addNewToGallery } = usePhotoGallery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle> [cite: 74, 90]
          <IonTitle size="small">Lab 05 โดย ณัฐนันท์ ขำสม รหัส 663380382-3</IonTitle> [cite: 91]
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Photo Gallery</IonTitle> [cite: 98]
            <IonTitle size="small">Lab 05 โดย ณัฐนันท์ ขำสม รหัส 663380382-3</IonTitle> [cite: 99, 100]
          </IonToolbar>
        </IonHeader>

        {/* ส่วนแสดงรายการรูปภาพเป็น Grid 2 คอลัมน์  */}
        <IonGrid>
          <IonRow>
            {photos.map((photo: UserPhoto, index: number) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* ปุ่มลอยสำหรับกดถ่ายภาพ [cite: 75, 103, 104] */}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => addNewToGallery()}> [cite: 105, 107]
            <IonIcon icon={camera}></IonIcon> [cite: 79, 106]
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;