import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async <T>(key: string, value: T): Promise<void> => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (error) {
		console.error('Error setting item:', error);
	}
};

export const getItem = async <T>(key: string): Promise<T | null> => {
	try {
		const value = await AsyncStorage.getItem(key);
		return value != null ? (JSON.parse(value) as T) : null;
	} catch (error) {
		console.error('Error getting item:', error);
		return null;
	}
};
