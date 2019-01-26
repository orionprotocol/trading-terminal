export JAVA_OPTS="
-Dcom.sun.management.jmxremote
-Dcom.sun.management.jmxremote.local.only=false
-Dcom.sun.management.jmxremote.authenticate=false
-Dcom.sun.management.jmxremote.port=9010
-Dcom.sun.management.jmxremote.rmi.port=9010
-Djava.rmi.server.hostname=***REMOVED***
-Dcom.sun.management.jmxremote.ssl=false"

export CATALINA_OPTS="$CATALINA_OPTS -Xmx3072m"
