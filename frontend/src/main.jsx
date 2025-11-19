import { createRoot } from 'react-dom/client'
import './index.css'
import Routes from './routes'

createRoot(document.getElementById('root'))
  .render(
    <Routes />
  )
