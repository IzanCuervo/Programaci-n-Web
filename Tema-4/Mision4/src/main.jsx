import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient(); //Guardamos los datos extraidos de la API y se apunta si cargaron o fallaron


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> {/*Pasa el queryClient (que es quien almacena los jugadores) a todos los componentes*/}
    <App />
    </QueryClientProvider>
  </StrictMode>,
)
