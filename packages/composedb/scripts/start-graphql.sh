#\/usr/bin/bash

BLUE='\033[0;34m'
BBLUE='\033[1;34m'
BGREEN='\033[1;32m'
BYELLOW='\033[1;33m'
NC='\033[0m'

set -o allexport; source .env; set +o allexport

printf "${BLUE}Start graphql server on port ${GRAPHQL_PORT} 🚀
${NC}"

node ./scripts/start-graphql.js
