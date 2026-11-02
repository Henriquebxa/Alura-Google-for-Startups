import React, { useState } from 'react';
import { Copy, Check, Download, Info, CheckCircle2, FileCode } from 'lucide-react';
import { BASIC_PYTHON_CODE, ADVANCED_PYTHON_CODE, CODE_ANNOTATIONS, CodeAnnotation } from '../data/pythonCode';

export const CodeViewer: React.FC = () => {
  const [version, setVersion] = useState<'basic' | 'advanced'>('basic');
  const [copied, setCopied] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState<CodeAnnotation | null>(CODE_ANNOTATIONS[0]);

  const currentCode = version === 'basic' ? BASIC_PYTHON_CODE : ADVANCED_PYTHON_CODE;
  const lines = currentCode.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = version === 'basic' ? 'calculadora_simples.py' : 'calculadora_continua.py';
    const blob = new Blob([currentCode], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with version switcher and action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
            <FileCode className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Código Python Limpo e Comentado</h3>
            <p className="text-xs text-slate-500">Pronto para copiar, salvar e rodar em qualquer computador</p>
          </div>
        </div>

        {/* Segmented Controller & Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs">
            <button
              onClick={() => setVersion('basic')}
              className={`px-3 py-1.5 font-medium rounded-md transition-all ${
                version === 'basic'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Versão 1: Essencial (Didática)
            </button>
            <button
              onClick={() => setVersion('advanced')}
              className={`px-3 py-1.5 font-medium rounded-md transition-all ${
                version === 'advanced'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Versão 2: Loop & Tratamento Robusto
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Baixar .py</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Code display on left, interactive explanation cards on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Code Block with line numbers */}
        <div className="lg:col-span-8 bg-slate-950 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
            <span>{version === 'basic' ? 'calculadora_simples.py' : 'calculadora_continua.py'}</span>
            <span className="text-[11px] text-slate-500">Python 3 UTF-8</span>
          </div>

          <div className="p-4 overflow-x-auto max-h-[640px] font-mono text-xs sm:text-sm leading-relaxed">
            <table className="w-full border-collapse">
              <tbody>
                {lines.map((lineText, idx) => {
                  const lineNum = idx + 1;
                  const annotation = CODE_ANNOTATIONS.find((a) => a.line === lineNum && version === 'basic');
                  const isComment = lineText.trim().startsWith('#');
                  const isString = lineText.includes('"""') || (lineText.includes('"') && !lineText.includes('def '));
                  const isKeyword = /\b(def|return|if|elif|else|while|break|continue|try|except|in|is|not)\b/.test(lineText);

                  return (
                    <tr
                      key={lineNum}
                      onClick={() => annotation && setActiveAnnotation(annotation)}
                      className={`group cursor-pointer transition-colors ${
                        annotation ? 'hover:bg-amber-500/10' : 'hover:bg-slate-900/60'
                      } ${activeAnnotation?.line === lineNum ? 'bg-amber-500/15' : ''}`}
                    >
                      {/* Line Number */}
                      <td className="w-10 text-right pr-4 select-none text-slate-600 group-hover:text-slate-400 font-mono text-xs">
                        {lineNum}
                      </td>

                      {/* Code Content */}
                      <td className="whitespace-pre">
                        <span
                          className={
                            isComment
                              ? 'text-slate-500 italic'
                              : lineText.trim().startsWith('"""')
                              ? 'text-emerald-400 italic'
                              : isKeyword
                              ? 'text-purple-400'
                              : 'text-slate-200'
                          }
                        >
                          {lineText}
                        </span>
                      </td>

                      {/* Line Annotation Badge */}
                      <td className="w-8 pl-2 text-right">
                        {annotation && (
                          <span
                            className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"
                            title={`Linha ${lineNum}: ${annotation.title}`}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Code Insights Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="p-1.5 bg-amber-50 text-amber-700 rounded-lg">
                <Info className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Guia de Leitura do Código</h4>
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Clique em qualquer linha marcada com um ponto âmbar no código para ver uma explicação didática do que o Python está fazendo.
            </p>

            {activeAnnotation && (
              <div className="mt-4 p-4 rounded-lg bg-amber-50/60 border border-amber-200 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-amber-900">Linha {activeAnnotation.line}: {activeAnnotation.title}</span>
                  <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-200/60 px-1.5 py-0.5 rounded">
                    {activeAnnotation.category}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">{activeAnnotation.explanation}</p>
              </div>
            )}

            {/* Quick Index of Annotations */}
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
              <span className="text-xs font-semibold text-slate-700 block">Destaques Importantes:</span>
              {CODE_ANNOTATIONS.slice(0, 5).map((a) => (
                <button
                  key={a.line}
                  onClick={() => setActiveAnnotation(a)}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                    activeAnnotation?.line === a.line
                      ? 'bg-amber-100 text-amber-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">L{a.line}: {a.title}</span>
                  <span className="text-[10px] text-slate-400 ml-1 shrink-0">Ver</span>
                </button>
              ))}
            </div>
          </div>

          {/* Clean Coding Practices Card */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-xs">
            <h5 className="font-bold text-emerald-950 flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Boas Práticas Aplicadas neste Código
            </h5>
            <ul className="space-y-1.5 text-emerald-900/90 leading-relaxed">
              <li>• <strong>Nomes Intuitivos</strong>: Funções como <code>somar</code> e <code>dividir</code> deixam a leitura clara como português comum.</li>
              <li>• <strong>Princípio da Responsabilidade Única</strong>: Cada função só faz uma operação matemática específica.</li>
              <li>• <strong>Prevenção de Falhas</strong>: Tratamento imediato de divisão por zero antes que ocorra erro fatal.</li>
              <li>• <strong>Docstrings</strong>: Textos entre <code>"""</code> explicam o propósito de cada função.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
