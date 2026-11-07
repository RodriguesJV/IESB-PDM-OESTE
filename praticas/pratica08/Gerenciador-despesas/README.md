# 💸 Gerenciador de Despesas

Aplicativo de controle financeiro desenvolvido em **React Native (Expo)** como atividade prática da disciplina de Programação para Dispositivos Móveis (IESB). O projeto expande o gerenciador visto em aula com **categorização de despesas** e **filtro dinâmico por categoria**.

## ✨ Funcionalidades

- Listagem de **todas as despesas** e das **despesas recentes** (últimos 7 dias)
- Cadastro, edição e exclusão de despesas
- **Categorias**: Alimentação, Transporte, Lazer e Contas
- **Filtro dinâmico por categoria** na tela de todas as despesas, com recálculo automático do total
- Validação de formulário (descrição, valor e categoria obrigatórios)
- Campo de valor limitado a **duas casas decimais** via Regex
- Seleção de data com `@react-native-community/datetimepicker`
- **Bônus:** o total fica em **vermelho** quando ultrapassa R$ 200,00

## 🛠️ Tecnologias

- [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/) (SDK 57)
- [React Navigation](https://reactnavigation.org/) (Native Stack + Bottom Tabs)
- [@react-native-community/datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker)
- Context API + `useState` para o estado global das despesas

## 📁 Estrutura do projeto

```
Gerenciador-despesas/
├── App.js
└── src/
    ├── components/
    │   └── despesa/
    │       ├── DespesaItem.js        # item da lista (data, descrição, valor e tag de categoria)
    │       ├── DespesaLista.js       # FlatList com keyExtractor
    │       ├── DespesaSaida.js       # junta sumário + lista (reutilizado nas duas telas)
    │       ├── DespesaSumario.js     # soma com .reduce() e indicador visual
    │       └── FiltroCategoria.js    # chips de filtro por categoria
    ├── screens/
    │   ├── TodasDespesas.js          # lista completa + filtro com .filter()
    │   ├── DespesasRecentes.js       # despesas dos últimos 7 dias
    │   └── GerenciarDespesa.js       # formulário de cadastro/edição
    ├── store/
    │   └── despesas-context.js       # contexto com as despesas e ações (add/update/delete)
    ├── constants/
    │   └── categorias.js             # lista de categorias
    └── util/
        └── data.js                   # formatação e cálculo de datas
```

## 🧠 Como os requisitos foram atendidos

| Requisito | Onde está |
|---|---|
| Campo `categoria` nas despesas | `store/despesas-context.js` |
| Estado `categoria` com `useState` + seletor com `Pressable` | `screens/GerenciarDespesa.js` |
| Regex `/^\d*\.?\d{0,2}$/` para duas casas decimais | `screens/GerenciarDespesa.js` |
| Validação de descrição, valor e categoria | `screens/GerenciarDespesa.js` |
| Tag de categoria no item | `components/despesa/DespesaItem.js` |
| Soma com `.reduce()` e `R$` + `.toFixed(2)` | `components/despesa/DespesaSumario.js` |
| Filtro com `.filter()` | `filtrarPorCategoria` em `screens/TodasDespesas.js` |
| Reutilização do `DespesaSaida` com a lista filtrada | `screens/TodasDespesas.js` |
| Bônus: total vermelho acima de R$ 200 | `components/despesa/DespesaSumario.js` |

## 🚀 Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS)
- App **Expo Go** no celular (Android ou iOS) ou um emulador configurado

### Passos

```bash
# 1. Clone o repositório e entre na pasta do projeto
git clone <url-do-repositorio>
cd praticas/pratica08/Gerenciador-despesas

# 2. Instale as dependências
npm install

# 3. Inicie o projeto
npx expo start
```

Escaneie o QR code com o **Expo Go** (celular e computador na mesma rede Wi-Fi) ou pressione `a` para abrir no emulador Android.

> ⚠️ **Atenção:** o `DateTimePicker` e o `Alert.alert` não funcionam no navegador (`w`). Para testar o formulário completo, use o Expo Go ou um emulador.

## 🧪 Roteiro de testes

- [ ] A aba **Recentes** mostra apenas despesas dos últimos 7 dias
- [ ] A aba **Todas** mostra todas as despesas
- [ ] Os chips de categoria filtram a lista e o total é recalculado
- [ ] O total acima de R$ 200,00 aparece em vermelho
- [ ] O botão **+** abre o formulário de nova despesa
- [ ] O campo de valor não aceita mais de duas casas decimais
- [ ] Salvar sem descrição, valor ou categoria exibe um alerta
- [ ] Tocar em uma despesa abre a edição, com opção de excluir
