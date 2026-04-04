'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, Camera, FileText, Folder, Search, Loader2, AlertTriangle, CheckCircle, Image } from 'lucide-react';

interface DocFile {
  id: string; name: string; size: number; type: string; uploadedAt: string;
  documentType: string; confidence: number; suggestedFolder: string;
  extractedInfo: { propertyAddress: string | null; amounts: string[]; dates: string[]; borrowerName: string | null };
  clientId: string; isCamera: boolean;
}

export default function VaultPage() {
  const [docs, setDocs] = useState<DocFile[]>([]);
  const [clients] = useState([
    { id: 'c1', name: 'Marcus Johnson — Bridge Loan' },
    { id: 'c2', name: 'Sandra Chen — Cash-Out Refi' },
    { id: 'c3', name: 'Robert Petrosyan — Rehab Loan' },
    { id: 'c4', name: 'David Orozco — Construction' },
    { id: 'c5', name: 'Lisa Park — HELOC' },
  ]);
  const [selectedClient, setSelectedClient] = useState('c1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingName, setProcessingName] = useState('');
  const [search, setSearch] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('pcg_vault_docs');
    if (saved) setDocs(JSON.parse(saved));
  }, []);

  const saveDocs = (newDocs: DocFile[]) => {
    setDocs(newDocs);
    localStorage.setItem('pcg_vault_docs', JSON.stringify(newDocs));
  };

  const classifyFile = async (file: File, isCamera: boolean) => {
    setIsProcessing(true);
    setProcessingName(file.name);

    let contentPreview = file.name;
    if (file.type.includes('text') || file.type.includes('pdf')) {
      try { contentPreview = (await file.text()).substring(0, 500); } catch {}
    }

    try {
      const res = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, contentPreview })
      });
      const classification = await res.json();

      const newDoc: DocFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2),
        name: file.name, size: file.size, type: file.type,
        uploadedAt: new Date().toISOString(),
        documentType: classification.documentType || 'Other',
        confidence: classification.confidence || 0.5,
        suggestedFolder: classification.suggestedFolder || 'Unclassified',
        extractedInfo: classification.extractedInfo || { propertyAddress: null, amounts: [], dates: [], borrowerName: null },
        clientId: selectedClient, isCamera
      };

      saveDocs([newDoc, ...docs]);
    } catch {
      const newDoc: DocFile = {
        id: Date.now().toString(), name: file.name, size: file.size, type: file.type,
        uploadedAt: new Date().toISOString(), documentType: 'Other', confidence: 0.3,
        suggestedFolder: 'Unclassified', extractedInfo: { propertyAddress: null, amounts: [], dates: [], borrowerName: null },
        clientId: selectedClient, isCamera
      };
      saveDocs([newDoc, ...docs]);
    }

    setIsProcessing(false);
    setProcessingName('');
  };

  const handleFileUpload = (file: File) => { if (file) classifyFile(file, false); };
  const handleFiles = (files: FileList | null) => { if (files) Array.from(files).forEach(f => handleFileUpload(f)); };

  const openCamera = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files?.[0]) classifyFile(target.files[0], true);
    };
    input.click();
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [docs, selectedClient]);

  const clientDocs = docs.filter(d => d.clientId === selectedClient);
  const folders = Array.from(new Set(clientDocs.map(d => d.suggestedFolder)));
  const filtered = search ? clientDocs.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.documentType.toLowerCase().includes(search.toLowerCase())) : clientDocs;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a1a1a] font-['Playfair_Display']">Document Vault</h1>
        <div className="flex items-center gap-2 text-sm text-[#3d9b3d] font-semibold"><CheckCircle className="w-4 h-4" /> AI-Powered Classification</div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9b3d]">
          {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9b3d]" />
        </div>
      </div>

      {/* Upload Zone */}
      <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragOver ? 'border-[#3d9b3d] bg-green-50' : 'border-gray-300 bg-[#f7f7f7]'}`}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={onDrop}>
        {isProcessing ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-[#3d9b3d] animate-spin" />
            <p className="text-sm font-semibold text-[#2d7a2d]">PCG AI is organizing your document...</p>
            <p className="text-xs text-gray-500">{processingName}</p>
          </div>
        ) : (
          <>
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-700 mb-1">Drag & drop files here</p>
            <p className="text-xs text-gray-500 mb-4">PDF, JPG, PNG, DOCX — AI will classify automatically</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-[#3d9b3d] text-white rounded-lg text-sm font-semibold hover:bg-[#2d7a2d] flex items-center gap-2">
                <Upload className="w-4 h-4" /> Upload File
              </button>
              <button onClick={openCamera}
                className="px-4 py-2 bg-[#1a1a1a] text-white rounded-lg text-sm font-semibold hover:bg-gray-800 flex items-center gap-2">
                <Camera className="w-4 h-4" /> Take Photo
              </button>
            </div>
            <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.docx"
              multiple onChange={e => handleFiles(e.target.files)} />
          </>
        )}
      </div>

      {/* Folders */}
      {folders.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {folders.map(folder => (
            <div key={folder} className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-100 shadow-sm">
              <Folder className="w-4 h-4 text-[#3d9b3d]" />
              <span className="text-xs font-semibold text-gray-700 truncate">{folder}</span>
              <span className="text-xs text-gray-400 ml-auto">{clientDocs.filter(d => d.suggestedFolder === folder).length}</span>
            </div>
          ))}
        </div>
      )}

      {/* Documents */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No documents yet. Upload files or take a photo to get started.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(doc => (
            <div key={doc.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#f7f7f7] flex items-center justify-center flex-shrink-0">
                {doc.isCamera ? <Camera className="w-5 h-5 text-[#2d7a2d]" /> : doc.type.includes('image') ? <Image className="w-5 h-5 text-blue-500" /> : <FileText className="w-5 h-5 text-gray-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-[#1a1a1a] truncate">{doc.name}</p>
                  {doc.isCamera && <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded font-semibold">📷 Camera</span>}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] px-2 py-0.5 bg-[#3d9b3d] text-white rounded-full font-semibold">AI: {doc.documentType}</span>
                  <span className="text-[10px] text-gray-400">{doc.suggestedFolder}</span>
                  {doc.extractedInfo?.propertyAddress && <span className="text-[10px] text-gray-500">📍 {doc.extractedInfo.propertyAddress}</span>}
                  {doc.extractedInfo?.amounts?.length > 0 && <span className="text-[10px] text-gray-500">💰 {doc.extractedInfo.amounts.join(', ')}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {doc.confidence < 0.6 && <span className="text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-semibold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Review Needed</span>}
                <span className="text-[10px] text-gray-400">{(doc.size / 1024).toFixed(0)} KB</span>
                <span className="text-[10px] text-gray-400">{new Date(doc.uploadedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
