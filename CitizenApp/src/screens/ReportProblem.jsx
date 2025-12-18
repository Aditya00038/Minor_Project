import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import {theme, problemCategories} from '../config/theme';

const ReportProblem = ({navigation, route}) => {
  const selectedCategory = route?.params?.category;
  
  const [formData, setFormData] = useState({
    category: selectedCategory?.id || null,
    title: '',
    description: '',
    location: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleCategorySelect = categoryId => {
    setFormData({...formData, category: categoryId});
  };

  const handleImagePick = () => {
    // TODO: Implement image picker
    Alert.alert('Image Picker', 'Camera/Gallery functionality will be added');
  };

  const handleLocationCapture = () => {
    // TODO: Implement location capture
    Alert.alert('Location', 'Auto location capture will be added');
    setFormData({...formData, location: 'Current Location (Sample)'});
  };

  const handleSubmit = async () => {
    if (!formData.category || !formData.title || !formData.description) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      // TODO: Submit to API
      Alert.alert('Success', 'Problem reported successfully!', [
        {text: 'OK', onPress: () => navigation.navigate('MyReports')},
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report a Problem</Text>
        <View style={{width: 50}} />
      </View>

      {/* Category Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>
          Category <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.categoryGrid}>
          {problemCategories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                formData.category === category.id && styles.categorySelected,
              ]}
              onPress={() => handleCategorySelect(category.id)}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryLabel}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Title */}
      <View style={styles.section}>
        <Text style={styles.label}>
          Title <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Brief description of the problem"
          value={formData.title}
          onChangeText={text => setFormData({...formData, title: text})}
        />
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.label}>
          Description <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Provide detailed information about the problem"
          value={formData.description}
          onChangeText={text => setFormData({...formData, description: text})}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Location */}
      <View style={styles.section}>
        <Text style={styles.label}>Location</Text>
        <View style={styles.locationContainer}>
          <TextInput
            style={[styles.input, {flex: 1}]}
            placeholder="Location will be captured automatically"
            value={formData.location}
            editable={false}
          />
          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleLocationCapture}>
            <Text style={styles.locationButtonText}>📍 Get Location</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Upload */}
      <View style={styles.section}>
        <Text style={styles.label}>Upload Photo/Video</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={handleImagePick}>
          {formData.image ? (
            <Image source={{uri: formData.image}} style={styles.uploadedImage} />
          ) : (
            <>
              <Text style={styles.uploadIcon}>📸</Text>
              <Text style={styles.uploadText}>Tap to add photo or video</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={loading}>
        <Text style={styles.submitButtonText}>
          {loading ? 'Submitting...' : 'Submit Report'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReportProblem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.sm,
  },
  backButton: {
    fontSize: theme.fontSize.md,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semibold,
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  section: {
    padding: theme.spacing.lg,
  },
  label: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  required: {
    color: theme.colors.accent,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  categoryItem: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categorySelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '20',
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: theme.spacing.xs,
  },
  categoryLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.primary,
    textAlign: 'center',
    fontWeight: theme.fontWeight.medium,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.fontSize.md,
    color: theme.colors.text.primary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  locationContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
  locationButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  locationButtonText: {
    color: theme.colors.text.white,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
  },
  uploadBox: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.border,
  },
  uploadIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.sm,
  },
  uploadText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius.md,
  },
  submitButton: {
    backgroundColor: theme.colors.accent,
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...theme.shadows.md,
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.text.secondary,
  },
  submitButtonText: {
    color: theme.colors.text.white,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
  },
});
