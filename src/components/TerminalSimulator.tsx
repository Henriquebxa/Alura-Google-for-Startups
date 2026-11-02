import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  RotateCcw,
  CornerDownLeft,
  Code2,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Info,
} from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'system' | 'output' | 'input' | 'error' | 'success' | 'highlight';
  text: string;
}

type SimulationStep = 'OPTION' | 'NUM1' | 'NUM2' | 'COMPLETE';

interface CodeExplanation {
  stepName: string;
  codeSnippet: string;
  explanation: string;
  isWarning?: boolean;
}

export const TerminalSimulator: React.FC = () => {
  // Terminal history lines
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: 'Python 3.12.2 · Ambiente Interativo de Aprendizado' },
    { id: '2', type: 'system', text: '$ python calculadora.py' },
    { id: '3', type: 'output', text: '========================================' },
    { id: '4', type: 'output', text: '      BEM-VINDO À CALCULADORA PYTHON    ' },
    { id: '5', type: 'output', text: '========================================' },
    { id: '6', type: 'output', text: 'Selecione a operação desejada:' },
    { id: '7', type: 'output', text: '1 - Adição (+)' },
    { id: '8', type: 'output', text: '2 - Subtração (-)' },
    { id: '9', type: 'output', text: '3 - Multiplicação (*)' },
    { id: '10', type: 'output', text: '4 - Divisão (/)' },
    { id: '11', type: 'output', text: '========================================' },
  ]);

  const [step, setStep] = useState<SimulationStep>('OPTION');
  const [selectedOp, setSelectedOp] = useState<string>('');
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [currentInput, setCurrentInput] = useState<string>('');

  // Active Code Reasoning
  const [currentDevLogic, setCurrentDevLogic] = useState<CodeExplanation>({
    stepName: '1. Leitura da Opção via input()',
    codeSnippet: 'opcao = input("Digite o número da operação (1/2/3/4): ")',
    explanation:
      'A função input() congela o interpretador e aguarda a digitação. O Python lê a entrada do teclado e a retorna como uma cadeia de texto (tipo str).',
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, step]);

  const resetCalculator = () => {
    setLines([
      { id: Date.now().toString() + '-1', type: 'system', text: 'Python 3.12.2 · Ambiente Interativo de Aprendizado' },
      { id: Date.now().toString() + '-2', type: 'system', text: '$ python calculadora.py' },
      { id: Date.now().toString() + '-3', type: 'output', text: '========================================' },
      { id: Date.now().toString() + '-4', type: 'output', text: '      BEM-VINDO À CALCULADORA PYTHON    ' },
      { id: Date.now().toString() + '-5', type: 'output', text: '========================================' },
      { id: Date.now().toString() + '-6', type: 'output', text: 'Selecione a operação desejada:' },
      { id: Date.now().toString() + '-7', type: 'output', text: '1 - Adição (+)' },
      { id: Date.now().toString() + '-8', type: 'output', text: '2 - Subtração (-)' },
      { id: Date.now().toString() + '-9', type: 'output', text: '3 - Multiplicação (*)' },
      { id: Date.now().toString() + '-10', type: 'output', text: '4 - Divisão (/)' },
      { id: Date.now().toString() + '-11', type: 'output', text: '========================================' },
    ]);
    setStep('OPTION');
    setSelectedOp('');
    setNum1('');
    setNum2('');
    setCurrentInput('');
    setCurrentDevLogic({
      stepName: '1. Leitura da Opção via input()',
      codeSnippet: 'opcao = input("Digite o número da operação (1/2/3/4): ")',
      explanation:
        'A função input() aguarda o usuário digitar. O valor lido é guardado na variável "opcao" como texto.',
    });
    inputRef.current?.focus();
  };

  const getPromptText = () => {
    switch (step) {
      case 'OPTION':
        return 'Digite o número da operação (1/2/3/4): ';
      case 'NUM1':
        return 'Digite o primeiro número: ';
      case 'NUM2':
        return 'Digite o segundo número: ';
      case 'COMPLETE':
        return '';
    }
  };

  const processInput = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed && step !== 'COMPLETE') return;

    if (step === 'OPTION') {
      const newLine: TerminalLine = {
        id: Date.now().toString(),
        type: 'input',
        text: `Digite o número da operação (1/2/3/4): ${trimmed}`,
      };

      if (!['1', '2', '3', '4'].includes(trimmed)) {
        setLines((prev) => [
          ...prev,
          newLine,
          {
            id: Date.now().toString() + '-err',
            type: 'error',
            text: '\nOpção inválida! Por favor, escolha um número de 1 a 4.',
          },
        ]);
        setCurrentDevLogic({
          stepName: 'Validação Condicional (Bloco else:)',
          codeSnippet: `if opcao in ['1', '2', '3', '4']:\n    ...\nelse:\n    print("\\nOpção inválida!")`,
          explanation: `O valor "${trimmed}" não pertence à lista de opções aceitas. O Python saltou para o bloco "else" e exibiu a mensagem de aviso.`,
          isWarning: true,
        });
        setCurrentInput('');
        setStep('COMPLETE');
        return;
      }

      const opNames: Record<string, string> = {
        '1': 'Adição (+)',
        '2': 'Subtração (-)',
        '3': 'Multiplicação (*)',
        '4': 'Divisão (/)',
      };

      setLines((prev) => [
        ...prev,
        newLine,
        {
          id: Date.now().toString() + '-sel',
          type: 'highlight',
          text: `[Operação selecionada: ${opNames[trimmed]}]`,
        },
      ]);
      setSelectedOp(trimmed);
      setStep('NUM1');
      setCurrentInput('');
      setCurrentDevLogic({
        stepName: "Condição 'if' Avaliada como Verdadeira",
        codeSnippet: `if opcao in ['1', '2', '3', '4']:\n    num1 = float(input("Digite o primeiro número: "))`,
        explanation: `Como a opção "${trimmed}" é válida, o fluxo entra no bloco indentado e executa a função float() para converter a entrada do primeiro número em decimal.`,
      });
      return;
    }

    if (step === 'NUM1') {
      const parsed = parseFloat(trimmed);
      if (isNaN(parsed)) {
        setLines((prev) => [
          ...prev,
          { id: Date.now().toString(), type: 'input', text: `Digite o primeiro número: ${trimmed}` },
          { id: Date.now().toString() + '-err', type: 'error', text: `ValueError: could not convert string to float: '${trimmed}'` },
        ]);
        setCurrentDevLogic({
          stepName: 'Erro de Conversão de Tipo (ValueError)',
          codeSnippet: `num1 = float("${trimmed}")  # Gera ValueError`,
          explanation: `O texto digitado não representa um número válido. Em Python puro, essa linha geraria um ValueError fatal caso não houvesse tratamento.`,
          isWarning: true,
        });
        setCurrentInput('');
        setStep('COMPLETE');
        return;
      }

      setLines((prev) => [
        ...prev,
        { id: Date.now().toString(), type: 'input', text: `Digite o primeiro número: ${trimmed}` },
      ]);
      setNum1(trimmed);
      setStep('NUM2');
      setCurrentInput('');
      setCurrentDevLogic({
        stepName: 'Conversão com float() Concluída',
        codeSnippet: `num1 = float("${trimmed}")  # Resultado na RAM: ${parsed}\nnum2 = float(input("Digite o segundo número: "))`,
        explanation: `O valor "${trimmed}" foi convertido com sucesso para float (${parsed}). Agora o Python aguarda o segundo número.`,
      });
      return;
    }

    if (step === 'NUM2') {
      const parsedNum2 = parseFloat(trimmed);
      const parsedNum1 = parseFloat(num1);

      if (isNaN(parsedNum2)) {
        setLines((prev) => [
          ...prev,
          { id: Date.now().toString(), type: 'input', text: `Digite o segundo número: ${trimmed}` },
          { id: Date.now().toString() + '-err', type: 'error', text: `ValueError: could not convert string to float: '${trimmed}'` },
        ]);
        setCurrentDevLogic({
          stepName: 'Erro de Conversão no 2º Número (ValueError)',
          codeSnippet: `num2 = float("${trimmed}")  # Gera ValueError`,
          explanation: `O segundo valor digitado não é numérico.`,
          isWarning: true,
        });
        setCurrentInput('');
        setStep('COMPLETE');
        return;
      }

      setNum2(trimmed);

      // Python function execution logic
      let resultText = '';
      let isZeroDiv = false;
      let executedFunction = '';
      let functionCode = '';

      if (selectedOp === '1') {
        const res = parsedNum1 + parsedNum2;
        resultText = `\nResultado: ${parsedNum1} + ${parsedNum2} = ${res}`;
        executedFunction = `resultado = somar(${parsedNum1}, ${parsedNum2})`;
        functionCode = `def somar(a, b):\n    return a + b  # Retorna ${res}`;
      } else if (selectedOp === '2') {
        const res = parsedNum1 - parsedNum2;
        resultText = `\nResultado: ${parsedNum1} - ${parsedNum2} = ${res}`;
        executedFunction = `resultado = subtrair(${parsedNum1}, ${parsedNum2})`;
        functionCode = `def subtrair(a, b):\n    return a - b  # Retorna ${res}`;
      } else if (selectedOp === '3') {
        const res = parsedNum1 * parsedNum2;
        resultText = `\nResultado: ${parsedNum1} * ${parsedNum2} = ${res}`;
        executedFunction = `resultado = multiplicar(${parsedNum1}, ${parsedNum2})`;
        functionCode = `def multiplicar(a, b):\n    return a * b  # Retorna ${res}`;
      } else if (selectedOp === '4') {
        if (parsedNum2 === 0) {
          isZeroDiv = true;
          resultText = `\nResultado: ${parsedNum1} / ${parsedNum2} = Erro: Não é possível dividir por zero!`;
          executedFunction = `resultado = dividir(${parsedNum1}, 0)`;
          functionCode = `def dividir(a, b):\n    if b == 0:\n        return "Erro: Não é possível dividir por zero!"\n    return a / b`;
        } else {
          const res = parsedNum1 / parsedNum2;
          resultText = `\nResultado: ${parsedNum1} / ${parsedNum2} = ${res}`;
          executedFunction = `resultado = dividir(${parsedNum1}, ${parsedNum2})`;
          functionCode = `def dividir(a, b):\n    if b == 0:\n        return "Erro: Não é possível dividir por zero!"\n    return a / b  # Retorna ${res}`;
        }
      }

      setLines((prev) => [
        ...prev,
        { id: Date.now().toString(), type: 'input', text: `Digite o segundo número: ${trimmed}` },
        {
          id: Date.now().toString() + '-res',
          type: isZeroDiv ? 'error' : 'success',
          text: resultText,
        },
        {
          id: Date.now().toString() + '-end',
          type: 'system',
          text: 'Processo Python finalizado (código de saída 0).',
        },
      ]);

      if (isZeroDiv) {
        setCurrentDevLogic({
          stepName: 'Tratamento Defensivo: if b == 0',
          codeSnippet: functionCode,
          explanation:
            'A condição "if b == 0" foi atendida! O Python interceptou a divisão antes que a CPU gerasse uma exceção fatal ZeroDivisionError.',
          isWarning: true,
        });
      } else {
        setCurrentDevLogic({
          stepName: 'Chamada de Função & Retorno do Valor',
          codeSnippet: `${functionCode}\n\n${executedFunction}\nprint(f"\\nResultado: ... = {resultado}")`,
          explanation:
            'Os argumentos foram enviados para a função, a operação matemática foi realizada e o comando return devolveu o resultado para a f-string.',
        });
      }

      setStep('COMPLETE');
      setCurrentInput('');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processInput(currentInput);
  };

  const runQuickScenario = (op: string, n1: string, n2: string) => {
    resetCalculator();
    setTimeout(() => {
      setSelectedOp(op);
      setNum1(n1);
      setNum2(n2);

      const parsedN1 = parseFloat(n1);
      const parsedN2 = parseFloat(n2);
      const isZero = op === '4' && parsedN2 === 0;

      let resText = '';
      if (op === '1') resText = `\nResultado: ${parsedN1} + ${parsedN2} = ${parsedN1 + parsedN2}`;
      if (op === '2') resText = `\nResultado: ${parsedN1} - ${parsedN2} = ${parsedN1 - parsedN2}`;
      if (op === '3') resText = `\nResultado: ${parsedN1} * ${parsedN2} = ${parsedN1 * parsedN2}`;
      if (op === '4') {
        resText = isZero
          ? `\nResultado: ${parsedN1} / ${parsedN2} = Erro: Não é possível dividir por zero!`
          : `\nResultado: ${parsedN1} / ${parsedN2} = ${parsedN1 / parsedN2}`;
      }

      setLines((prev) => [
        ...prev,
        { id: 'sc-1', type: 'input', text: `Digite o número da operação (1/2/3/4): ${op}` },
        { id: 'sc-2', type: 'highlight', text: `[Operação selecionada: ${op === '1' ? 'Adição' : op === '2' ? 'Subtração' : op === '3' ? 'Multiplicação' : 'Divisão'}]` },
        { id: 'sc-3', type: 'input', text: `Digite o primeiro número: ${n1}` },
        { id: 'sc-4', type: 'input', text: `Digite o segundo número: ${n2}` },
        { id: 'sc-5', type: isZero ? 'error' : 'success', text: resText },
        { id: 'sc-6', type: 'system', text: 'Processo Python finalizado (código de saída 0).' },
      ]);

      if (isZero) {
        setCurrentDevLogic({
          stepName: 'Tratamento de Divisão por Zero',
          codeSnippet: `def dividir(a, b):\n    if b == 0:\n        return "Erro: Não é possível dividir por zero!"`,
          explanation: 'O divisor b é zero. O return encerrou a função imediatamente com a mensagem de erro.',
          isWarning: true,
        });
      } else {
        setCurrentDevLogic({
          stepName: 'Operação Executada com Sucesso',
          codeSnippet: `resultado = ${op === '1' ? 'somar' : op === '2' ? 'subtrair' : op === '3' ? 'multiplicar' : 'dividir'}(${n1}, ${n2})`,
          explanation: 'Os dois números foram calculados pela função modular e o resultado foi impresso no terminal.',
        });
      }

      setStep('COMPLETE');
    }, 100);
  };

  return (
    <div className="space-y-4">
      {/* Quick Scenarios Bar for Testing Logic */}
      <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atalhos Didáticos de Teste:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => runQuickScenario('1', '25', '14.5')}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-mono transition-colors"
          >
            somar(25, 14.5)
          </button>
          <button
            onClick={() => runQuickScenario('3', '8', '7')}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-mono transition-colors"
          >
            multiplicar(8, 7)
          </button>
          <button
            onClick={() => runQuickScenario('4', '10', '0')}
            className="px-2.5 py-1 bg-amber-950/80 border border-amber-700 text-amber-300 hover:bg-amber-900 rounded font-mono transition-colors flex items-center gap-1"
          >
            ⚠️ dividir(10, 0)
          </button>
        </div>
      </div>

      {/* Grid: Terminal (Left) and Programmer Insights (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Terminal Screen */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-slate-400 font-medium ml-2 flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                calculadora.py
              </span>
            </div>

            <button
              onClick={resetCalculator}
              className="flex items-center gap-1 text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-slate-800 transition-colors"
              title="Reiniciar execução do script"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reiniciar</span>
            </button>
          </div>

          {/* Terminal Screen Text Area */}
          <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-y-auto max-h-[460px] min-h-[380px] space-y-1">
            {lines.map((l) => {
              if (l.type === 'system') {
                return (
                  <div key={l.id} className="text-slate-500 text-xs italic">
                    {l.text}
                  </div>
                );
              }
              if (l.type === 'highlight') {
                return (
                  <div key={l.id} className="text-cyan-400 font-semibold py-0.5">
                    {l.text}
                  </div>
                );
              }
              if (l.type === 'input') {
                return (
                  <div key={l.id} className="text-emerald-400 font-medium">
                    {l.text}
                  </div>
                );
              }
              if (l.type === 'error') {
                return (
                  <div key={l.id} className="text-rose-400 font-bold whitespace-pre-wrap py-0.5">
                    {l.text}
                  </div>
                );
              }
              if (l.type === 'success') {
                return (
                  <div key={l.id} className="text-emerald-300 font-bold text-sm sm:text-base py-1 whitespace-pre-wrap">
                    {l.text}
                  </div>
                );
              }
              return (
                <div key={l.id} className="text-slate-200 whitespace-pre-wrap">
                  {l.text}
                </div>
              );
            })}

            {/* Terminal Input Form */}
            {step !== 'COMPLETE' && (
              <form onSubmit={handleFormSubmit} className="pt-2 flex items-center gap-2">
                <span className="text-amber-400 font-semibold shrink-0">{getPromptText()}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  autoFocus
                  placeholder={step === 'OPTION' ? '1, 2, 3 ou 4' : 'ex: 15 ou 2.5'}
                  className="flex-1 bg-transparent border-b border-amber-500/70 focus:border-amber-300 outline-none text-amber-200 font-mono py-0.5 px-1 text-xs sm:text-sm"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded text-xs flex items-center gap-1 transition-colors border border-amber-500/40"
                >
                  <span>Enter</span>
                  <CornerDownLeft className="w-3 h-3" />
                </button>
              </form>
            )}

            {step === 'COMPLETE' && (
              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={resetCalculator}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Executar Novamente</span>
                </button>
              </div>
            )}

            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* Programmer Didactic Insights Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Raciocínio de Código & Lógica</h4>
                <p className="text-xs text-slate-500">Fluxo interno do interpretador Python</p>
              </div>
            </div>

            {/* Active Code Execution */}
            <div
              className={`p-4 rounded-xl border text-xs ${
                currentDevLogic.isWarning
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                {currentDevLogic.isWarning ? (
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                <span>{currentDevLogic.stepName}</span>
              </div>
              <p className="text-slate-600 leading-relaxed mb-3">{currentDevLogic.explanation}</p>

              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Instrução Python:</div>
              <pre className="bg-slate-950 text-emerald-300 p-3 rounded-lg font-mono text-[11px] overflow-x-auto whitespace-pre leading-relaxed border border-slate-800">
                {currentDevLogic.codeSnippet}
              </pre>
            </div>

            {/* Variable Memory State */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-800 block mb-2">Variáveis na Memória (RAM):</span>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">opcao (str)</span>
                  <span className="font-semibold text-purple-700">{selectedOp ? `'${selectedOp}'` : "''"}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">num1 (float)</span>
                  <span className="font-semibold text-slate-800">{num1 ? `${num1}` : 'None'}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">num2 (float)</span>
                  <span className="font-semibold text-slate-800">{num2 ? `${num2}` : 'None'}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">etapa</span>
                  <span className="font-semibold text-emerald-700">{step}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-950 leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block mb-0.5">Separação de Responsabilidades:</strong>
              O modo gráfico ao lado usa componentes visuais reativos, enquanto este modo terminal simula exatamente o fluxo de execução sequencial do interpretador Python de linha de comando.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
