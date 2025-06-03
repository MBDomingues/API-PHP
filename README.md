# 🚀 Projeto de Cadastro de Produtos (Fullstack)

Este é um projeto Fullstack simples para cadastro de produtos, demonstrando a integração entre um frontend desenvolvido em React.js e um backend construído com PHP, utilizando PostgreSQL como banco de dados.

O objetivo principal é oferecer uma API para inserção de dados e uma interface amigável para interagir com essa API.

## ✨ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

**Backend (API):**
* **PHP 8.x:** Linguagem de programação para o servidor.
* **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional.
* **PDO:** Extensão PHP para conexão segura com o banco de dados.
* **XAMPP:** Ambiente de desenvolvimento local (Apache para servidor web, PHP).

**Frontend (Interface Gráfica):**
* **React.js:** Biblioteca JavaScript para construção da interface do usuário.
* **JavaScript (ES6+):** Linguagem de programação do frontend.
* **NPM (Node Package Manager):** Gerenciador de pacotes para o frontend.

## 📦 Funcionalidades

* **Cadastro de Produtos:** Formulário intuitivo para inserir novos produtos.
* **API RESTful:** Endpoint PHP para receber dados de produtos via requisições POST.
* **Persistência de Dados:** Armazenamento dos produtos cadastrados no banco de dados PostgreSQL.
* **Validação de Dados:** Verificação básica dos dados recebidos pela API.
* **Feedback ao Usuário:** Mensagens de sucesso/erro claras no frontend.

## ⚙️ Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar este projeto em sua máquina local.

### **Pré-requisitos:**

Certifique-se de ter o seguinte software instalado:

* [**XAMPP**](https://www.apachefriends.org/index.html) (ou equivalente como WAMP/MAMP)
* [**PostgreSQL**](https://www.postgresql.org/download/) (incluindo o pgAdmin 4)
* [**Node.js e NPM**](https://nodejs.org/) (versão LTS recomendada)
* [**Git**](https://git-scm.com/downloads) (para clonar o repositório)

### **Configuração do Backend (PHP e PostgreSQL):**

1.  **Clone o repositório:**
    Abra seu terminal/Git Bash e execute:
    ```bash
    git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
    cd SEU_REPOSITORIO
    ```
    *(Substitua `SEU_USUARIO` e `SEU_REPOSITORIO` pelos seus dados do GitHub)*

2.  **Mova a pasta `backend` para o `htdocs` do XAMPP:**
    Copie a pasta `backend` (que contém `api_produtos.php` e `conexao.php`) para o diretório `htdocs` do seu XAMPP.
    * **Windows:** `C:\xampp\htdocs\`
    * **macOS:** `/Applications/XAMPP/htdocs/`
    * Após mover, a API estará acessível via `http://localhost/backend/api_produtos.php`.

3.  **Configure o Banco de Dados PostgreSQL:**
    * Abra o **pgAdmin 4**.
    * Conecte-se ao seu servidor PostgreSQL (use a senha do usuário `postgres` que você definiu).
    * Crie um novo banco de dados chamado `minha_api_db`.
        * Clique com o botão direito em `Databases` > `Create` > `Database...`
        * Nomeie como `minha_api_db` e salve.
    * Dentro de `minha_api_db`, clique com o botão direito em `Schemas` > `public` > `Tables` > `Create` > `Table...`
    * Crie a tabela `produtos` com as seguintes colunas:
        * `id`: `serial` (Primary Key, Not Null)
        * `nome`: `character varying(255)` (Not Null)
        * `descricao`: `text`
        * `preco`: `numeric(10, 2)` (Not Null)
        * `data_cadastro`: `timestamp without time zone` (Default: `now()`)

4.  **Configure o `php.ini` do XAMPP:**
    * No Painel de Controle do XAMPP, clique em `Config` ao lado do Apache e selecione `PHP (php.ini)`.
    * Procure e **descomente** (remova o `;`) as seguintes linhas:
        ```ini
        extension=pgsql
        extension=pdo_pgsql
        ```
    * Salve o `php.ini`.
    * **Reinicie o Apache** no Painel de Controle do XAMPP (Stop e depois Start).

5.  **Configure o arquivo de conexão PHP:**
    * Abra `backend/conexao.php` no seu editor de código.
    * Substitua `'SUA_SENHA_DO_POSTGRES'` pela senha real do seu usuário `postgres` do PostgreSQL.

### **Configuração e Execução do Frontend (React.js):**

1.  **Instale as dependências do Node.js:**
    No terminal, navegue até a pasta `frontend` dentro do seu projeto clonado:
    ```bash
    cd frontend
    npm install
    ```
    Este comando irá baixar e instalar todas as dependências do React e outras bibliotecas necessárias.

2.  **Inicie a aplicação React:**
    No mesmo terminal, com a pasta `frontend` ainda selecionada:
    ```bash
    npm start
    ```
    Isso iniciará o servidor de desenvolvimento do React e abrirá a aplicação no seu navegador em `http://localhost:3000/` (ou outra porta, se a 3000 estiver ocupada).

3. **Copie e Cole os arquivos da pasta frontend para o seu "src"**

### **Testando a Aplicação:**

1.  Com o backend (Apache/PHP e PostgreSQL) e o frontend (React) rodando, acesse `http://localhost:3000/` no seu navegador.
2.  Preencha o formulário de cadastro de produtos e clique em "Cadastrar Produto".
3.  Você deverá ver uma mensagem de sucesso na interface, e os dados serão salvos no seu banco de dados PostgreSQL.
4.  Você pode verificar a inserção no pgAdmin 4, clicando com o botão direito na tabela `produtos` e selecionando "View/Edit Data" > "All Rows".

## ➡️ Próximos Passos (Possíveis Melhorias)

* Listar produtos já cadastrados no frontend.
* Funcionalidades de Edição e Exclusão de produtos (CRUD completo).
* Melhorar a validação de dados no backend.
* Adicionar autenticação e autorização à API.
* Usar bibliotecas de UI no React (ex: Material-UI, Ant Design).
* Implementar Docker para facilitar o ambiente de desenvolvimento.

---