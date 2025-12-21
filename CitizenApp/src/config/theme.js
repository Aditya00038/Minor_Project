export const theme = {
  colors: {
    primary: '#2E86DE',        // Blue - Main actions
    secondary: '#10AC84',      // Green - Success/Completed
    accent: '#FF6B6B',         // Red - Urgent/Problems
    warning: '#FFA502',        // Orange - In Progress
    background: '#F8F9FA',     // Light gray
    surface: '#FFFFFF',        // White
    text: {
      primary: '#2C3E50',      // Dark gray
      secondary: '#7F8C8D',    // Medium gray
      light: '#95A5A6',        // Light gray
      white: '#FFFFFF',
    },
    status: {
      reported: '#3498DB',     // Blue
      assigned: '#9B59B6',     // Purple
      inProgress: '#FFA502',   // Orange
      completed: '#10AC84',    // Green
      rejected: '#E74C3C',     // Red
    },
    border: '#E1E8ED',
    shadow: '#000000',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

export const problemCategories = [
  {id: 1, name: 'Road Damage', icon: '🛣️', color: '#E74C3C'},
  {id: 2, name: 'Street Light', icon: '💡', color: '#F39C12'},
  {id: 3, name: 'Garbage', icon: '🗑️', color: '#27AE60'},
  {id: 4, name: 'Water Supply', icon: '💧', color: '#3498DB'},
  {id: 5, name: 'Drainage', icon: '🚰', color: '#9B59B6'},
  {id: 6, name: 'Parks & Gardens', icon: '🌳', color: '#2ECC71'},
  {id: 7, name: 'Public Transport', icon: '🚌', color: '#E67E22'},
  {id: 8, name: 'Others', icon: '📋', color: '#95A5A6'},
];

export const statusConfig = {
  reported: {
    label: 'Reported',
    color: '#3498DB',
    icon: '📝',
  },
  assigned: {
    label: 'Assigned',
    color: '#9B59B6',
    icon: '👷',
  },
  inProgress: {
    label: 'In Progress',
    color: '#FFA502',
    icon: '⚙️',
  },
  completed: {
    label: 'Completed',
    color: '#10AC84',
    icon: '✅',
  },
  rejected: {
    label: 'Rejected',
    color: '#E74C3C',
    icon: '❌',
  },
};
