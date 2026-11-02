import React, { useState } from 'react';
import { Terminal, Laptop, Globe, Sparkles, CheckCircle2, ChevronRight, Copy, Check } from 'lucide-react';

export const HowToRunGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'vscode' | 'idle' | 'colab'>('terminal');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">Como Executar a Calculadora no Seu Computador</h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          Para quem está começando agora, executar o primeiro programa Python é uma sensação incrível. Escolha o ambiente que você mais gosta abaixo e siga o passo a passo:
        </p>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all text-xs font-semibold ${
              activeTab === 'terminal'
                ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-xs'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <Terminal className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Terminal / CMD</span>
          </button>

          <button
            onClick={() => setActiveTab('vscode')}
            className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all text-xs font-semibold ${
              activeTab === 'vscode'
                ? 'border-blue-600 bg-blue-50/50 text-blue-950 shadow-xs'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <Laptop className="w-4 h-4 text-blue-600 shrink-0" />
            <span>VS Code</span>
          </button>

          <button
            onClick={() => setActiveTab('idle')}
            className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all text-xs font-semibold ${
              activeTab === 'idle'
                ? 'border-amber-600 bg-amber-50/50 text-amber-950 shadow-xs'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Python IDLE</span>
          </button>

          <button
            onClick={() => setActiveTab('colab')}
            className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all text-xs font-semibold ${
              activeTab === 'colab'
                ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 shadow-xs'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Google Colab (Web)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          {activeTab === 'terminal' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-slate-900">Salve o arquivo</h4>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Baixe o arquivo pelo botão <strong>Baixar .py</strong> no topo da página ou crie um arquivo chamado <code>calculadora.py</code> e cole o código dentro.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-slate-900">Abra o Terminal ou Prompt de Comando</h4>
                  <p className="text-slate-600 text-xs mt-0.5">
                    No Windows, aperte <code>Win + R</code>, digite <code>cmd</code> e tecle Enter. No Mac ou Linux, abra o aplicativo <code>Terminal</code>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <div className="w-full">
                  <h4 className="font-bold text-slate-900">Navegue até a pasta e execute</h4>
                  <p className="text-slate-600 text-xs mt-0.5 mb-2">
                    Execute o comando abaixo para iniciar a sua calculadora:
                  </p>
                  <div className="flex items-center justify-between p-2.5 bg-slate-950 text-emerald-400 font-mono text-xs rounded-lg border border-slate-800">
                    <span>python calculadora.py</span>
                    <button
                      onClick={() => copyCommand('python calculadora.py')}
                      className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded"
                    >
                      {copiedCmd === 'python calculadora.py' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    (Se o comando <code>python</code> não funcionar no Linux/Mac, tente <code>python3 calculadora.py</code>)
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vscode' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <h4 className="font-bold text-slate-900">Abra o VS Code</h4>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Crie um novo arquivo com o nome <code>calculadora.py</code> e certifique-se de que a extensão oficial de Python da Microsoft está instalada.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <h4 className="font-bold text-slate-900">Cole o código</h4>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Cole o código gerado nesta página e salve com <code>Ctrl + S</code> (ou <code>Cmd + S</code> no Mac).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <h4 className="font-bold text-slate-900">Clique no botão Play ▶️</h4>
                  <p className="text-slate-600 text-xs mt-0.5">
                    No canto superior direito do VS Code, clique no botão triangular de Play (Executar arquivo Python). O terminal abrirá embaixo para você digitar a operação!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'idle' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <h4 className="font-bold text-slate-900">Abra o IDLE</h4>
                  <p className="text-slate-600 text-xs mt-0.5">
                    O IDLE é o editor que já vem instalado junto com o instalador oficial do Python no Windows e Mac. Procure por "IDLE" no menu Iniciar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <h4 className="font-bold text-slate-900">File &gt; New File</h4>
                  <p className="text-slate-600 text-xs mt-0.5">
                    No menu superior, vá em <code>File &gt; New File</code>, cole o código da calculadora e salve como <code>calculadora.py</code>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <h4 className="font-bold text-slate-900">Aperte F5</h4>
                  <p className="text-slate-600 text-xs mt-0.5">
                    No teclado, pressione a tecla <code>F5</code> (ou vá em <code>Run &gt; Run Module</code>). A tela do Python Shell abrirá e pedirá os números!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'colab' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <h4 className="font-bold text-slate-900">Acesse o Google Colab</h4>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Abra <a href="https://colab.research.google.com" target="_blank" rel="noreferrer" className="text-emerald-700 underline font-medium">colab.research.google.com</a> no seu navegador (não precisa instalar nada no computador).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <h4 className="font-bold text-slate-900">Crie um Novo Bloco de Notas</h4>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Clique em "Novo Bloco de Notas", cole o código da calculadora na primeira célula de código e clique no botão circular de Play (ou aperte Shift + Enter).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Challenges Section for Beginners */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h4 className="font-bold text-base text-amber-300">Desafios para Você Praticar e Evoluir</h4>
        </div>
        <p className="text-xs text-slate-300 mb-5 leading-relaxed">
          Agora que você entendeu o funcionamento básico, tente adicionar estas melhorias no código para fixar o aprendizado:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-lg text-xs">
            <span className="font-bold text-amber-300 block mb-1">Desafio 1: Potenciação</span>
            <p className="text-slate-300 leading-relaxed">
              Crie a função <code>def potencia(a, b): return a ** b</code> e adicione a opção <code>5 - Potência</code> no menu principal.
            </p>
          </div>

          <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-lg text-xs">
            <span className="font-bold text-amber-300 block mb-1">Desafio 2: Resto da Divisão</span>
            <p className="text-slate-300 leading-relaxed">
              Use o operador <code>%</code> (módulo) para descobrir se o resto da divisão de um número pelo outro é zero (útil para saber se um número é par ou ímpar).
            </p>
          </div>

          <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-lg text-xs">
            <span className="font-bold text-amber-300 block mb-1">Desafio 3: Blindagem com try/except</span>
            <p className="text-slate-300 leading-relaxed">
              Veja a "Versão 2" do código na aba acima para aprender como o <code>try ... except ValueError</code> impede que o programa quebre se o usuário digitar letras!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
