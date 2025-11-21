import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './i18n'
import './index.css'
import Routes from './routes'

createRoot(document.getElementById('root'))
  .render(
    <QueryClientProvider client={new QueryClient()}>
      <Routes />
    </QueryClientProvider>
  )
