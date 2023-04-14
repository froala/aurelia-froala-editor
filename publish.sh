

if [ ${TRAVIS_PULL_REQUEST} != "false" ];  then echo "Not publishing a pull request !!!" && exit 0; fi

npm config set strict-ssl false
npm install -g npm-cli-login 
npm-cli-login --scope @froala-org -u ${NEXUS_USER} -p ${NEXUS_USER_PWD} -e dummy-email@noemail@froala.com -r ${NEXUS_URL}/repository/Froala-npm

echo "seting up nexus as default registry to publish ..."
npm-cli-login -u ${NEXUS_USER} -p ${NEXUS_USER_PWD} -e dummy-email@noemail@froala.com -r ${NEXUS_URL}/repository/Froala-npm
jq '.publishConfig |= . + {"registry": "https://nexus.tools.froala-infra.com/repository/Froala-npm/" }' package.json  > new.file && cat new.file > package.json && rm -f new.file
PACKAGE_NAME=`jq '.name' version.json | tr -d '"'` 
PACKAGE_VERSION=`jq '.version' version.json | tr -d '"'`
echo "Package name : ${PACKAGE_NAME}"
jq --arg froalaeditor "file:${PACKAGE_NAME}-${PACKAGE_VERSION}.tgz" '.dependencies["froala-editor"] |= $froalaeditor' package.json  > new.file && cat new.file > package.json && rm -f new.file
export DEFAULT_NAME=`cat package.json | jq '.name '`
export DEFAULT_NAME=`sed -e 's/^"//' -e 's/"$//' <<<"$DEFAULT_NAME"`
echo ${DEFAULT_NAME}
export AURELIA_EDITOR_NAME=${DEFAULT_NAME}-${TRAVIS_BRANCH}
jq --arg newval "$AURELIA_EDITOR_NAME" '.name |= $newval' package.json > tmp.json && mv tmp.json package.json
npm publish

