FROM cpoepke/mountebank-basis:latest

ADD resources/imposters /mb/
RUN ln -s /usr/bin/nodejs /usr/bin/node

EXPOSE 2525
EXPOSE 8010
EXPOSE 8124

CMD mb --configfile test/mb/imposters.ejs --allowInjection
