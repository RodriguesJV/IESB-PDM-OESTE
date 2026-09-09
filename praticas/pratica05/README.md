# MetasSemestre

App de metas acadêmicas desenvolvido em React Native (Expo), com componentização,
gerenciamento de estado, eventos e persistência local usando AsyncStorage.

## Disciplina
Programação para Dispositivos Móveis (React Native / Expo) — IESB
Professor: Marcelo Alves Farias

## Objetivo
Aplicar `useState`, props, componentização, `Pressable`, `useEffect` e
`AsyncStorage` em um app de metas acadêmicas com persistência local.

## Funcionalidades
- Cadastro de metas de estudo (texto + id único + data de criação)
- Remoção de metas
- Marcar meta como concluída (estilo riscado)
- Contador de metas pendentes / concluídas no cabeçalho
- Persistência local: os dados sobrevivem ao fechar e reabrir o app
- Validação de campo vazio com `Alert`
- Feedback visual (ripple/pressed) nos botões

## Estrutura do projeto

MetasSemestre/
├── App.js
├── components/
│ ├── MetaInput.js → input de texto + botão de adicionar
│ └── MetaList.js → lista de metas (FlatList)
└── assets/


## Persistência (AsyncStorage)

**useEffect de CARGA** — em `App.js`, logo no início do componente `App`.
Executa uma única vez, ao montar o app (array de dependências `[]`), e busca
os dados salvos na chave `@metas_semestre` para popular o estado `metas`.

**useEffect de SALVAMENTO** — em `App.js`, logo após o de carga.
Executa toda vez que o estado `metas` é alterado (dependência `[metas]`),
salvando o array atualizado no AsyncStorage com `JSON.stringify`.

Ambos os efeitos usam `try/catch` para tratar erros de leitura/escrita e
exibem um `Alert` amigável em caso de falha.

## Como rodar
```bash
npm install
npx expo start
```

## Prints

# Lista Vazia
 ![alt text](MetasSemestre/prints/image1.png)

# Com Itens

![alt text](MetasSemestre/prints/image2.png)

# Após reabrir o app 

![alt text](MetasSemestre/prints/image3.png)