import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { theme } from '../config/theme';
import Video from 'react-native-video';
import Geolocation from '@react-native-community/geolocation';

// Mock classifier (replace with your API call)
const classifyImage = async (imageUri) => {
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 1000));
  // Randomly return a label
  const labels = ['wet', 'dry', 'unknown'];
  return labels[Math.floor(Math.random() * labels.length)];
};

const getLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position.coords),
      error => reject(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });

const submitReport = async (media, label, location) => {
  // Replace this with your backend API call
  await new Promise((res) => setTimeout(res, 1000));
  // Simulate success
  return true;
};

const ReportProblem = () => {
  const [media, setMedia] = useState(null); // { type: 'photo'|'video', uri: string }
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState(null);

  const handlePickerPress = () => {
    setModalVisible(true);
  };

  const handleTakePhoto = async () => {
    setModalVisible(false);
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
    });
    if (result.assets && result.assets.length > 0) {
      setMedia({ type: 'photo', uri: result.assets[0].uri });
      setLabel(null);
    }
  };

  const handleRecordVideo = async () => {
    setModalVisible(false);
    const result = await launchCamera({
      mediaType: 'video',
      cameraType: 'back',
      saveToPhotos: true,
    });
    if (result.assets && result.assets.length > 0) {
      setMedia({ type: 'video', uri: result.assets[0].uri });
      setLabel(null);
    }
  };

  const handleSubmit = async () => {
    if (!media) {
      Alert.alert('Please select or capture an image/video first.');
      return;
    }
    setLoading(true);
    try {
      let resultLabel = label;
      if (media.type === 'photo') {
        resultLabel = await classifyImage(media.uri);
        setLabel(resultLabel);
      } else {
        resultLabel = 'unknown'; // Or handle video classification if needed
        setLabel(resultLabel);
      }
      const coords = await getLocation();
      await submitReport(media, resultLabel, coords);
      Alert.alert('Success', `Submitted as ${resultLabel} garbage!\nLocation: (${coords.latitude}, ${coords.longitude})`);
    } catch (e) {
      Alert.alert('Error', e.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report a Problem</Text>
      <TouchableOpacity style={styles.filePicker} onPress={handlePickerPress}>
        {!media ? (
          <View style={styles.centerContent}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/1828/1828925.png" }}
              style={styles.fileIcon}
            />
            <Text style={styles.selectText}>Click/Record</Text>
          </View>
        ) : media.type === 'photo' ? (
          <Image source={{ uri: media.uri }} style={styles.previewMedia} />
        ) : (
          <Video
            source={{ uri: media.uri }}
            style={styles.previewMedia}
            controls
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>

      {/* Modal for choosing action */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={handleTakePhoto}>
              <Text style={styles.modalButtonText}>Click Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleRecordVideo}>
              <Text style={styles.modalButtonText}>Record Video</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {loading && <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 16 }} />}
      <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
        <Text style={styles.modalButtonText}>Submit</Text>
      </TouchableOpacity>
      {label && (
        <Text style={{ textAlign: 'center', marginTop: 8 }}>
          Classified as: <Text style={{ fontWeight: 'bold' }}>{label}</Text>
        </Text>
      )}
    </View>
  );
};

export default ReportProblem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filePicker: {
    height: 160,
    borderWidth: 2,
    borderColor: '#2ee59d',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 24,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileIcon: {
    width: 36,
    height: 36,
    marginBottom: 8,
    tintColor: '#bdbdbd',
  },
  selectText: {
    color: '#bdbdbd',
    fontSize: 16,
  },
  previewMedia: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    width: 220,
    alignItems: 'center',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});