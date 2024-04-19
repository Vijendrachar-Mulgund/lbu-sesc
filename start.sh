#!/bin/bash

docker-compose -f backend/finance/docker-compose.yml up -d && docker-compose -f backend/library/docker-compose.yml up -d && docker-compose -f backend/student/docker-compose.yml up -d
