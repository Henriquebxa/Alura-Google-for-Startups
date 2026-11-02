import React, { useState } from 'react';
import { Layers, Terminal, GitBranch, ShieldAlert, Check, ArrowRight, Lightbulb, AlertTriangle, Code } from 'lucide-react';

export const ComponentExplainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'funcoes' | 'input' | 'condicionais' | 'divisaoZero'>('funcoes');

  return (
    <div className="space-y-6">
      {/* Tab Navigation Controls */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-xl">
        <button
          onClick={() => setActiveTab('funcoes')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'funcoes'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>1. Funções (def & return)</span>
        </button>

        <button
          onClick={() => setActiveTab('input')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'input'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Terminal className="w-4 h-4 text-emerald-600" />
          <span>2. Entradas & Conversão (input & float)</span>
        </button>

        <button
          onClick={() => setActiveTab('condicionais')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'condicionais'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GitBranch className="w-4 h-4 text-blue-600" />
          <span>3. Decisões Lógicas (if, elif, else)</span>
        </button>

        <button
          onClick={() => setActiveTab('divisaoZero')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'divisaoZero'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>4. Tratamento de Divisão por Zero</span>
        </button>
      </div>

      {/* Tab 1: Funções */}
      {activeTab === 'funcoes' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <Layers className="w-4 h-4" />
              <span>Componente Central #1</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Funções Matemáticas: <code>def</code> e <code>return</code></h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Em programação, uma <strong>função</strong> é como uma receita de bolo reutilizável. Em vez de escrever a lógica de cálculo toda vez que precisar somar ou multiplicar, nós a empacotamos em um bloco com nome próprio.
            </p>
          </div>

          {/* Anatomy Diagram */}
          <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto">
            <div className="text-slate-400 mb-2 font-sans font-medium text-xs">Anatomia de uma função em Python:</div>
            <div className="leading-relaxed">
              <span className="text-purple-400 font-bold">def</span> <span className="text-amber-300 font-bold">somar</span>(<span className="text-cyan-300 font-bold">a</span>, <span className="text-cyan-300 font-bold">b</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400 italic">"""Retorna a soma de dois números."""</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400 font-bold">return</span> <span className="text-cyan-300 font-bold">a</span> + <span className="text-cyan-300 font-bold">b</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-semibold text-sm text-slate-900 block mb-1">1. Palavra reservada 'def'</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Abreviação de <em>define</em>. Avisa ao Python que você está criando uma nova ferramenta com o nome que vem a seguir.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-semibold text-sm text-slate-900 block mb-1">2. Parâmetros (a, b)</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                São os "espaços vazios" na receita. Quando chamamos <code>somar(10, 5)</code>, <code>a</code> vira 10 e <code>b</code> vira 5.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-semibold text-sm text-slate-900 block mb-1">3. Comando 'return'</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Devolve a resposta. Sem o <code>return</code>, a função realizaria o cálculo na memória mas não devolveria o valor para a calculadora.
              </p>
            </div>
          </div>

          <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-lg flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-950">
              <strong className="font-semibold block mb-1">Por que não fazer tudo num código só sem funções?</strong>
              <p className="leading-relaxed">
                Separar em funções isoladas segue o princípio da <em>modularidade</em>: seu código fica limpo, legível, fácil de testar individualmente e fácil de expandir (por exemplo, adicionar depois potência ou porcentagem sem quebrar o resto do programa).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Entrada e Conversão */}
      {activeTab === 'input' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs tracking-wider uppercase">
              <Terminal className="w-4 h-4" />
              <span>Componente Central #2</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Entrada do Usuário e Conversão de Tipos: <code>input()</code> e <code>float()</code></h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Como o Python interage com o teclado do usuário e por que a conversão de tipos é o passo mais crucial para uma calculadora.
            </p>
          </div>

          {/* The Classic Beginner Trap */}
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              A Maior Pegadinha dos Iniciantes em Python: Texto vs Número
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-white p-3 rounded border border-rose-200">
                <div className="text-rose-700 font-bold mb-1">SEM float() [ERRADO]:</div>
                <div className="text-slate-800">
                  num1 = input("Digite: ")  # usuário digita 5<br />
                  num2 = input("Digite: ")  # usuário digita 5<br />
                  print(num1 + num2)<br />
                  <span className="text-rose-600 font-bold">Saída: "55" (juntou textos!)</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded border border-emerald-200">
                <div className="text-emerald-700 font-bold mb-1">COM float() [CORRETO]:</div>
                <div className="text-slate-800">
                  num1 = float(input("Digite: "))  # 5.0<br />
                  num2 = float(input("Digite: "))  # 5.0<br />
                  print(num1 + num2)<br />
                  <span className="text-emerald-600 font-bold">Saída: 10.0 (somou matematicamente!)</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-rose-900 mt-3 font-sans leading-relaxed">
              A função <code>input()</code> sempre devolve o que o usuário digita no formato <strong>string</strong> (texto puro). Por isso, precisamos envolver o <code>input()</code> dentro de <code>float()</code> para transformar aquele texto em um valor numérico real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-slate-900 mb-1">Por que usamos <code>float()</code> e não <code>int()</code>?</h4>
              <p className="text-slate-600 leading-relaxed">
                <code>int()</code> aceita apenas números inteiros (como 1, 2, 50). Se o usuário digitasse <code>3.5</code> ou <code>10.25</code>, o programa travaria! Já o <code>float()</code> aceita tanto números inteiros quanto com casas decimais.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-slate-900 mb-1">Por que a opção da operação permanece como texto?</h4>
              <p className="text-slate-600 leading-relaxed">
                A variável <code>opcao = input(...)</code> não participa de contas matemáticas! Ela serve apenas de rótulo para saber se o usuário quer <code>'1'</code>, <code>'2'</code>, <code>'3'</code> ou <code>'4'</code>. Mantê-la como texto evita erros se o usuário digitar letras acidentalmente.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Estruturas Condicionais */}
      {activeTab === 'condicionais' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs tracking-wider uppercase">
              <GitBranch className="w-4 h-4" />
              <span>Componente Central #3</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Estruturas Condicionais: <code>if</code>, <code>elif</code> e <code>else</code></h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              O computador não adivinha o que o usuário quer. Ele analisa condições lógicas do tipo verdadeiro/falso (booleano) para escolher qual caminho seguir.
            </p>
          </div>

          {/* Conditional Flow Illustration */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold font-sans">
              Fluxo de Decisão Sequencial:
            </div>
            <div className="space-y-2">
              <div className="p-2.5 bg-white border-l-4 border-l-indigo-500 rounded border border-slate-200">
                <span className="text-purple-600 font-bold">if opcao == '1':</span>
                <span className="text-slate-600 font-sans ml-2">&rarr; É adição? Se sim, calcula somar(a, b) e ignora os blocos abaixo.</span>
              </div>
              <div className="p-2.5 bg-white border-l-4 border-l-blue-500 rounded border border-slate-200">
                <span className="text-purple-600 font-bold">elif opcao == '2':</span>
                <span className="text-slate-600 font-sans ml-2">&rarr; Se não foi 1, é subtração? Se sim, calcula subtrair(a, b).</span>
              </div>
              <div className="p-2.5 bg-white border-l-4 border-l-teal-500 rounded border border-slate-200">
                <span className="text-purple-600 font-bold">elif opcao == '3':</span>
                <span className="text-slate-600 font-sans ml-2">&rarr; Se não foi nem 1 nem 2, é multiplicação? Calcula multiplicar(a, b).</span>
              </div>
              <div className="p-2.5 bg-white border-l-4 border-l-amber-500 rounded border border-slate-200">
                <span className="text-purple-600 font-bold">elif opcao == '4':</span>
                <span className="text-slate-600 font-sans ml-2">&rarr; Se não foi nenhuma anterior, é divisão? Executa dividir(a, b).</span>
              </div>
              <div className="p-2.5 bg-white border-l-4 border-l-rose-500 rounded border border-slate-200">
                <span className="text-purple-600 font-bold">else:</span>
                <span className="text-slate-600 font-sans ml-2">&rarr; O usuário digitou '9', 'x', etc. Mostra "Opção inválida!".</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-lg">
              <span className="font-bold text-blue-950 block mb-1">Atenção ao operador de igualdade (==)</span>
              <p className="text-blue-900/80 leading-relaxed">
                Um único igual (<code>=</code>) serve para <strong>guardar um valor</strong> em uma variável (ex: <code>x = 10</code>). Dois iguais juntos (<code>==</code>) servem para <strong>comparar</strong> se dois valores são idênticos (ex: <code>opcao == '1'</code>).
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900 block mb-1">Por que 'elif' em vez de vários 'if'?</span>
              <p className="text-slate-600 leading-relaxed">
                <code>elif</code> é uma contração de "else if". Ele garante que assim que uma opção for verdadeira, o Python pula todas as outras verificações, economizando tempo e evitando execuções redundantes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Tratamento de Divisão por Zero */}
      {activeTab === 'divisaoZero' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-amber-600 font-semibold text-xs tracking-wider uppercase">
              <ShieldAlert className="w-4 h-4" />
              <span>Componente Central #4</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Tratamento de Exceções: Divisão por Zero</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Na matemática, a divisão por zero é uma indefinição. Em computação, se você pedir para o processador calcular <code>10 / 0</code>, o programa trava imediatamente. Veja como prevenimos isso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Without handling */}
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Sem Tratamento (O que acontece por padrão)
              </div>
              <div className="bg-slate-900 p-3 rounded font-mono text-[11px] text-rose-300 overflow-x-auto whitespace-pre">
                {`>>> 10 / 0
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ZeroDivisionError: division by zero`}
              </div>
              <p className="text-xs text-rose-900/90 leading-relaxed">
                O programa fecha na cara do usuário, gerando uma mensagem assustadora em inglês com traceback.
              </p>
            </div>

            {/* With our code's handling */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wide">
                <Check className="w-4 h-4 text-emerald-600" />
                Com a Nossa Validação Preventiva
              </div>
              <div className="bg-slate-900 p-3 rounded font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre">
                {`def dividir(a, b):
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b`}
              </div>
              <p className="text-xs text-emerald-900/90 leading-relaxed">
                O <code>if b == 0</code> inspeciona o divisor antes da conta acontecer. O programa não quebra e o usuário recebe uma orientação clara em português.
              </p>
            </div>
          </div>

          {/* Golden Rule Callout */}
          <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs">
            <span className="text-amber-400 font-bold block mb-1 font-sans">A Regra de Ouro do Programador:</span>
            <p className="font-sans leading-relaxed text-slate-300">
              "Nunca confie cegamente na entrada do usuário. Sempre antecipe possíveis falhas lógicas e trate-as antes que o interpretador precise abortar o seu software."
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
