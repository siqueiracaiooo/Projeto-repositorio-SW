import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const SPACING = 10;

const App = () => {
  const [Personagens, setPersonagens] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/people/');
        const data = await response.json();
        setPersonagens(data.results.slice(0, 50));
      } catch (erro) {
        console.error('erro:', erro);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>10 Personagens de Star Wars I, II, III, IV, V ou VI</Text>
      <FlatList
        data={Personagens}
        keyExtractor={(item) => item.name}
        numColumns={COLUMN_COUNT}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style ={styles.itemDetails}>Peso: {item.mass}</Text>
            <Text style={styles.itemDetails}>Altura: {item.height}</Text>
            <Text style={styles.itemDetails}>Data de Nascimento: {item.birth_year}</Text>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    width: (width - (COLUMN_COUNT + 1) * SPACING) / COLUMN_COUNT,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    padding: 15,
    marginBottom: SPACING,
    marginRight: SPACING,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center', // Centraliza o conteúdo
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemDetails: {
    fontSize: 14,
  },
  flatListContent: {
    paddingVertical: SPACING,
    paddingHorizontal: SPACING,
  },
});

export default App;
