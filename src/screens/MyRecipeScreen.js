import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export default function MyRecipeScreen() {
  const navigation = useNavigation()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchrecipes = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('customrecipes')
      if (stored) {
        setRecipes(JSON.parse(stored))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchrecipes)
    fetchrecipes()
    return unsubscribe
  }, [navigation, fetchrecipes])

  const handleRecipeClick = (recipe, index) => {
    navigation.navigate('CustomRecipesScreen', { recipe, index })
  }

  const handleAddrecipe = () => {
    navigation.navigate('RecipesFormScreen')
  }

  const deleterecipe = async (index) => {
    try {
      const updatedRecipes = [...recipes]
      updatedRecipes.splice(index, 1)
      await AsyncStorage.setItem('customrecipes', JSON.stringify(updatedRecipes))
      setRecipes(updatedRecipes)
    } catch (err) {
      console.error(err)
    }
  }

  const editrecipe = (recipe, index) => {
    navigation.navigate('RecipesFormScreen', {
      recipeToEdit: recipe,
      recipeIndex: index,
    })
  }

  const renderItem = ({ item, index }) => (
    <View style={styles.recipeItem}>
      <TouchableOpacity
        testID="handlerecipeBtn"
        onPress={() => handleRecipeClick(item, index)}
        style={styles.recipeBtn}
      >
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.recipeImage}
            resizeMode="cover"
          />
        ) : null}
      </TouchableOpacity>
      <Text testID="recipeDescp" style={styles.description}>
        {item.description && item.description.length > 50
          ? item.description.slice(0, 50) + '...'
          : item.description}
      </Text>
      <View testID="editDeleteButtons" style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() => editrecipe(item, index)}
          style={styles.editBtn}
        >
          <Text style={styles.actionBtnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleterecipe(index)}
          style={styles.deleteBtn}
        >
          <Text style={styles.actionBtnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No custom recipes yet. Add one!</Text>
        }
      />
      <TouchableOpacity onPress={handleAddrecipe} style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ Add Recipe</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  recipeItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  recipeBtn: {
    alignItems: 'center',
  },
  recipeImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
  editBtn: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteBtn: {
    backgroundColor: '#e53935',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  addBtn: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#4caf50',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 4,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
})
