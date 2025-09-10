import React, { useState } from 'react';
import './ApiScanner.css';

interface ApiScannerProps {
  onScan: (url: string, apiSpec: string) => void;
  loading: boolean;
}

const ApiScanner: React.FC<ApiScannerProps> = ({ onScan, loading }) => {
  const [url, setUrl] = useState('');
  const [apiSpec, setApiSpec] = useState('');
  const [specFile, setSpecFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSpecFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setApiSpec(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (url && apiSpec) {
      onScan(url, apiSpec);
    }
  };

  return (
    <div className="api-scanner">
      <div className="scanner-card">
        <h2>Configure API Scan</h2>
        <form onSubmit={handleSubmit} className="scanner-form">
          <div className="form-group">
            <label htmlFor="api-url">API Base URL</label>
            <input
              id="api-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="api-spec">API Specification</label>
            <div className="spec-input-group">
              <textarea
                id="api-spec"
                value={apiSpec}
                onChange={(e) => setApiSpec(e.target.value)}
                placeholder="Paste your OpenAPI/Swagger specification here..."
                rows={8}
                disabled={loading}
              />
              <div className="file-upload-section">
                <span>or</span>
                <label htmlFor="spec-file" className="file-upload-label">
                  Upload Spec File
                  <input
                    id="spec-file"
                    type="file"
                    accept=".json,.yaml,.yml"
                    onChange={handleFileUpload}
                    disabled={loading}
                  />
                </label>
                {specFile && (
                  <span className="file-name">{specFile.name}</span>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`scan-button ${loading ? 'loading' : ''}`}
            disabled={!url || !apiSpec || loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Scanning...
              </>
            ) : (
              'Start Security Scan'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApiScanner;