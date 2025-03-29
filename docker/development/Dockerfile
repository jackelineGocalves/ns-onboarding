FROM node:lts-alpine

RUN apk add --no-cache \
        wget \
        bash  \
        openssh \
        git  \
        vim  \
        nano \
        curl
WORKDIR /root
RUN corepack enable && corepack prepare pnpm@latest-8 --activate
RUN pnpm config set store-dir /root/.cache/pnpm/store
WORKDIR /app
ENV SHELL=/bin/bash
CMD ["/bin/bash"]