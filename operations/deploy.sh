#!/usr/bin/env bash
PROFILE=$1

cd ..
mvn clean package tomcat7:redeploy -DskipTests
