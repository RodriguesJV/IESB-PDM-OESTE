Atividade-screen

Estrutura de navegação de um aplicativo de controle de despesas feito com React Native (Expo) e React Navigation, combinando navegação em abas (Bottom Tabs) com empilhamento de telas (Native Stack) e um componente reutilizável de botão com ícone.

Objetivo
Aninhar um Bottom Tab Navigator dentro de um Native Stack Navigator
Criar um botão no cabeçalho que navega para outra tela da pilha
Construir um componente reutilizável (IconButton) com feedback visual ao toque
Tecnologias
React Native
Expo
React Navigation (native, bottom-tabs, native-stack)
@expo/vector-icons (Ionicons)
react-native-screens e react-native-safe-area-context
Estrutura do projeto
Atividade-screen/
├── assets/
├── components/
│   └── IconButton.js
├── screens/
│   ├── DespesasRecentes.js
│   ├── TodasDespesas.js
│   └── GerenciarDespesa.js
├── App.js
├── app.json
└── package.json
Navegação
NavigationContainer
└── Stack Navigator
    ├── Despesas (BottomTabScreen, header oculto)
    │   └── Tab Navigator
    │       ├── DespesasRecentes  -> aba "Recentes" (ícone hourglass)
    │       └── TodasDespesas     -> aba "Todas" (ícone wallet-outline)
    └── GerenciarDespesa
Navegador	Tela	Título	Rótulo da aba	Ícone
Tab	DespesasRecentes	Despesas Recentes	Recentes	hourglass
Tab	TodasDespesas	Todas as Despesas	Todas	wallet-outline
Stack	Despesas	(sem cabeçalho)	-	-
Stack	GerenciarDespesa	Gerenciar Despesa	-	-

O cabeçalho das abas possui um IconButton (ícone +) no canto direito que executa navigation.navigate('GerenciarDespesa').

Componente IconButton

Localizado em components/IconButton.js.

Prop	Tipo	Descrição
icon	string	Nome do ícone do Ionicons
size	number	Tamanho do ícone
color	string	Cor do ícone
onPress	function	Função executada ao pressionar

Ao ser pressionado, o botão aplica opacity: 0.5 usando a propriedade pressed do Pressable.

Exemplo de uso:

jsx
<IconButton
  icon="add"
  size={24}
  color="#000"
  onPress={() => navigation.navigate('GerenciarDespesa')}
/>
Como executar
Pré-requisitos
Node.js (versão LTS)
npm
Aplicativo Expo Go no celular ou um emulador Android/iOS
Passos
bash
# 1. Clonar o repositório
git clone <url-do-repositorio>

# 2. Entrar na pasta do projeto
cd praticas/Atividade-screen

# 3. Instalar as dependências
npm install

# 4. Iniciar o projeto
npx expo start

Depois, escaneie o QR Code com o Expo Go ou pressione a (Android) / i (iOS) para abrir no emulador.

Se algo se comportar de forma estranha, limpe o cache com npx expo start -c.

Dependências instaladas
bash
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context @expo/vector-icons
Funcionalidades
 Navegação em abas com ícones e rótulos personalizados
 Navegação em pilha aninhada às abas
 Botão no cabeçalho que leva à tela GerenciarDespesa
 Componente reutilizável com feedback visual ao toque