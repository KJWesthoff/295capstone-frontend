import React, { useState } from 'react';
import './App.css';
import ApiScanner from './components/ApiScanner';
import Report from './components/Report';

interface ScanReport {
  url: string;
  timestamp: string;
  vulnerabilities: Array<{
    severity: 'low' | 'medium' | 'high' | 'critical';
    type: string;
    description: string;
    endpoint: string;
  }>;
  summary: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

function App() {
  const [report, setReport] = useState<ScanReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [appName, setAppName] = useState('REST Assured');

  const getHeadingClass = (name: string) => {
    switch(name) {
      case 'REST Assured': return 'title-heading rest-assured';
      case 'SecureFlow': return 'title-heading secureflow';
      case 'Endpoint Sentinels': return 'title-heading endpoint-sentinels';
      case 'Digital Defenders': return 'title-heading digital-defenders';
      default: return 'title-heading';
    }
  };

  const handleScan = async (url: string, apiSpec: string) => {
    setLoading(true);
    try {
      const mockReport: ScanReport = {
        url,
        timestamp: new Date().toISOString(),
        vulnerabilities: [
          {
            severity: 'high',
            type: 'SQL Injection',
            description: 'Potential SQL injection vulnerability detected in user input handling',
            endpoint: '/api/users/{id}'
          },
          {
            severity: 'medium',
            type: 'Authentication Bypass',
            description: 'Missing authentication check on sensitive endpoint',
            endpoint: '/api/admin/settings'
          },
          {
            severity: 'low',
            type: 'Information Disclosure',
            description: 'Server version information exposed in headers',
            endpoint: '/api/health'
          }
        ],
        summary: {
          total: 3,
          critical: 0,
          high: 1,
          medium: 1,
          low: 1
        }
      };
      
      setTimeout(() => {
        setReport(mockReport);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Scan failed:', error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className={getHeadingClass(appName)}>{appName}</h1>
            <select 
              className="app-name-selector"
              value={appName} 
              onChange={(e) => setAppName(e.target.value)}
            >
              <option value="REST Assured">REST Assured</option>
              <option value="SecureFlow">SecureFlow</option>
              <option value="Endpoint Sentinels">Endpoint Sentinels</option>
              <option value="Digital Defenders">Digital Defenders</option>
            </select>
          </div>
          <p>Analyze your API for security vulnerabilities</p>
        </div>
      </header>
      <main className="App-main">
        <ApiScanner onScan={handleScan} loading={loading} />
        {report && <Report report={report} />}
      </main>
    </div>
  );
}

export default App;
