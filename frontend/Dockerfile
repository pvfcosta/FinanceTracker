# Define a imagem base
FROM node:16.15.0 AS build

# Define o diretório de trabalho
WORKDIR /dist/src/app

RUN npm cache clean --force

# Copia os arquivos de dependências

# Instala as dependências

# Copia todos os arquivos para o diretório de trabalho
COPY . .

# Compila o projeto
RUN npm install
RUN npm run build

# Define a imagem base para a execução do projeto
FROM nginx:latest AS runtime

# Copia os arquivos de build para a pasta padrão do Nginx
COPY --from=build /dist/src/app/dist/frontend /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

# Expõe a porta 80 para acesso externo
EXPOSE 80

# O comando de entrada já é o comando padrão do Nginx, não é necessário especificar

