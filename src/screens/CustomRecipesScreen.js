import React from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { toggleFavorite } from '../store/favoritesSlice'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default function CustomRecipesScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { recipe, index } = route.params || {}
  const favorites = useSelector(state => state.favorites.favoriterecipes)

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text>No Recipe Details Available</Text>
      </View>
    )
  }

  const isFavorite = favorites.some(item => item.idFood === recipe.idFood)

  const handleToggleFavorite = () => {
    dispatch(
      toggleFavorite({
        idFood: recipe.idFood,
        recipeName: recipe.title,
        recipeImage: recipe.image,
        recipeInstructions: recipe.description,
        category: 'Custom',
      })
    )
  }

  const imageHeight = index % 3 === 0 ? hp(25) : hp(35)

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View testID="imageContainer" style={styles.imageContainer}>
        <Image
          source={{ uri: recipe.image }}
          style={[styles.image, { height: imageHeight }]}
          resizeMode="cover"
        />
      </View>

      <View testID="topButtonsContainer" style={styles.topButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topBtn}>
          <Text style={styles.topBtnText}>GoBack</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.topBtn}>
          <Text style={styles.topBtnText}>{isFavorite ? '\u2665' : '\u2661'}</Text>
        </TouchableOpacity>
      </View>

      <View testID="contentContainer" style={styles.contentContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.contentLabel}>Content</Text>
          <Text style={styles.description}>{recipe.description}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    width: '100%',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  topBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  topBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  descriptionWrapper: {
    marginTop: 8,
  },
  contentLabel: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
})
