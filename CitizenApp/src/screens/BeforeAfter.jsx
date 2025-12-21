import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {theme} from '../config/theme';

const {width} = Dimensions.get('window');

const BeforeAfter = ({navigation, route}) => {
  const {report} = route.params;
  const [activeTab, setActiveTab] = useState('before');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Before & After</Text>
        <View style={{width: 50}} />
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'before' && styles.tabActive]}
          onPress={() => setActiveTab('before')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'before' && styles.tabTextActive,
            ]}>
            Before
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'after' && styles.tabActive]}
          onPress={() => setActiveTab('after')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'after' && styles.tabTextActive,
            ]}>
            After
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'split' && styles.tabActive]}
          onPress={() => setActiveTab('split')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'split' && styles.tabTextActive,
            ]}>
            Compare
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'split' ? (
          <View style={styles.splitView}>
            <View style={styles.splitSection}>
              <Text style={styles.splitLabel}>Before</Text>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderIcon}>📸</Text>
                <Text style={styles.placeholderText}>Before Image</Text>
              </View>
            </View>
            <View style={styles.splitSection}>
              <Text style={styles.splitLabel}>After</Text>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderIcon}>✅</Text>
                <Text style={styles.placeholderText}>After Image</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.fullView}>
            <View style={styles.fullImageContainer}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderIcon}>
                  {activeTab === 'before' ? '📸' : '✅'}
                </Text>
                <Text style={styles.placeholderText}>
                  {activeTab === 'before' ? 'Before' : 'After'} Image
                </Text>
              </View>
            </View>
            <View style={styles.imageInfo}>
              <Text style={styles.imageTitle}>
                {activeTab === 'before' ? 'Problem Reported' : 'Work Completed'}
              </Text>
              <Text style={styles.imageDate}>
                📅 {activeTab === 'before' ? report.date : '2024-12-18'}
              </Text>
              <Text style={styles.imageDescription}>
                {activeTab === 'before'
                  ? 'Photo taken when the problem was reported'
                  : 'Photo taken after the work was completed'}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default BeforeAfter;

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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  tab: {
    flex: 1,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  tabActive: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
  },
  tabTextActive: {
    color: theme.colors.text.white,
  },
  content: {
    flex: 1,
  },
  fullView: {
    padding: theme.spacing.lg,
  },
  fullImageContainer: {
    marginBottom: theme.spacing.lg,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.md,
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  placeholderText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeight.medium,
  },
  imageInfo: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  imageTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  imageDate: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  imageDescription: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    lineHeight: 22,
  },
  splitView: {
    padding: theme.spacing.lg,
    gap: theme.spacing.xl,
  },
  splitSection: {
    marginBottom: theme.spacing.md,
  },
  splitLabel: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
});
