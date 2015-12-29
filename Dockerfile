FROM cpoepke/mountebank-basis:latest

ADD test/mb/ /mb/
RUN ln -s /usr/bin/nodejs /usr/bin/node

EXPOSE 2525
EXPOSE 8010
EXPOSE 8124

CMD mb --configfile mb/imposters.ejs --allowInjection
