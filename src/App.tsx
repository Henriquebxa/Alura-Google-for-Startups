import React, { useState } from 'react';
import {
  Calculator as CalculatorIcon,
  Terminal,
  Code2,
  BookOpen,
  FileText,
  Download,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { GuiCalculator } from './components/GuiCalculator';
import { TerminalSimulator } from './components/TerminalSimulator';
import { CodeViewer } from './components/CodeViewer';
import { ComponentExplainer } from './components/ComponentExplainer';
import { HowToRunGuide } from './components/HowToRunGuide';
import { BASIC_PYTHON_CODE } from './data/pythonCode';

type MainAppMode = 'gui' | 'terminal';
type ProgrammerSubTab = 'terminal' | 'code' | 'concepts' | 'guide';

export default function App() {
  const [appMode, setAppMode] = useState<MainAppMode>('gui');
  const [progTab, setProgTab] = useState<ProgrammerSubTab>('terminal');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(BASIC_PYTHON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([BASIC_PYTHON_CODE], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculadora.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-blue-100">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-xs">
              {appMode === 'gui' ? (
                <CalculatorIcon className="w-5 h-5 text-blue-400" />
              ) : (
                <span className="font-mono font-bold text-amber-400 text-sm">py</span>
              )}
            </div>
            <div>
              <h1 className="font-extrabold text-base sm:text-lg text-slate-950 tracking-tight leading-tight">
                {appMode === 'gui' ? 'Calculadora' : 'Calculadora Python Didática'}
              </h1>
              <p className="text-xs text-slate-500">
                {appMode === 'gui'
                  ? 'Interface Gráfica Limpa com Histórico'
                  : 'Modo Terminal com Lógica de Programação'}
              </p>
            </div>
          </div>

          {/* TWO CLEAR MODES SWITCHER (O Seletor Central Obrigatório) */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold self-start sm:self-auto shadow-inner border border-slate-200/60">
            <button
              onClick={() => setAppMode('gui')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
                appMode === 'gui'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CalculatorIcon className="w-4 h-4" />
              <span>Usuário Comum (Gráfica)</span>
            </button>

            <button
              onClick={() => setAppMode('terminal')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
                appMode === 'terminal'
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Programador (Terminal)</span>
            </button>
          </div>
        </div>

        {/* Sub-navigation visible ONLY when in Programmer Mode */}
        {appMode === 'terminal' && (
          <div className="bg-slate-50 border-t border-slate-200/80">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between overflow-x-auto py-1.5 text-xs font-medium">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setProgTab('terminal')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    progTab === 'terminal'
                      ? 'bg-white text-slate-900 shadow-xs font-bold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Terminal Didático</span>
                </button>

                <button
                  onClick={() => setProgTab('code')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    progTab === 'code'
                      ? 'bg-white text-slate-900 shadow-xs font-bold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Código Python (.py)</span>
                </button>

                <button
                  onClick={() => setProgTab('concepts')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    progTab === 'concepts'
                      ? 'bg-white text-slate-900 shadow-xs font-bold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>Conceitos de Código</span>
                </button>

                <button
                  onClick={() => setProgTab('guide')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    progTab === 'guide'
                      ? 'bg-white text-slate-900 shadow-xs font-bold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-rose-600" />
                  <span>Como Rodar no PC</span>
                </button>
              </div>

              {/* Quick actions for programmer code */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded text-[11px] font-medium transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 text-white hover:bg-slate-800 rounded text-[11px] font-medium transition-colors shadow-2xs"
                >
                  <Download className="w-3 h-3 text-slate-300" />
                  <span>Baixar .py</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* MODO 1: USUÁRIO COMUM (INTERFACE GRÁFICA / GUI) */}
        {appMode === 'gui' && (
          <div className="space-y-6">
            <GuiCalculator />
          </div>
        )}

        {/* MODO 2: PROGRAMADOR (TERMINAL DIDÁTICO & CÓDIGO) */}
        {appMode === 'terminal' && (
          <div className="space-y-6">
            {progTab === 'terminal' && <TerminalSimulator />}
            {progTab === 'code' && <CodeViewer />}
            {progTab === 'concepts' && <ComponentExplainer />}
            {progTab === 'guide' && <HowToRunGuide />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-500 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <span>
            {appMode === 'gui'
              ? 'Calculadora Gráfica com armazenamento local (localStorage) e 4 operações básicas.'
              : 'Ambiente Didático Python 3: Funções, Input, Casting, Condicionais e Tratamento de Exceções.'}
          </span>
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span>Adição (+)</span>
            <span>·</span>
            <span>Subtração (−)</span>
            <span>·</span>
            <span>Multiplicação (×)</span>
            <span>·</span>
            <span>Divisão (÷)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
