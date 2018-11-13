#!/usr/bin/env bash

cd ..
mvn tomcat7:redeploy -DskipTests
