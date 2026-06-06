# BIRTHDAY-MIXER

## Sobre o Projeto

Este projeto consiste em uma aplicação web interativa focada no engajamento social e no planejamento colaborativo de eventos. Desenvolvido com HTML5, CSS3 e JavaScript puro (Vanilla JS), o **BIRTHDAY-MIXER** foi projetado para conectar pessoas que compartilham o mesmo mês ou dia de aniversário, permitindo que planejem, organizem e celebrem datas festivas de forma conjunta em grandes eventos unificados.

A plataforma oferece um ecossistema completo para a criação de festas coletivas. Os usuários podem se cadastrar, gerenciar listas de convidados, mapear e definir locais ideais para os eventos (como salões, bares ou chácaras) e interagir com novos membros que também estão completando ano, facilitando a divisão de custos, o gerenciamento de presença e a criação de grandes conexões sociais durante as comemorações.

---

## Funcionalidades

* **Autenticação e Cadastro:** Telas estruturadas para o registro e validação de novos usuários na plataforma (`signup.html`, `login.html`, `auth.js`).
* **Localizador de Espaços:** Sistema integrado para mapeamento, visualização e escolha de estabelecimentos ou locais parceiros para a realização das festas (`venues.html`, `venues.js`, `maps.js`).
* **Gerenciamento de Presença:** Painel dinâmico para controle de convidados e confirmação de participantes confirmados no evento (`contacts.js`, `main.html`).
* **Painel Administrativo Restrito:** Área dedicada e protegida para os organizadores gerenciarem as permissões gerais e a moderação das festas criadas (`private/admin.html`, `admin.js`).
* **Módulo de Assinaturas e Checkout:** Interface preparada para a adesão de planos estendidos ou taxas de eventos (`premium.html`, `payment.js`).

---

## Tecnologias Utilizadas

* **HTML5** (Estruturação semântica das páginas públicas e privadas)
* **CSS3** (Estilização modular e design responsivo via `style/styles.css`)
* **JavaScript (ES6+)** (Lógica de interatividade front-end, manipulação do DOM e controle de rotas)

---

## Objetivo

O principal objetivo deste projeto é construir uma aplicação de página múltipla (*Multi-Page Application*) escalável e muito bem estruturada no front-end. O foco prático está em trabalhar a organização de módulos JavaScript reutilizáveis (isolando funções de ajuda em `helpers.js`), integrar APIs visuais (como mapas para localização de espaços), e estruturar o controle de acessos dividindo as interfaces visuais em escopos públicos e privados.

---

## Aprendizados

Durante o desenvolvimento deste projeto, foram aplicados conceitos como:

* Organização arquitetural de diretórios focada na segurança do cliente, separando arquivos de controle gerencial (`private/`) de arquivos de acesso livre do usuário (`public/`).
* Implementação de scripts modulares de validação de dados para formulários de login e criação de contas (`auth.js`).
* Manipulação dinâmica de arrays de objetos em JavaScript para listar contatos, convidados e aniversariantes em tempo real na interface gráfica.
* Uso de funções utilitárias assíncronas e utilitários globais de suporte para tratamento de dados e formatação (`helpers.js`).
* Centralização da porta de entrada do aplicativo web por meio do arquivo raiz `index.html`.

---

## Como Executar

1. Clone este repositório em sua máquina local:
```bash
git clone [https://github.com/seu-usuario/BIRTHDAY-MIXER.git](https://github.com/seu-usuario/BIRTHDAY-MIXER.git)
```

2. Acesse a pasta do projeto através do terminal ou gerenciador de arquivos:

```bash
cd BIRTHDAY-MIXER
```

3. Por se tratar de um projeto front-end estruturado, você pode abrir o arquivo index.html diretamente em qualquer navegador web, ou utilizar uma extensão como o Live Server do VS Code para rodar a aplicação em um servidor local.

---

## Estrutura do Projeto

```text
BIRTHDAY-MIXER/
│
├── private/
│   └── admin.html
│
├── public/
│   ├── login.html
│   ├── main.html
│   ├── premium.html
│   ├── signup.html
│   └── venues.html
│
├── scripts/
│   ├── admin.js
│   ├── auth.js
│   ├── contacts.js
│   ├── helpers.js
│   ├── main.js
│   ├── maps.js
│   ├── payment.js
│   └── venues.js
│
├── style/
│   └── styles.css
│
├── index.html
└── README.md
```

---

## Licença
Este projeto foi desenvolvido exclusivamente para fins educacionais e de aprendizado.

Desenvolvido como prática de desenvolvimento web moderno, engenharia de software front-end e arquitetura modular de aplicações com JavaScript, HTML e CSS.
