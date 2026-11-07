import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const position = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = position.coords;

  let label = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

  try {
    const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (address) {
      const parts = [address.street, address.district || address.subregion, address.city]
        .filter(Boolean)
        .join(', ');
      if (parts) label = parts;
    }
  } catch (error) {
    console.warn('Erro ao buscar endereço:', error);
  }

  return { latitude, longitude, label };
}