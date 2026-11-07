const light = {
  background: '#f4f1fb',
  card: '#ffffff',
  text: '#1d1b26',
  textSecondary: '#6b6880',
  primary: '#3e04c3',
  onPrimary: '#ffffff',
  border: '#d4d0e0',
  inputBackground: '#ffffff',
  error: '#d32f2f',
  success: '#2e7d32',
  chip: '#e6e3ef',
  chipText: '#333344',
  summaryBackground: '#e4d9fd',
  summaryText: '#5721d4',
  overlay: 'rgba(0,0,0,0.45)',
};

const dark = {
  background: '#121118',
  card: '#1f1d2b',
  text: '#f2f0fa',
  textSecondary: '#a29fb5',
  primary: '#8b5cf6',
  onPrimary: '#ffffff',
  border: '#3a3750',
  inputBackground: '#1f1d2b',
  error: '#ff6b6b',
  success: '#66bb6a',
  chip: '#34314a',
  chipText: '#e6e3f5',
  summaryBackground: '#2b2540',
  summaryText: '#c4b5fd',
  overlay: 'rgba(0,0,0,0.65)',
};

export const themes = { light, dark };

// recebe o valor de useColorScheme() ('light', 'dark' ou null)
export function getTheme(scheme) {
  return scheme === 'dark' ? dark : light;
}