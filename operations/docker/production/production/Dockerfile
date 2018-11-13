FROM tomcat:8.0-jre8
MAINTAINER Nail <nail94.itis@gmail.com>

# Add config files to Tomcat
ADD server.xml /usr/local/tomcat/conf/server.xml
ADD tomcat-users.xml /usr/local/tomcat/conf/tomcat-users.xml
ADD keystore.jks /usr/local/tomcat/conf/keystore.jks

CMD ["catalina.sh","run"]