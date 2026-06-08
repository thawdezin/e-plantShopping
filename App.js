import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import store from './src/store/store'
import MyRecipeScreen from './src/screens/MyRecipeScreen'
import CustomRecipesScreen from './src/screens/CustomRecipesScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MyRecipeScreen">
          <Stack.Screen
            name="MyRecipeScreen"
            component={MyRecipeScreen}
            options={{ title: 'My Recipes' }}
          />
          <Stack.Screen
            name="CustomRecipesScreen"
            component={CustomRecipesScreen}
            options={{ title: 'Recipe Detail' }}
          />
          <Stack.Screen
            name="RecipesFormScreen"
            component={PlaceholderScreen}
            options={{ title: 'Add / Edit Recipe' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

function PlaceholderScreen() {
  return null
}
