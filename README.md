# Frontend-challenge by Coodesh

O projeto tinha como objetivo apresentar a lista de funcionários da empresa Pharma Inc (fictícia) com a de poder visualizar em um modal todos os dados do pacientes. Nesse modal, existe o campo URL, com ele é possível acessar a aplicação diretamente e obter os dados do paciente. Filtragem do buscador, filtragem na coluna de gênero, testes e docker, faziam parte dos diferenciais do desafio 

## Tecnologias

  - Vue.js
  - Vue-router
  - Vuex
  - Tailwindcss
  - Jest
  - Cypress
  - Vue test utils
  - Axios
  - Docker
  - Github Actions
  - Netlify

## Instalação e execução

  1. Faça um clone desse repositório;
  2. Entre na pasta rodando `cd coodesh-challenge-frontend`;
  3. Rode `yarn install` para instalar as dependências;
  4. Rode `yarn serve` para iniciar o projeto.
  5. Para rodar os teste unitários `yarn test:unit`
  5. Para rodar os teste end-to-end `yarn test:e2e`

## Sobre

O projeto está configurado o CI para rodar os testes unitários e End-to-End utilizando github actions e CD está sendo realizado pela Netlify. Além disso, no projeto está configurado o Docker para criar uma imagem do projeto e facilitar o deploy da aplicação, para isso criado o arquivo Dockerfile com multi-stage build para melhor otimizar o tamanho do projeto e facilitar o deploy em outras plataformas.

Para acessar a página do projeto utilize o link: [Frontend Challenge](https://coodesh-challenge.netlify.app)



### Referência: challenge by coodesh
