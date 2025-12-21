import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {theme, statusConfig, problemCategories} from '../config/theme';

const MyReports = ({navigation}) => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    // TODO: Fetch from API
    // Sample data
    setReports([
      {
        id: 1,
        title: 'Pothole on Main Street',
        category: 1,
        status: 'inProgress',
        date: '2024-12-15',
        location: 'Main Street, Block A',
      },
      {
        id: 2,
        title: 'Street Light Not Working',
        category: 2,
        status: 'completed',
        date: '2024-12-10',
        location: 'Park Avenue',
        rating: 4,
      },
      {
        id: 3,
        title: 'Garbage Not Collected',
        category: 3,
        status: 'reported',
        date: '2024-12-18',
        location: 'Green Colony',
      },
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReports();
    setRefreshing(false);
  };

  const filteredReports =
    filter === 'all'
      ? reports
      : reports.filter(r => r.status === filter);

  const getCategoryInfo = categoryId => {
    return problemCategories.find(c => c.id === categoryId) || {};
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Reports</Text>
        <View style={{width: 50}} />
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
          onPress={() => setFilter('all')}>
          <Text
            style={[
              styles.filterText,
              filter === 'all' && styles.filterTextActive,
            ]}>
            All ({reports.length})
          </Text>
        </TouchableOpacity>
        {Object.keys(statusConfig).map(status => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterTab,
              filter === status && styles.filterTabActive,
            ]}
            onPress={() => setFilter(status)}>
            <Text
              style={[
                styles.filterText,
                filter === status && styles.filterTextActive,
              ]}>
              {statusConfig[status].label} (
              {reports.filter(r => r.status === status).length})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Reports List */}
      <ScrollView
        style={styles.reportsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {filteredReports.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>No reports found</Text>
          </View>
        ) : (
          filteredReports.map(report => {
            const category = getCategoryInfo(report.category);
            const status = statusConfig[report.status];
            return (
              <TouchableOpacity
                key={report.id}
                style={styles.reportCard}
                onPress={() =>
                  navigation.navigate('ReportDetails', {report})
                }>
                <View style={styles.reportHeader}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeIcon}>{category.icon}</Text>
                  </View>
                  <View style={styles.reportInfo}>
                    <Text style={styles.reportTitle}>{report.title}</Text>
                    <Text style={styles.reportLocation}>📍 {report.location}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {backgroundColor: status.color + '20'},
                    ]}>
                    <Text style={[styles.statusText, {color: status.color}]}>
                      {status.icon}
                    </Text>
                  </View>
                </View>
                <View style={styles.reportFooter}>
                  <Text style={styles.reportDate}>📅 {report.date}</Text>
                  {report.rating && (
                    <Text style={styles.reportRating}>
                      ⭐ {report.rating}/5
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('ReportProblem')}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyReports;

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
  filterContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },
  filterTab: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background,
  },
  filterTabActive: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeight.medium,
  },
  filterTextActive: {
    color: theme.colors.text.white,
  },
  reportsList: {
    flex: 1,
    padding: theme.spacing.md,
  },
  reportCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  categoryBadge: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  categoryBadgeIcon: {
    fontSize: 20,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  reportLocation: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    fontSize: theme.fontSize.md,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.sm,
  },
  reportDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
  },
  reportRating: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.warning,
    fontWeight: theme.fontWeight.semibold,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  emptyText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  fabIcon: {
    fontSize: 32,
    color: theme.colors.text.white,
    fontWeight: theme.fontWeight.bold,
  },
});
