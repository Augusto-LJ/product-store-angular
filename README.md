# 🏪 ProductStore 🏪

Aplicação web para gerenciamento de produtos, desenvolvida com **Angular 22** e **TypeScript**, com foco em uma arquitetura organizada por funcionalidades, consumo de API REST e boas práticas do ecossistema Angular.

O projeto implementa um fluxo completo de **CRUD de produtos**, permitindo visualizar, cadastrar, editar e excluir produtos através de uma interface construída com **Angular Material**. Para desenvolvimento local, a aplicação utiliza **JSON Server** como API REST simulada.

## ✨ Funcionalidades

- 📋 **Listagem de produtos**
- ➕ **Cadastro de produtos**
- ✏️ **Edição de produtos**
- 🗑️ **Exclusão de produtos com confirmação**
- ✅ **Validação de formulários**
- 🔔 **Feedback visual das operações através de SnackBar**
- 🔄 **Integração com API REST**
- 🧩 **Componentes reutilizáveis**
- ⚡ **Carregamento de componentes sob demanda**
- 📦 **Organização por features e componentes compartilhados**

O produto possui atualmente os campos:

- `id`
- `title`
- `description`

O projeto também separa o modelo de domínio (`Product`) do payload utilizado nas operações de criação e edição (`ProductPayload`).

---

## 🛠️ Tecnologias

### Frontend

- **Angular 22**
- **TypeScript 6**
- **Angular Router**
- **Angular Material**
- **Angular CDK**
- **RxJS**
- **SCSS**
- **Reactive Forms**

### Backend / API

- **JSON Server**
- API REST simulada utilizando `db.json`

### Ferramentas

- **Angular CLI**
- **npm**
- **Prettier**
- **Vitest**

As dependências do projeto estão definidas no `package.json`, incluindo Angular 22, Angular Material, RxJS, JSON Server, TypeScript 6 e Prettier.

---
# 📸 Demonstração
## Lista de produtos
<img width="1919" height="944" alt="image" src="https://github.com/user-attachments/assets/d96f6531-c61e-4d46-879e-9725c66d8f85" />

## Tela de criação/edição
<img width="1919" height="943" alt="image" src="https://github.com/user-attachments/assets/486f15bc-963a-455d-83e8-cebaaa0deded" />

 ## Mensagem de confirmação de deleção
 <img width="1919" height="942" alt="image" src="https://github.com/user-attachments/assets/ade0802a-4c6d-4a9c-ab3e-d7471343ffce" />

---

## 🏗️ Arquitetura

O projeto utiliza uma organização baseada em **features**, separando as funcionalidades da aplicação de componentes, serviços e contratos compartilhados.

```text
src/
└── app/
    ├── features/
    │   ├── create/
    │   │   ├── create.ts
    │   │   ├── create.html
    │   │   └── create.scss
    │   │
    │   ├── edit/
    │   │   ├── edit.ts
    │   │   ├── edit.html
    │   │   └── edit.scss
    │   │
    │   └── list/
    │       ├── list.ts
    │       ├── list.html
    │       ├── list.scss
    │       └── components/
    │
    └── shared/
        ├── components/
        │   ├── back-to-list/
        │   ├── form/
        │   └── header/
        │
        ├── interfaces/
        │   ├── product.interface.ts
        │   └── payload.product.interface.ts
        │
        ├── resolvers/
        │   ├── get-product.resolver.ts
        │   └── get-products.resolver.ts
        │
        └── services/
            ├── products.service.ts
            └── confirmation-dialog.ts
```

A separação entre `features` e `shared` facilita a manutenção e evita concentrar toda a lógica da aplicação em um único conjunto de componentes.

---

## 🔄 Fluxo da aplicação

A aplicação utiliza o **Angular Router** para controlar as principais telas:

| Rota | Funcionalidade |
|---|---|
| `/` | Listagem de produtos |
| `/create-product` | Cadastro de produto |
| `/edit-product/:id` | Edição de produto |

A listagem utiliza um **Resolver** para buscar os produtos antes da renderização da página. A edição também utiliza um Resolver para carregar previamente o produto correspondente ao `id`.

O cadastro e a edição utilizam um componente de formulário compartilhado, baseado em **Reactive Forms**, com validação dos campos obrigatórios.

### Comunicação com a API

A comunicação HTTP é centralizada no serviço `Products`, responsável pelas operações:

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE  /api/products/:id
```

Essa abordagem mantém a responsabilidade de comunicação com a API separada dos componentes de apresentação.

Durante o desenvolvimento, as requisições `/api` são encaminhadas pelo proxy do Angular para o JSON Server executando na porta `3000`.

---

## 📋 Principais decisões técnicas

### Standalone Components

A aplicação utiliza a abordagem moderna de componentes standalone do Angular, permitindo declarar diretamente as dependências de cada componente e reduzindo a necessidade de módulos tradicionais.

### Angular Signals

A listagem utiliza `signal<Product[]>` para representar o estado dos produtos e atualizar a interface de forma reativa após operações como exclusão.

### Lazy Loading

As páginas de criação e edição são carregadas através de `loadComponent`, evitando o carregamento antecipado desses componentes:

```typescript
loadComponent: () =>
  import('./features/create/create').then(m => m.Create)
```

Essa abordagem contribui para uma aplicação mais modular e permite carregar determinadas funcionalidades somente quando são acessadas.

### Route Resolvers

Os Resolvers são utilizados para buscar dados necessários antes da ativação das rotas.

Isso permite que a tela de listagem receba os produtos já carregados e que a tela de edição receba diretamente o produto correspondente à rota.

### Reactive Forms

O formulário compartilhado utiliza `ReactiveFormsModule`, `FormGroup`, `FormControl` e `Validators`, mantendo a validação e o estado do formulário de maneira estruturada.

### Componentização

Elementos reutilizáveis, como formulário, cabeçalho, botão de retorno e diálogo de confirmação, foram isolados em `shared/components`, reduzindo duplicação e facilitando futuras alterações.

---

## 🚀 Como executar

### Pré-requisitos

Antes de começar, certifique-se de possuir:

- [Node.js](https://nodejs.org/)
- npm
- Angular CLI 22

### 1. Clone o repositório

```bash
git clone https://github.com/Augusto-LJ/product-store-angular.git

cd product-store-angular
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie a API

Em um terminal separado, execute:

```bash
npx json-server db.json
```

O JSON Server ficará disponível em:

```text
http://localhost:3000
```

O arquivo `db.json` funciona como uma base de dados local para os produtos.

### 4. Inicie a aplicação Angular

Em outro terminal:

```bash
npm start
```

A aplicação estará disponível em:

```text
http://localhost:4200
```

O projeto já possui o `proxy.config.json` configurado para encaminhar chamadas `/api` para o JSON Server.

---

## 📦 Build

Para gerar uma versão otimizada da aplicação:

```bash
npm run build
```

Os artefatos de build são gerados no diretório:

```text
dist/
```

A configuração de produção utiliza otimizações e `outputHashing`, além de limites de tamanho definidos para o bundle inicial e estilos dos componentes.

---

## 📁 Estrutura de responsabilidades

| Diretório | Responsabilidade |
|---|---|
| `features/` | Funcionalidades principais da aplicação |
| `features/list/` | Listagem e gerenciamento dos produtos |
| `features/create/` | Cadastro de produtos |
| `features/edit/` | Edição de produtos |
| `shared/components/` | Componentes reutilizáveis |
| `shared/interfaces/` | Contratos e modelos TypeScript |
| `shared/services/` | Comunicação com API e serviços compartilhados |
| `shared/resolvers/` | Carregamento antecipado de dados |
| `db.json` | Base de dados utilizada pelo JSON Server |
| `proxy.config.json` | Proxy entre Angular e API local |

---

## 🎯 Objetivos técnicos

Este projeto foi desenvolvido com foco em praticar e demonstrar conceitos importantes do desenvolvimento frontend moderno com Angular:

- Arquitetura baseada em funcionalidades
- Componentização e reutilização
- Standalone Components
- Angular Signals
- Angular Router
- Lazy Loading
- Route Resolvers
- Reactive Forms
- Validação de formulários
- Consumo de APIs REST
- Separação de responsabilidades
- Tipagem com TypeScript
- Angular Material
- Organização de código voltada à manutenção e escalabilidade

---

## 📌 Possíveis evoluções

Como próximos passos, o projeto pode evoluir para:

- [ ] Implementação de testes unitários para componentes e serviços
- [ ] Testes end-to-end
- [ ] Tratamento global de erros HTTP
- [ ] Loading states durante operações assíncronas
- [ ] Paginação e filtros na listagem
- [ ] Busca de produtos
- [ ] Integração com uma API backend real
- [ ] Autenticação e autorização
- [ ] Dockerização da aplicação
- [ ] Pipeline de CI/CD

---

## 👨‍💻 Sobre o projeto

O **ProductStore** é um projeto de portfólio desenvolvido para demonstrar conhecimentos práticos em **Angular, TypeScript, consumo de APIs REST, arquitetura frontend, componentização e desenvolvimento de aplicações CRUD**.

Mais do que uma aplicação de cadastro, o projeto busca aplicar recursos modernos do ecossistema Angular e manter uma estrutura próxima à utilizada em aplicações reais, com separação de responsabilidades, componentes reutilizáveis e organização por domínio funcional.
