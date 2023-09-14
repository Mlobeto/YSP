// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Almacenar el token de autenticación
// export const storeAuthToken = async (token) => {
//   try {
//     await AsyncStorage.setItem('authToken', token);
//   } catch (e) {
//     console.error('Error al almacenar el token de autenticación:', e);
//     throw e;
//   }
// };

// // Obtener el token de autenticación almacenado
// export const getAuthToken = async () => {
//   try {
//     const token = await AsyncStorage.getItem('authToken');
//     return token;
//   } catch (e) {
//     // Manejar errores al obtener
//   }
// };

// // Eliminar el token de autenticación almacenado (por ejemplo, al cerrar sesión)
// export const removeAuthToken = async () => {
//   try {
//     await AsyncStorage.removeItem('authToken');
//   } catch (e) {
//     // Manejar errores al eliminar
//   }
// };