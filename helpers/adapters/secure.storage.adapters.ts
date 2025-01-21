import * as SecureStorage from "expo-secure-store"
import { Alert } from "react-native"

export class SecureStorageAdapter {
    static async setItem(key: string, value:string){
        try {
            await SecureStorage.setItemAsync(key, value)
        } catch (error) {
            Alert.alert("Error", 'Failed to set data')
        } 
    }

    static async getItem(key: string) {
      try {
        return await SecureStorage.getItemAsync(key)
      } catch (error) {
        Alert.alert("Error", 'Failed to get data')
      }
    }

    static async deleteItem(key: string) {
        try {
            await SecureStorage.deleteItemAsync(key)
        } catch (error) {
            console.log(error)
            Alert.alert("Error", 'Failed to delete')
        }
    }
}