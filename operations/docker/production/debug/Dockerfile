FROM tomcat:8.0-jre8
MAINTAINER Nail Fahrutdinov <nail94.itis@gmail.com>

# Add config files to Tomcat
ADD server.xml /usr/local/tomcat/conf/server.xml
ADD tomcat-users.xml /usr/local/tomcat/conf/tomcat-users.xml

CMD ["catalina.sh", "jpda","run"]