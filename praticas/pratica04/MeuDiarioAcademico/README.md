## Como o projeto foi criado

```bash
npx create-expo-app@latest MeuDiarioAcademico --template blank
cd MeuDiarioAcademico
npx expo install react-native-safe-area-context
npx expo start
```

## Estrutura

- `labels.js` — constantes de texto (título, placeholder, botão, título da lista)
- `App.js` — tela principal (SafeAreaView, cabeçalho, linha de cadastro com
  TextInput + Botão, lista de disciplinas)

## Decisões de layout

- `flexDirection: 'row'` na linha de cadastro para colocar input e botão lado a lado.
- `alignItems: 'center'` para alinhar verticalmente o input e o botão (alturas diferentes).
- `justifyContent: 'space-between'` para distribuir o espaço entre o input e o botão.
- Input usa `width: '70%'` (percentual) e o container principal usa `flex: 1`,
  atendendo ao requisito de usar tanto largura percentual quanto flex.


- O `Button` padrão foi substituído por `Pressable`. O estilo `buttonWrapperPressed`
  (cor mais escura + opacidade reduzida) é aplicado dinamicamente através da
  função `({ pressed }) => [...]`, dando feedback visual de "pressionado".
- Foi adicionado um `Switch` com o rótulo "Mostrar apenas obrigatórias". O estado
  é controlado via `useState`, mas ainda **não** filtra a lista de disciplinas, apenas alterna visualmente .

## Prints da tela

# Tela Inicial
![alt text](image.png)

