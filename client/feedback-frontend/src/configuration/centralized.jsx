import dev from './development'
import test from './testing'
import staging from './staging'
import prod from './production'

// Determine environment: prefer explicit VITE_APP_ENV, then NODE_ENV
const ENV = (import.meta.env.VITE_APP_ENV || import.meta.env.NODE_ENV || 'development').toLowerCase()

const envMap = {
  development: dev,
  testing: test,
  staging: staging,
  production: prod,
}

const chosen = envMap[ENV] || dev

// Allow overriding via Vite env var VITE_API_BASE_URL; if set, it wins.
const rawFromEnv = import.meta.env.VITE_API_BASE_URL || ''
const API_BASE = (rawFromEnv || chosen.API_BASE_URL || '').replace(/\/$/, '')
const IS_API_CONFIGURED = Boolean(API_BASE)

export { API_BASE, IS_API_CONFIGURED }

export default {
  ENV,
  API_BASE,
}
