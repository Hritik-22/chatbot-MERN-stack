import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/CreateContext.jsx'

createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <App />
  </AuthProvider>
)
