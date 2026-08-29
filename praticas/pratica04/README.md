# Atividade 01 — Meu Diário Acadêmico

Disciplina: Programação para Dispositivos Móveis (React Native / Expo)
Aluno: João Vitor Rodrigues dos Santos

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

## Prints da tela


![tela inicial](./prints/tela-inicial.png)
