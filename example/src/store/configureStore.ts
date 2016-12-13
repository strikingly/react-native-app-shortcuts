declare var __DEV__: boolean

import * as throttle from 'lodash/throttle'
import * as Immutable from 'immutable'
import { createStore } from 'redux'
import reducers from '../reducers'
import { enhancers } from './enhancers'

export default async () => {
  const store = createStore(
    reducers,
    // override init state
    // Immutable.fromJS(persistedState)
    Immutable.fromJS({}),
    enhancers
  )
  store.subscribe(throttle(() => {
    // currently only persist dashboard, but we can persist more
    // ideally each of the reducer also maintains a cache should bust flag and trigger re-fetching
    // if time expires
    // saveState({
    // })
  }, 1000))
  return store
}
