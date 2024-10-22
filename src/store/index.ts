import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: state => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})

export const useLoginStore = defineStore('login', {
  state: () => ({ isLogin: false }),
  actions: {
    login() {
      this.isLogin = true
    },
    logout(navigate?: (route: string) => void) {
      this.isLogin = false;
      localStorage.removeItem('authen')
      if (navigate) {
        navigate('LoginView')
      }
    }
  }
})
