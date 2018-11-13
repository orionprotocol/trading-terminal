#!/usr/bin/env bash
PROFILE=$1

cd ..
mvn clean package -P$PROFILE tomcat7:redeploy -DskipTests
