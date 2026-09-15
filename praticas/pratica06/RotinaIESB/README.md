# RotinaIESB

App organizador simples da rotina acadêmica do aluno no IESB 
## Comando usado para criar o projeto

```bash
npx create-expo-app@latest RotinaIESB --template blank
cd RotinaIESB
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

Para rodar:

```bash
npx expo start
```

## Prints

> Substitua os placeholders abaixo pelas capturas de tela reais do seu
> emulador/celular antes de entregar.

- **Tela vazia** (app aberto pela primeira vez, sem compromissos):
  `![tela vazia](./prints/tela-vazia.png)`
- **Tela com itens** (após adicionar alguns compromissos):
  `![tela com itens](./prints/tela-com-itens.png)`
- **Após reabrir o app** (mostrando que os dados persistiram):
  `![apos reabrir](./prints/apos-reabrir.png)`

##  Mapa do useEffect (carga e salvamento)

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
  (props: itens, onDelete, tituloLista, listaVazia).
