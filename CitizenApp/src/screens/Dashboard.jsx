import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import {authAPI} from '../config/api';
import {theme, problemCategories} from '../config/theme';




const Dashboard = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    reported: 0,
    inProgress: 0,
    completed: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = await authAPI.getCurrentUser();
      setUser(userData);
      // TODO: Fetch stats from API
      setStats({
        total: 0,
        reported: 0,
        inProgress: 0,
        completed: 0,
      });
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* Header */}
      {/* <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>{user?.name || 'Citizen'}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() || 'C'}
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, {backgroundColor: theme.colors.primary}]}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total Reports</Text>
        </View>
        <View style={[styles.statCard, {backgroundColor: theme.colors.warning}]}>
          <Text style={styles.statNumber}>{stats.inProgress}</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
        <View style={[styles.statCard, {backgroundColor: theme.colors.secondary}]}>
          <Text style={styles.statNumber}>{stats.completed}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionCard, {backgroundColor: theme.colors.accent}]}
            onPress={() => navigation.navigate('ReportProblem')}>
            <Text style={styles.actionIcon}>📸</Text>
            <Text style={styles.actionText}>Report Problem</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionCard, {backgroundColor: theme.colors.primary}]}
            onPress={() => navigation.navigate('MyReports')}>
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionText}>My Reports</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Problem Categories</Text>
        <View style={styles.categoriesGrid}>
          {problemCategories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() =>
                navigation.navigate('ReportProblem', {category})
              }>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

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
  greeting: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  userName: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.xs,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.white,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  statCard: {
    flex: 1,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.white,
  },
  statLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.white,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  section: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  actionCard: {
    flex: 1,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...theme.shadows.md,
  },
  actionIcon: {
    fontSize: 40,
    marginBottom: theme.spacing.sm,
  },
  actionText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.white,
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  categoryCard: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  categoryIcon: {
    fontSize: 30,
    marginBottom: theme.spacing.xs,
  },
  categoryName: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.primary,
    textAlign: 'center',
    fontWeight: theme.fontWeight.medium,
  },
});
