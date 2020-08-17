import React, { FC, createContext, useReducer, Dispatch } from 'react'

// TODO: これは仮実装です。
type Toast = {
  type: 'info' | 'error' | 'warn'
  message: string
  waitingTime: number
  close?: boolean
}

type InitialGlobalState = {
  loading: boolean
  toast: Toast[]
}

const initialGlobalState: InitialGlobalState = {
  loading: false,
  toast: []
}

const actionTypes = [
  'LOADING_START',
  'LOADING_END',
  'TOAST_ADD',
  'TOAST_DELETE',
] as const

type ActionType = typeof actionTypes[number]

type Action = {
  type: ActionType
  payload?: unknown
}

const globalReducer = (state = initialGlobalState, action: Action): InitialGlobalState => {
  switch (action.type) {
  case "LOADING_START":
    return {
      ...state,
      loading: true
    }
  case "LOADING_END":
    return {
      ...state,
      loading: false 
    }
  case "TOAST_ADD":
    return {
      ...state,
    }
  case "TOAST_DELETE":
    return {
      ...state,
    }
  }
}

export const GlobalContext = createContext<{ state: InitialGlobalState, dispatch: Dispatch<Action>}>(
  { state: initialGlobalState, dispatch: () => {} }
)

export const GlobalContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialGlobalState)
  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalContext.Provider>
  )
}

