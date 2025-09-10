import React from 'react';
import './Report.css';

interface Vulnerability {
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  description: string;
  endpoint: string;
}

interface ReportSummary {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

interface ReportProps {
  report: {
    url: string;
    timestamp: string;
    vulnerabilities: Vulnerability[];
    summary: ReportSummary;
  };
}

const Report: React.FC<ReportProps> = ({ report }) => {
  const getSeverityClass = (severity: string) => {
    return `severity-${severity}`;
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const downloadReport = () => {
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `api-security-report-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="report">
      <div className="report-header">
        <h2>Security Scan Report</h2>
        <div className="report-meta">
          <div className="meta-item">
            <strong>Target URL:</strong> {report.url}
          </div>
          <div className="meta-item">
            <strong>Scan Date:</strong> {formatTimestamp(report.timestamp)}
          </div>
          <button onClick={downloadReport} className="download-btn">
            Download Report
          </button>
        </div>
      </div>

      <div className="report-summary">
        <h3>Summary</h3>
        <div className="summary-grid">
          <div className="summary-item total">
            <div className="summary-number">{report.summary.total}</div>
            <div className="summary-label">Total Issues</div>
          </div>
          <div className="summary-item critical">
            <div className="summary-number">{report.summary.critical}</div>
            <div className="summary-label">Critical</div>
          </div>
          <div className="summary-item high">
            <div className="summary-number">{report.summary.high}</div>
            <div className="summary-label">High</div>
          </div>
          <div className="summary-item medium">
            <div className="summary-number">{report.summary.medium}</div>
            <div className="summary-label">Medium</div>
          </div>
          <div className="summary-item low">
            <div className="summary-number">{report.summary.low}</div>
            <div className="summary-label">Low</div>
          </div>
        </div>
      </div>

      <div className="vulnerabilities">
        <h3>Vulnerabilities Details</h3>
        {report.vulnerabilities.length === 0 ? (
          <div className="no-vulnerabilities">
            <div className="success-icon">✅</div>
            <p>No security vulnerabilities found!</p>
          </div>
        ) : (
          <div className="vulnerabilities-list">
            {report.vulnerabilities.map((vuln, index) => (
              <div key={index} className={`vulnerability-item ${getSeverityClass(vuln.severity)}`}>
                <div className="vulnerability-header">
                  <span className={`severity-badge ${getSeverityClass(vuln.severity)}`}>
                    {vuln.severity.toUpperCase()}
                  </span>
                  <h4>{vuln.type}</h4>
                  <span className="endpoint">{vuln.endpoint}</span>
                </div>
                <p className="vulnerability-description">{vuln.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;