FROM python:3.7

WORKDIR /usr/src/app

RUN pip install mkdocs
RUN pip install mkdocs-material

EXPOSE 8000

ENTRYPOINT [ "mkdocs" ]
CMD [ "serve", "--dev-addr=0.0.0.0:8000" ]