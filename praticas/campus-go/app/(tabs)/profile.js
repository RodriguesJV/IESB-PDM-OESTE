import { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function Profile() {
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    async function loadPhoto() {
      try {
        const saved = await AsyncStorage.getItem(PHOTO_KEY);
        if (saved) setPhotoUri(saved);
      } catch (error) {
        console.warn('Erro ao carregar foto:', error);
      }
    }
    loadPhoto();
  }, []);

  async function savePhoto(uri) {
    if (!uri) return;
    setPhotoUri(uri);
    try {
      await AsyncStorage.setItem(PHOTO_KEY, uri);
    } catch (error) {
      console.warn('Erro ao salvar foto:', error);
    }
  }

  async function handlePickImage() {
    savePhoto(await pickImage());
  }

  async function handleTakePhoto() {
    savePhoto(await takePhoto());
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePickImage}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={styles.placeholderText}>Toque para escolher</Text>
          </View>
        )}
      </Pressable>

      <Text style={styles.name}>Meu Perfil</Text>
      <Button title="Tirar foto com a câmera" onPress={handleTakePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  avatar: { width: 150, height: 150, borderRadius: 75 },
  placeholder: { backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: '#555', textAlign: 'center', padding: 8 },
  name: { fontSize: 22, fontWeight: 'bold' },
});