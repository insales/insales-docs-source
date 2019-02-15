[![Build Status](https://travis-ci.org/insales/insales-docs-source.svg?branch=master)](https://travis-ci.org/insales/insales-docs-source)

# Документации по InSales, liquid, common.js и прочим темным вещам

Каталог docs содержит исходники документации.

## Сборка документации

Сборка документации делается с помощью GitHub CI при каждом коммите в мастер.

## Деплой на стейжинг и в продакшен

GitHub CI также может собрать докер-образ с документацией для деплоя на стейжинг и в продакшен.

- дождаться завершения сборки документации
- запустить задачу `build` и дождаться завершения
- запустить задачу `deploy_to_staging` и проверить результаты на [https://docs-staging.insales.ru](https://docs-staging.insales.ru)
- если нужно запустить задачу `deploy_to_prod` и проверить результаты на [https://docs.liquidhub.ru/](https://docs.liquidhub.ru/)
