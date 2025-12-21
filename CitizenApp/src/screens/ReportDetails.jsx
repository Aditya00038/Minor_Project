import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {theme, statusConfig, problemCategories} from '../config/theme';

const ReportDetails = ({navigation, route}) => {
  const {report} = route.params;
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  
  const category = problemCategories.find(c => c.id === report.category) || {};
  const status = statusConfig[report.status];

  const handleRate = () => {
    if (report.status === 'completed') {
      navigation.navigate('RateFeedback', {report});
    } else {
      Alert.alert('Info', 'You can rate after the work is completed');
    }
  };

  const timeline = [
    {date: '2024-12-15', status: 'reported', time: '10:30 AM'},
    {date: '2024-12-16', status: 'assigned', time: '02:15 PM'},
    {date: '2024-12-17', status: 'inProgress', time: '09:00 AM'},
  ];

  if (report.status === 'completed') {
    timeline.push({date: '2024-12-18', status: 'completed', time: '04:30 PM'});
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Details</Text>
        <View style={{width: 50}} />
      </View>

      {/* Status Banner */}
      <View style={[styles.statusBanner, {backgroundColor: status.color}]}>
        <Text style={styles.statusIcon}>{status.icon}</Text>
        <Text style={styles.statusLabel}>{status.label}</Text>
      </View>

      {/* Report Info */}
      <View style={styles.section}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryIcon}>{category.icon}</Text>
          <View>
            <Text style={styles.categoryName}>{category.name}</Text>
            <Text style={styles.reportId}>ID: #{report.id}</Text>
          </View>
        </View>

        <Text style={styles.title}>{report.title}</Text>
        <Text style={styles.location}>📍 {report.location}</Text>
        <Text style={styles.date}>📅 Reported on {report.date}</Text>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {report.description || 'No description provided'}
        </Text>
      </View>

      {/* Timeline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status Timeline</Text>
        {timeline.map((item, index) => {
          const itemStatus = statusConfig[item.status];
          return (
            <View key={index} style={styles.timelineItem}>
              <View
                style={[
                  styles.timelineDot,
                  {backgroundColor: itemStatus.color},
                ]}>
                <Text style={styles.timelineDotIcon}>{itemStatus.icon}</Text>
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineStatus}>{itemStatus.label}</Text>
                <Text style={styles.timelineDate}>
                  {item.date} at {item.time}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Before & After Images */}
      {report.status === 'completed' && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Before & After</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BeforeAfter', {report})
              }>
              <Text style={styles.viewAllLink}>View Full Screen →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.beforeAfterContainer}>
            <View style={styles.imageContainer}>
              <Text style={styles.imageLabel}>Before</Text>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>📸</Text>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Text style={styles.imageLabel}>After</Text>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>✅</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Rating */}
      {report.status === 'completed' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Rating</Text>
          {report.rating ? (
            <View style={styles.ratingDisplay}>
              <Text style={styles.ratingStars}>
                {'⭐'.repeat(report.rating)}
              </Text>
              <Text style={styles.ratingText}>
                {report.rating}/5 - {report.feedback || 'No feedback'}
              </Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.rateButton} onPress={handleRate}>
              <Text style={styles.rateButtonText}>⭐ Rate This Work</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {report.status === 'completed' && !report.rating && (
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={handleRate}>
            <Text style={styles.actionButtonText}>Rate & Provide Feedback</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={() => Alert.alert('Info', 'Contact support feature')}>
          <Text style={[styles.actionButtonText, {color: theme.colors.primary}]}>
            Contact Support
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ReportDetails;

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
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  statusIcon: {
    fontSize: 24,
  },
  statusLabel: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.white,
  },
  section: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.md,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.md,
  },
  categoryIcon: {
    fontSize: 40,
  },
  categoryName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
  },
  reportId: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.light,
    marginTop: theme.spacing.xs,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  location: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  date: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.light,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    lineHeight: 22,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
  },
  timelineDot: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  timelineDotIcon: {
    fontSize: 20,
  },
  timelineContent: {
    flex: 1,
    paddingTop: theme.spacing.xs,
  },
  timelineStatus: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  timelineDate: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  viewAllLink: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semibold,
  },
  beforeAfterContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  imageContainer: {
    flex: 1,
  },
  imageLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  imagePlaceholder: {
    aspectRatio: 1,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 48,
  },
  ratingDisplay: {
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
  },
  ratingStars: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },
  ratingText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  rateButton: {
    backgroundColor: theme.colors.warning,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  rateButtonText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.white,
  },
  actionButtons: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  actionButton: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: theme.colors.accent,
  },
  secondaryButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  actionButtonText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.white,
  },
});
