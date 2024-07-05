# Estratégias de Debugging em JavaScript

## Slide 1

### Estratégias de Debugging em JavaScript

#### David Cromianski

## Slide 2

### Mas que {emojis} é Debugging?

<cite>"Depuração é como ser o detetive em um filme onde você mesmo é o assassino."</cite>

Filipe Fortes [Microsoft, Flipboard]

* Códigos com erro *

--- O que é

# Slide 3

### "Os erros só existem quando aparecem."

#### Extreme Go Horse - Axioma 4

* Imagem Go Horse *
* Codigo Go Horse *

--- Para que serve

# Slide 4

### "[...] se você sabe o que está fazendo, vai testar pra que?"

#### Trecho do Extreme Go Horse- Axioma 20

<cite>"Depurar é duas vezes mais difícil do que escrever o código em primeiro lugar. Portanto, se
você
escrever o código da forma mais inteligente possível, por definição você não será inteligente o
suficiente para depurá-lo."</cite>
Brian Kernighan, The Elements of Programming Style, 1978

-- Onde voce vai usar

# Slide 5

## Formas de Debugging em JavaScript

* Console.log - icone de tédio
* alert - icone de medo
* debugger - icone de euforia
* breakpoint - icone de surpresa

--- Códigos de exemplo em cada um, com accordion

# Slide 6

## E o TypeScript?

- Habilitar source maps no tsconfig.json
- Depuracao direto no TS pelo browser
- *Codigo TS*

# Slide 7

## Mas quem é que usa WebPack em pleno 2024?

- Ctrl + shift + P
- Recursos para desenvolvedores
- Mostra os source maps carregados, permite filtrar, etc.
- *Código JS com WebPack*

# Slide 8

## E o Node, vai onde?

- Modo de depuração
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
- *Código Node*

# Slide 9

## Google Chrome DevTools, é magica?

- Ctrl + Shift + I
- Sources
- Agrupar
- Breakpoints
- Escopo
- Pilha de chamadas
- Listeners

# Slide 10

## Maos na massa

- Exercício de depuração
- *Código com erro*
- *Código corrigido*
- *Código com breakpoint*
- *Código com console.log*
- ...

# Slide 11

## Conclusão

- Depuração é uma habilidade essencial
- Entenda o problema e o contexto
- Use as ferramentas certas
- Pratique, pratique, pratique
- *Imagem de um debugger*