import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css' 
import { ThemeProvider } from './Context/ThemeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SkeletonTheme
        baseColor="#989898f0" highlightColor="#bfbabaf5"
      >
        <App />
      </SkeletonTheme>
    </ThemeProvider>
  </React.StrictMode>,
)
