import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Podcast() {
  // const { data} = useGetPlaylist();

  return (
    <View style={styles.label}>
    <Text style={styles.mainTitle}>Méditation podcasts</Text>
    <Text style={styles.subtitle}>Détentez-vous avec une méditation guidée ..</Text>
</View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f4f8ec',
      alignItems: 'center',
      justifyContent: 'center',
  },
  label: {
      marginTop: 200,
      alignItems: "center",
  },
  mainTitle: {
      color: '#4e6c42',
      fontSize: 30,
      fontWeight: 'bold',
      letterSpacing: 2,
  },
  subtitle: {
      color: "#42484a",
      fontSize: 20,
      fontWeight: "100",
  },
});