FROM cpoepke/mountebank-basis:latest

ADD test/mb/ /mb/

EXPOSE 2525
EXPOSE 8010
EXPOSE 8124

CMD ls /mb
CMD mb --configfile mb/imposters.ejs --allowInjection
