import { createContext, useContext } from 'react'
import {
  permissionStore,
  permissionKey,
} from '@/domains/permission/store/index'
import { roleStore, roleStoreKey } from '@/domains/role/store/index'
function createStores() {
  return {
    [permissionKey]: permissionStore,
    [roleStoreKey]: roleStore,
  }
}

export const stores = createStores()

export const StoresContext = createContext(stores)

export const useStores = () => useContext(StoresContext)
