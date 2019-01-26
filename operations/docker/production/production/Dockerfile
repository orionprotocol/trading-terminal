FROM tomcat:8.0-jre8
MAINTAINER Nail <nail94.itis@gmail.com>

# Add config files to Tomcat
ADD server.xml /usr/local/tomcat/conf/server.xml
ADD tomcat-users.xml /usr/local/tomcat/conf/tomcat-users.xml
ADD setenv.sh /usr/local/tomcat/bin/setenv.sh

CMD ["catalina.sh","run"]