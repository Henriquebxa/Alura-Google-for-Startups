# Alura-Google-for-Startups
O objetivo não é dominar Python de imediato, e sim começar a compreender como instruções, variáveis e condições são utilizadas na construção de um software. 

## Entendendo a Lógica da Aplicação

### 1. Quais são os principais componentes do código gerado?

O código é composto por cinco elementos fundamentais:

* *Funções (def)*: Blocos reutilizáveis que isolam a lógica matemática de cada operação (somar, subtrair, multiplicar e dividir).
* *Entrada de Dados (input())*: Função nativa do Python que pausa a execução e aguarda a digitação do usuário via teclado.
* *Conversão de Tipos (float())*: Transforma o texto lido pelo input() em um número decimal (ponto flutuante), permitindo a realização de operações aritméticas.
* *Estruturas Condicionais (if, elif, else)*: Mecanismo de controle de fluxo que valida qual opção o usuário escolheu e direciona o programa para o cálculo correto.
* *Saída de Dados (print())*: Exibe informações formatadas na tela para o usuário.

---

### 2. Como a aplicação recebe os números e identifica a operação escolhida?

1. *Captura da Operação*: O programa exibe um menu numérico e armazena a opção digitada pelo usuário na variável opcao.
2. *Leitura dos Números: A aplicação executa dois comandos input() para capturar os valores numéricos. Como o input() retorna texto (*string), o valor é imediatamente envolvido por float(), tornando-o numérico.
3. *Identificação*: A estrutura condicional compara o conteúdo da variável opcao com as opções disponíveis:
   * Se opcao == '1', identifica a adição;
   * Se opcao == '2', identifica a subtração;
   * Se opcao == '3', identifica a multiplicação;
   * Se opcao == '4', identifica a divisão.

---

### 3. Como a lógica de programação é utilizada para realizar os cálculos e apresentar os resultados?

A lógica atua por meio de *fluxo sequencial, validação e tomada de decisão*:

* *Validação Prévia*: Antes de realizar a divisão, a função dividir verifica se o segundo número (b) é igual a 0. Se for, ela previne uma falha fatal no sistema e retorna uma mensagem amigável de erro.
* *Execução*: Quando a opção é identificada no bloco if/elif, a função correspondente é chamada passando num1 e num2 como argumentos.
* *Retorno e Formatação*: O resultado retornado pela função é armazenado na variável resultado e exibido na tela por meio do print() formatado (f-string).

---

## 🧪 Exemplos de Comportamento

* *Soma simples*: Entrada 10 e 5, opção 1 $\rightarrow$ Resultado: 15.0
* *Divisão regular*: Entrada 20 e 4, opção 4 $\rightarrow$ Resultado: 5.0
* *Divisão por zero*: Entrada 10 e 0, opção 4 $\rightarrow$ Resultado: Erro: Divisão por zero não é permitida!
* *Opção Inválida*: Entrada 9 $\rightarrow$ Resultado: Opção inválida! Escolha um número de 1 a 4.

---

## Como Executar a Calculadora no Seu Computador
Para quem está começando agora, executar o primeiro programa Python é uma sensação incrível. Escolha o ambiente que você mais gosta abaixo e siga o passo a passo:
### 1 Salve o arquivo
Baixe o arquivo pelo github mesmo no topo da página ou crie um arquivo chamado calculadora.py e cole o código dentro.

### 2 Abra o Terminal ou Prompt de Comando
No Windows, aperte Win + R, digite cmd e tecle Enter. No Mac ou Linux, abra o aplicativo Terminal.

### 3 Navegue até a pasta e execute
Execute o comando abaixo para iniciar a sua calculadora:
Para gerar a solução, foi utilizado o seguinte prompt:

```bash
python calculadora.py
```
