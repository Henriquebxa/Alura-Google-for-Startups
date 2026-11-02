import React, { useState, useEffect } from 'react';
import { Delete, RotateCcw, Clock, Trash2, ArrowUpRight, AlertCircle, Check } from 'lucide-react';

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
  isError?: boolean;
}

const STORAGE_KEY = 'python_calculator_gui_history_v1';

export const GuiCalculator: React.FC = () => {
  const [currentVal, setCurrentVal] = useState<string>('0');
  const [prevVal, setPrevVal] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [isResult, setIsResult] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // Fallback if localStorage is restricted
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (newItems: HistoryItem[]) => {
    setHistory(newItems);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    } catch {
      // Fallback
    }
  };

  const clearHistory = () => {
    saveHistory([]);
  };

  // Keyboard support for convenience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === '.') {
        handleDecimal();
      } else if (e.key === '+') {
        handleOperator('+');
      } else if (e.key === '-') {
        handleOperator('-');
      } else if (e.key === '*' || e.key === 'x') {
        handleOperator('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperator('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleCalculate();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        handleClearAll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleDigit = (digit: string) => {
    setErrorMessage(null);
    if (isResult) {
      setCurrentVal(digit);
      setIsResult(false);
      return;
    }

    if (currentVal === '0') {
      setCurrentVal(digit);
    } else {
      if (currentVal.length < 16) {
        setCurrentVal((prev) => prev + digit);
      }
    }
  };

  const handleDecimal = () => {
    setErrorMessage(null);
    if (isResult) {
      setCurrentVal('0.');
      setIsResult(false);
      return;
    }
    if (!currentVal.includes('.')) {
      setCurrentVal((prev) => prev + '.');
    }
  };

  const handleBackspace = () => {
    setErrorMessage(null);
    if (isResult) {
      setCurrentVal('0');
      setIsResult(false);
      return;
    }
    if (currentVal.length > 1) {
      setCurrentVal((prev) => prev.slice(0, -1));
    } else {
      setCurrentVal('0');
    }
  };

  const handleClearAll = () => {
    setCurrentVal('0');
    setPrevVal(null);
    setOperator(null);
    setIsResult(false);
    setErrorMessage(null);
  };

  const handleToggleSign = () => {
    if (currentVal === '0') return;
    if (currentVal.startsWith('-')) {
      setCurrentVal(currentVal.substring(1));
    } else {
      setCurrentVal('-' + currentVal);
    }
  };

  const handleOperator = (op: string) => {
    setErrorMessage(null);
    if (operator && prevVal !== null && !isResult) {
      // Chain calculation: calculate previous before setting new operator
      handleCalculate(op);
      return;
    }
    setPrevVal(currentVal);
    setOperator(op);
    setIsResult(false);
    setCurrentVal('0');
  };

  const handleCalculate = (nextOp?: string) => {
    if (operator === null || prevVal === null) return;

    const n1 = parseFloat(prevVal);
    const n2 = parseFloat(currentVal);

    if (isNaN(n1) || isNaN(n2)) {
      setErrorMessage('Valor numérico inválido');
      return;
    }

    let res: number | string = 0;
    let isZeroDivision = false;

    switch (operator) {
      case '+':
        res = n1 + n2;
        break;
      case '-':
        res = n1 - n2;
        break;
      case '×':
        res = n1 * n2;
        break;
      case '÷':
        if (n2 === 0) {
          isZeroDivision = true;
          res = 'Divisão por zero!';
        } else {
          res = n1 / n2;
        }
        break;
    }

    const expressionStr = `${prevVal} ${operator} ${currentVal}`;
    const formattedResult = isZeroDivision
      ? 'Erro: Divisão por 0'
      : Number.isInteger(res as number)
      ? String(res)
      : parseFloat((res as number).toFixed(8)).toString();

    // Create history entry
    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      expression: expressionStr,
      result: formattedResult,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      isError: isZeroDivision,
    };

    saveHistory([newHistoryItem, ...history.slice(0, 29)]);

    if (isZeroDivision) {
      setErrorMessage('Não é possível dividir por zero!');
      setCurrentVal('0');
      setPrevVal(null);
      setOperator(null);
      setIsResult(true);
    } else {
      setCurrentVal(formattedResult);
      if (nextOp) {
        setPrevVal(formattedResult);
        setOperator(nextOp);
        setIsResult(false);
        setCurrentVal('0');
      } else {
        setPrevVal(null);
        setOperator(null);
        setIsResult(true);
      }
    }
  };

  const loadFromHistory = (item: HistoryItem) => {
    if (item.isError) return;
    setCurrentVal(item.result);
    setPrevVal(null);
    setOperator(null);
    setIsResult(true);
    setErrorMessage(null);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-5xl mx-auto">
      {/* Calculadora Gráfica Principal */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xl p-5 sm:p-7 flex flex-col justify-between">
        {/* Top Header / Status */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
              Calculadora Padrão
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Use mouse ou teclado numérico
          </span>
        </div>

        {/* VISOR (DISPLAY) SUPERIOR */}
        <div className="bg-slate-950 rounded-xl p-4 sm:p-5 text-right font-mono flex flex-col justify-between min-h-[110px] shadow-inner border border-slate-800 mb-5">
          {/* Linha superior: Expressão em andamento */}
          <div className="text-xs sm:text-sm text-slate-400 min-h-[1.25rem] flex items-center justify-end gap-1">
            {prevVal !== null && operator !== null && (
              <span>
                {prevVal} <span className="text-amber-400 font-bold">{operator}</span>{' '}
                {!isResult && currentVal !== '0' ? currentVal : ''}
              </span>
            )}
          </div>

          {/* Linha principal: Dígito atual / resultado grande */}
          <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight break-all truncate">
            {currentVal}
          </div>

          {/* Mensagem de Erro / Alerta (como Divisão por Zero) */}
          {errorMessage && (
            <div className="mt-1 flex items-center justify-end gap-1 text-xs text-rose-400 font-sans font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* TECLADO DE BOTÕES (KEYPAD) */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 font-sans">
          {/* Linha 1: Botões de Controle e Divisão */}
          <button
            onClick={handleClearAll}
            className="py-3 sm:py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-rose-600 font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-1"
            title="Limpar tudo (Esc)"
          >
            <RotateCcw className="w-4 h-4" />
            <span>AC</span>
          </button>

          <button
            onClick={handleBackspace}
            className="py-3 sm:py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold text-sm sm:text-base transition-colors flex items-center justify-center"
            title="Apagar último dígito (Backspace)"
          >
            <Delete className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleSign}
            className="py-3 sm:py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold text-sm sm:text-base transition-colors"
            title="Inverter sinal (+/-)"
          >
            ±
          </button>

          <button
            onClick={() => handleOperator('÷')}
            className={`py-3 sm:py-3.5 rounded-xl font-bold text-base sm:text-lg transition-colors ${
              operator === '÷'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-amber-100/80 hover:bg-amber-200/80 active:bg-amber-300 text-amber-900'
            }`}
            title="Divisão (/)"
          >
            ÷
          </button>

          {/* Linha 2: 7, 8, 9, Multiplicação */}
          {['7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigit(digit)}
              className="py-3 sm:py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 text-slate-900 font-bold text-base sm:text-lg transition-colors shadow-2xs"
            >
              {digit}
            </button>
          ))}
          <button
            onClick={() => handleOperator('×')}
            className={`py-3 sm:py-3.5 rounded-xl font-bold text-base sm:text-lg transition-colors ${
              operator === '×'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-amber-100/80 hover:bg-amber-200/80 active:bg-amber-300 text-amber-900'
            }`}
            title="Multiplicação (*)"
          >
            ×
          </button>

          {/* Linha 3: 4, 5, 6, Subtração */}
          {['4', '5', '6'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigit(digit)}
              className="py-3 sm:py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 text-slate-900 font-bold text-base sm:text-lg transition-colors shadow-2xs"
            >
              {digit}
            </button>
          ))}
          <button
            onClick={() => handleOperator('-')}
            className={`py-3 sm:py-3.5 rounded-xl font-bold text-base sm:text-lg transition-colors ${
              operator === '-'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-amber-100/80 hover:bg-amber-200/80 active:bg-amber-300 text-amber-900'
            }`}
            title="Subtração (-)"
          >
            −
          </button>

          {/* Linha 4: 1, 2, 3, Adição */}
          {['1', '2', '3'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigit(digit)}
              className="py-3 sm:py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 text-slate-900 font-bold text-base sm:text-lg transition-colors shadow-2xs"
            >
              {digit}
            </button>
          ))}
          <button
            onClick={() => handleOperator('+')}
            className={`py-3 sm:py-3.5 rounded-xl font-bold text-base sm:text-lg transition-colors ${
              operator === '+'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-amber-100/80 hover:bg-amber-200/80 active:bg-amber-300 text-amber-900'
            }`}
            title="Adição (+)"
          >
            +
          </button>

          {/* Linha 5: 0, Decimal (.), Igual (=) */}
          <button
            onClick={() => handleDigit('0')}
            className="col-span-2 py-3 sm:py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 text-slate-900 font-bold text-base sm:text-lg transition-colors shadow-2xs"
          >
            0
          </button>

          <button
            onClick={handleDecimal}
            className="py-3 sm:py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 text-slate-900 font-bold text-base sm:text-lg transition-colors shadow-2xs"
          >
            .
          </button>

          <button
            onClick={() => handleCalculate()}
            className="py-3 sm:py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xl transition-all shadow-md hover:shadow-lg"
            title="Calcular / Enviar (Enter ou =)"
          >
            =
          </button>
        </div>
      </div>

      {/* PAINEL DE HISTÓRICO COM LOCALSTORAGE */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xl p-5 flex flex-col h-full min-h-[460px]">
        {/* Cabeçalho do Histórico */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Histórico de Cálculos</h3>
              <p className="text-[11px] text-slate-500">Salvo no seu navegador (localStorage)</p>
            </div>
          </div>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50 transition-colors"
              title="Limpar todo o histórico"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          )}
        </div>

        {/* Lista de Itens do Histórico */}
        <div className="mt-4 flex-1 overflow-y-auto space-y-2 pr-1 max-h-[380px]">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Clock className="w-8 h-8 stroke-1 text-slate-300 mb-2" />
              <p className="text-xs font-medium text-slate-600">Nenhum cálculo recente</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-[200px]">
                Os cálculos que você realizar aparecerão aqui automaticamente.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => loadFromHistory(item)}
                className={`p-3 rounded-xl border transition-all cursor-pointer group flex items-center justify-between ${
                  item.isError
                    ? 'bg-rose-50/50 border-rose-200 hover:border-rose-300'
                    : 'bg-slate-50/70 border-slate-200/80 hover:bg-blue-50/50 hover:border-blue-200'
                }`}
                title="Clique para carregar este resultado no visor"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
                    <span>{item.expression} =</span>
                    <span className="text-[10px] text-slate-400 font-sans">{item.timestamp}</span>
                  </div>
                  <div
                    className={`font-mono text-sm sm:text-base font-bold truncate mt-0.5 ${
                      item.isError ? 'text-rose-600' : 'text-slate-900 group-hover:text-blue-700'
                    }`}
                  >
                    {item.result}
                  </div>
                </div>

                <div className="ml-2 flex items-center text-xs text-slate-400 group-hover:text-blue-600">
                  {copiedId === item.id ? (
                    <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Carregado
                    </span>
                  ) : (
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé do Histórico */}
        {history.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>{history.length} {history.length === 1 ? 'cálculo gravado' : 'cálculos gravados'}</span>
            <span className="text-slate-500">Toque em um item para reutilizar</span>
          </div>
        )}
      </div>
    </div>
  );
};
