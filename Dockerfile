FROM python:3.7-alpine

# ONLY DEVELOPMENT MODE (inplace editing)

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

ENTRYPOINT [ "mkdocs" ]
CMD [ "serve", "--dev-addr=0.0.0.0:8000" ]