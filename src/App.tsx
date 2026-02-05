/* Main App Component - Handles routing (using react-router-dom), query client and other providers */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { LeadsProvider } from '@/context/LeadsContext'
import Index from './pages/Index'
import Leads from './pages/Leads'
import Pipeline from './pages/Pipeline'
import Activities from './pages/Activities'
import Proposals from './pages/Proposals'
import Reports from './pages/Reports'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

const App = () => (
  <LeadsProvider>
    <BrowserRouter
      future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/tasks" element={<Activities />} />{' '}
            {/* Reuse Activities for Tasks */}
            <Route path="/proposals" element={<Proposals />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </LeadsProvider>
)

export default App
