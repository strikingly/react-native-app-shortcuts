// import init from './init'
// init()

import * as React from 'react'
import { Provider } from 'react-redux'
import {
  AppState,
  Platform,
  Text,
} from 'react-native'
// import { TZRouter } from './router'
import configureStore from './store/configureStore'

declare var __DEV__: boolean

interface RootComponentState {
  store: any
}

export function setup() {
  class Root extends React.Component<any, RootComponentState> {
    constructor() {
      super()
      this._getInitialState()
    }

    _getInitialState() {
      configureStore().then((store) => {
        this.state = { store }
        this.forceUpdate() // needed because Root is a redux-connected
      })
    }

    _handleMemoryWarning() {
      console.log('memoryWarning!')
    }

    componentWillMount() {
      if (Platform.OS === 'ios') {
        AppState.addEventListener('memoryWarning', this._handleMemoryWarning)
      }
    }

    componentWillUnmount() {
      if (Platform.OS === 'ios') {
        AppState.removeEventListener('memoryWarning', this._handleMemoryWarning)
      }
    }

    render() {
      if (this.state) {
        return (
          <Provider store={this.state.store}>
            <Text>Hello world</Text>
          </Provider>
        )
      } else {
        return null
      }
    }

  }
  return Root
}
