[![Build Status](https://travis-ci.org/insales/insales-docs-source.svg?branch=master)](https://travis-ci.org/insales/insales-docs-source)

# Документации по InSales, liquid, common.js и прочим темным вещам

Каталог docs содержит исходники документации.

## Добавление, проверка результатов

Установка

```
pip install --no-cache-dir -r requirements.txt
```

Запуск локального сервера

`mkdocs serve`

## Docker

Используем Docker для запуска локального сервера

```
docker-compose build docs
docker-compose up
```

или

```
docker-compose up --build
```

После запуска сервер будет доступен по адресу http://localhost:8000

## Сборка документации

Сборка документации делается с помощью GitHub CI при каждом коммите в мастер.
