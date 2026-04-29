import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FlowHub from './pages/FlowHub';
import ProjectOrchestrator from './pages/ProjectOrchestrator';
import InboundReceivables from './pages/InboundReceivables';
import NetworkDiscovery from './pages/NetworkDiscovery';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FlowHub />} />
        <Route path="/orchestrator" element={<ProjectOrchestrator />} />
        <Route path="/receivables" element={<InboundReceivables />} />
        <Route path="/network" element={<NetworkDiscovery />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
