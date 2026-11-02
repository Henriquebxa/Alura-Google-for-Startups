export interface CodeAnnotation {
  line: number;
  title: string;
  category: 'funcao' | 'input' | 'condicional' | 'erro' | 'estrutura';
  explanation: string;
}


export const BASIC_PYTHON_CODE = `# ==============================================================================
# CALCULADORA SIMPLES EM PYTHON
# Operações básicas: Adição, Subtração, Multiplicação e Divisão
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. DEFINIÇÃO DAS FUNÇÕES MATEMÁTICAS
# Cada função recebe dois valores (a, b) e retorna o resultado da operação.
# ------------------------------------------------------------------------------

def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a subtração do segundo número em relação ao primeiro."""
    return a - b

def multiplicar(a, b):
    """Retorna o produto da multiplicação de dois números."""
    return a * b

def dividir(a, b):
    """
    Retorna a divisão do primeiro número pelo segundo.
    Inclui validação para evitar erro crítico de divisão por zero.
    """
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

# ------------------------------------------------------------------------------
# 2. FUNÇÃO PRINCIPAL DA CALCULADORA
# Gerencia o menu, entrada de dados e lógica de decisão.
# ------------------------------------------------------------------------------

def calculadora():
    print("=" * 40)
    print("      BEM-VINDO À CALCULADORA PYTHON    ")
    print("=" * 40)
    print("Selecione a operação desejada:")
    print("1 - Adição (+)")
    print("2 - Subtração (-)")
    print("3 - Multiplicação (*)")
    print("4 - Divisão (/)")
    print("=" * 40)

    # 3. RECEBENDO A OPÇÃO DO USUÁRIO
    # O input() sempre retorna texto (string 'str')
    opcao = input("Digite o número da operação (1/2/3/4): ")

    # 4. VALIDAÇÃO DA OPÇÃO
    # Verificamos se a opção escolhida existe antes de pedir os números
    if opcao in ['1', '2', '3', '4']:
        # 5. RECEBENDO E CONVERTENDO OS NÚMEROS
        # Usamos float() para aceitar números inteiros e com casas decimais
        num1 = float(input("Digite o primeiro número: "))
        num2 = float(input("Digite o segundo número: "))

        # 6. ESTRUTURA CONDICIONAL (IF / ELIF / ELSE)
        # Identifica a operação escolhida e executa a função correspondente
        if opcao == '1':
            resultado = somar(num1, num2)
            print(f"\\nResultado: {num1} + {num2} = {resultado}")

        elif opcao == '2':
            resultado = subtrair(num1, num2)
            print(f"\\nResultado: {num1} - {num2} = {resultado}")

        elif opcao == '3':
            resultado = multiplicar(num1, num2)
            print(f"\\nResultado: {num1} * {num2} = {resultado}")

        elif opcao == '4':
            resultado = dividir(num1, num2)
            print(f"\\nResultado: {num1} / {num2} = {resultado}")

    else:
        # Caso o usuário digite uma opção fora de 1 a 4
        print("\\nOpção inválida! Por favor, escolha um número de 1 a 4.")

# ------------------------------------------------------------------------------
# 7. PONTO DE ENTRADA DO PROGRAMA
# Inicia a execução chamando a função principal
# ------------------------------------------------------------------------------
if __name__ == "__main__":
    calculadora()
`;

export const ADVANCED_PYTHON_CODE = `# ==============================================================================
# CALCULADORA PYTHON - VERSÃO COM LOOP CONTÍNUO & TRATAMENTO COMPLETO
# Permite realizar múltiplos cálculos e trata entradas não numéricas
# ==============================================================================

def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return "Erro: Divisão por zero não é permitida!"
    return a / b

def calculadora_continua():
    while True:
        print("\\n" + "=" * 40)
        print("         CALCULADORA INTERATIVA         ")
        print("=" * 40)
        print("1 - Adição (+)")
        print("2 - Subtração (-)")
        print("3 - Multiplicação (*)")
        print("4 - Divisão (/)")
        print("5 - Sair do programa")
        print("=" * 40)

        opcao = input("Escolha uma opção (1-5): ").strip()

        if opcao == '5':
            print("Obrigado por usar a calculadora! Encerrando...")
            break

        if opcao not in ['1', '2', '3', '4']:
            print("Opção inválida! Escolha um valor entre 1 e 5.")
            continue

        try:
            num1 = float(input("Digite o primeiro número: "))
            num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("Erro: Por favor, digite apenas números válidos!")
            continue

        if opcao == '1':
            print(f"Resultado: {num1} + {num2} = {somar(num1, num2)}")
        elif opcao == '2':
            print(f"Resultado: {num1} - {num2} = {subtrair(num1, num2)}")
        elif opcao == '3':
            print(f"Resultado: {num1} * {num2} = {multiplicar(num1, num2)}")
        elif opcao == '4':
            print(f"Resultado: {num1} / {num2} = {dividir(num1, num2)}")

if __name__ == "__main__":
    calculadora_continua()
`;

export const CODE_ANNOTATIONS: CodeAnnotation[] = [
  {
    line: 12,
    title: "Declaração de Função (def somar)",
    category: "funcao",
    explanation: "A palavra 'def' ensina o Python uma nova receita reutilizável. 'a' e 'b' são parâmetros que receberão os números.",
  },
  {
    line: 14,
    title: "Palavra-chave 'return'",
    category: "funcao",
    explanation: "'return' devolve o valor calculado para quem chamou a função, permitindo guardar o resultado em uma variável.",
  },
  {
    line: 25,
    title: "Tratamento de Divisão por Zero",
    category: "erro",
    explanation: "Em matemática e computação, dividir por 0 é indefinido e trava o programa com ZeroDivisionError. Verificamos 'if b == 0' antes de tentar dividir.",
  },
  {
    line: 34,
    title: "Função Principal (def calculadora)",
    category: "estrutura",
    explanation: "Organiza o fluxo geral do programa: exibe o menu, recolhe escolhas, processa os cálculos e mostra o resultado.",
  },
  {
    line: 45,
    title: "Entrada de Dados (input)",
    category: "input",
    explanation: "A função input() pausa o programa e aguarda o usuário digitar. Atenção: o Python sempre retorna o que foi digitado como texto ('str').",
  },
  {
    line: 49,
    title: "Validação Prévia (if opcao in [...])",
    category: "condicional",
    explanation: "Verifica se a escolha está na lista de opções válidas antes de pedir os números, evitando processamento desnecessário se o usuário digitar algo errado.",
  },
  {
    line: 52,
    title: "Conversão de Tipo (Type Casting float)",
    category: "input",
    explanation: "Converte o texto digitado ('10') em número decimal (10.0). Sem isso, '10' + '5' resultaria em '105' (concatenação de texto) em vez de 15!",
  },
  {
    line: 56,
    title: "Estruturas Condicionais (if / elif / else)",
    category: "condicional",
    explanation: "'if' testa a primeira condição; 'elif' testa a próxima caso a anterior seja falsa; 'else' é o plano B se nenhuma bater.",
  },
  {
    line: 58,
    title: "F-Strings (Formatação de Texto)",
    category: "estrutura",
    explanation: "O 'f' antes das aspas permite injetar variáveis diretamente no texto entre chaves {num1}, tornando o código muito mais legível.",
  },
  {
    line: 76,
    title: "Ponto de Entrada (if __name__ == '__main__':)",
    category: "estrutura",
    explanation: "Boa prática no Python: garante que a calculadora só será iniciada quando este arquivo for executado diretamente, e não quando importado por outro script.",
  },
];

