# Estrat�gias de Debugging em JavaScript

## Slide 1

### Estrat�gias de Debugging em JavaScript

#### David Cromianski

## Slide 2

### Mas que {emojis} � Debugging?

<cite>"Depura��o � como ser o detetive em um filme onde voc� mesmo � o assassino."</cite>

Filipe Fortes [Microsoft, Flipboard]

* C�digos com erro *

--- O que �

# Slide 3

### "Os erros s� existem quando aparecem."

#### Extreme Go Horse - Axioma 4

* Imagem Go Horse *
* Codigo Go Horse *

--- Para que serve

# Slide 4

### "[...] se voc� sabe o que est� fazendo, vai testar pra que?"

#### Trecho do Extreme Go Horse- Axioma 20

<cite>"Depurar � duas vezes mais dif�cil do que escrever o c�digo em primeiro lugar. Portanto, se
voc�
escrever o c�digo da forma mais inteligente poss�vel, por defini��o voc� n�o ser� inteligente o
suficiente para depur�-lo."</cite>
Brian Kernighan, The Elements of Programming Style, 1978

-- Onde voce vai usar

# Slide 5

## Formas de Debugging em JavaScript

* Console.log - icone de t�dio
* alert - icone de medo
* debugger - icone de euforia
* breakpoint - icone de surpresa

--- C�digos de exemplo em cada um, com accordion

# Slide 6

## E o TypeScript?

- Habilitar source maps no tsconfig.json
- Depuracao direto no TS pelo browser
- *Codigo TS*

# Slide 7

## Mas quem � que usa WebPack em pleno 2024?

- Ctrl + shift + P
- Recursos para desenvolvedores
- Mostra os source maps carregados, permite filtrar, etc.
- *C�digo JS com WebPack*

# Slide 8

## E o Node, vai onde?

- Modo de depura��o
- node --inspect (websocket)
- Node debug no Chrome
- chrome://inspect
- Remote Target
- inspect link
- "Debugger attached"
- Shows source code
- Add breakpoints
- Can use console to debug
- Can spect Request/Response
- *C�digo Node*

# Slide 9

## Google Chrome DevTools, � magica?

- Ctrl + Shift + I
- Sources
- Agrupar
- Breakpoints
- Escopo
- Pilha de chamadas
- Listeners

# Slide 10

## Maos na massa

- Exerc�cio de depura��o
- *C�digo com erro*
- *C�digo corrigido*
- *C�digo com breakpoint*
- *C�digo com console.log*
- ...

# Slide 11

## Conclus�o

- Depura��o � uma habilidade essencial
- Entenda o problema e o contexto
- Use as ferramentas certas
- Pratique, pratique, pratique
- *Imagem de um debugger*