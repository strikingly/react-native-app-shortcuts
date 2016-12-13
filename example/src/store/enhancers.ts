declare var __DEV__: boolean

import { Iterable } from 'immutable'
import { applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as createLogger from 'redux-logger'
const Reactotron = require('reactotron-react-native').default
const createReactotronEnhancer = require('reactotron-redux')

const isDebuggingInChrome: boolean =  __DEV__ && !!window.navigator.userAgent

const loggerMiddleware = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  stateTransformer: (state: any) => {
    if (Iterable.isIterable(state)) {
      return state.toJS()
    } else {
      return state
    }
  },
})

const middlewaresEnhancer = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)

const reactotronEnhancer = createReactotronEnhancer(Reactotron)

export const enhancers = __DEV__ ?
  compose(
    middlewaresEnhancer,
    reactotronEnhancer
    // to be able to let thunk be logged properly,
    // put reactotronEnhancer after middlewares,
    // although reactotron's official doc said something else:
    // https://github.com/reactotron/reactotron/blob/master/docs/plugin-redux.md
  ) : middlewaresEnhancer
