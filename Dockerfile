# Stage 1: Build the React app
FROM node:18-alpine as build

WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 종속성 파일 복사
COPY package.json pnpm-lock.yaml ./

# 의존성 설치
RUN pnpm install --frozen-lockfile

COPY . ./

RUN pnpm build

# Stage 2: Serve the app using nginx
FROM nginx:alpine

# Nginx 설정 파일 복사
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
