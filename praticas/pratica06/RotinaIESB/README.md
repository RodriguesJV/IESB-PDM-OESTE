# RotinaIESB

App organizador simples da rotina acadêmica do aluno no IESB 

## Comando usado para criar o projeto

npx create-expo-app@latest RotinaIESB --template blank
cd RotinaIESB
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context

Para rodar:

npm install
npx expo start

## Prints


- **Tela vazia** 
![alt text](assets\tela-inicial.png)

- **Tela com itens** 
![alt text](assets\telaComItems.png)

- **Após reabrir o app** 
![alt text](assets\telaReabrir.png)

## Mapa do useEffect (carga e salvamento)

Ambos ficam em `App.js`:

- **useEffect de CARGA** — roda uma única vez na montagem (`[]`). Lê a
  chave `@rotina_iesb_compromissos` do AsyncStorage, faz
  `JSON.parse` e popula o estado `compromissos`. Ao final, marca
  `carregado = true`.
- **useEffect de SALVAMENTO** — depende de `[compromissos, carregado]`.
  Toda vez que a lista muda, faz `JSON.stringify(compromissos)` e grava
  no AsyncStorage na mesma chave. Só executa depois que `carregado`
  é `true`, para não sobrescrever os dados salvos com a lista vazia
  do primeiro render.

## Arquivos criados em `components/` e `labels.js`

- `labels.js` — rótulos/textos do app (tituloApp, placeholderCompromisso,
  botaoAdicionar, tituloLista, listaVazia).
- `components/CompromissoInput.js` — campo de texto + botão de adicionar
  (props: value, onChangeText, onAdd, labels).
- `components/CompromissoList.js` — lista de compromissos com remoção
  (props: itens, onDelete, onToggle, tituloLista, listaVazia).


- **O2 — Marcar compromisso como concluído**: toque na área de texto do
  item alterna `concluido: boolean`; quando `true`, o texto aparece
  riscado (`textDecorationLine: 'line-through'`) e com cor mais clara.
  O botão "Remover" fica separado para não conflitar com o toggle.
- **O3 — Contador no cabeçalho**: badge ao lado do título mostrando
  "X pendentes", calculado a partir de
  `compromissos.filter(item => !item.concluido).length`.
