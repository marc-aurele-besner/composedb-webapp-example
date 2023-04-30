#\/usr/bin/bash

BLUE='\033[0;34m'
BBLUE='\033[1;34m'
BGREEN='\033[1;32m'
BYELLOW='\033[1;33m'
NC='\033[0m'

ALL_MODELS_FILENAME="allModels"

if test -f .env; then
    printf "${BLUE}.env file found. Using it...
${NC}"
else
    printf "🛑${BYELLOW}No .env file found. Please run dev first...
${NC}"
fi

set -o allexport; source .env; set +o allexport

if [ -d ${GENERATED_DIR}/models ]; then
    rm -rf ${GENERATED_DIR}/models
fi

cp -r ${MODELS_DIR} ${GENERATED_DIR}/models

modelsFiles=`ls $GENERATED_DIR/models/*.graphql`

echo "$($modelsFiles  | wc -l)" > $GENERATED_DIR/pending-relations.txt

while [ -f $GENERATED_DIR/pending-relations.txt ]
do
    runOnce=true
    for eachfile in $modelsFiles
    do
        base_name=$(basename ${eachfile})
        file_name="${base_name%.*}"

        printf "${BLUE}Generate composite from model: ${eachfile} 📦
        ${NC}"
        composedb composite:create $eachfile --ceramic-url="${CERAMIC_URL}" --did-private-key="${COMPOSEDB_ADMIN_PK}" --output=${COMPOSITE_DIR}/${file_name}.json

        printf "${BLUE}Deploy composite for model: ${file_name} 🚀
        ${NC}"
    done

    node ./scripts/format-composite.js
    node ./scripts/fix-models-relations.js
done

if test -f ${GENERATED_DIR}/models-ids.txt; then
    printf "${BLUE} list of models ids found in ${GENERATED_DIR}/models-ids.txt
${NC}"
    modelsIds=`cat ${GENERATED_DIR}/models-ids.txt`
    modelsNames=`cat ${GENERATED_DIR}/models-names.txt`

    printf "${BLUE}Generate composite from models Ids: ${modelsIds} 📦
    ${NC}"
    composedb composite:merge ${modelsNames} --output=${COMPOSITE_DIR}/${ALL_MODELS_FILENAME}.json

    printf "${BLUE}Deploy composite for models Ids: ${modelsIds} 🚀
    ${NC}"
    composedb composite:deploy ${COMPOSITE_DIR}/${ALL_MODELS_FILENAME}.json --ceramic-url="${CERAMIC_URL}" --did-private-key="${COMPOSEDB_ADMIN_PK}"

    printf "${BLUE}Compile JS definitons for models Ids: ${modelsIds} 💾
    ${NC}"

    composedb composite:compile ${COMPOSITE_DIR}/${ALL_MODELS_FILENAME}.json ${DEFINITION_DIR}/${ALL_MODELS_FILENAME}.js

    printf "${BLUE}Prettier allModels.json and allModels.js 💄
    ${NC}"
    npx prettier --write ${COMPOSITE_DIR}/${ALL_MODELS_FILENAME}.json
    npx prettier --write ${DEFINITION_DIR}/${ALL_MODELS_FILENAME}.js
else
    printf "🛑${BYELLOW}No models Ids found in ${GENERATED_DIR}/models-ids.txt
${NC}"
fi
