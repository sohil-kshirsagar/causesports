#convert yaml to json
yaml2json nodejsServer/api/swagger/swagger.yaml --pretty  > nodejsServer/api/swagger/swagger.json
#generate client code
swagger-codegen generate -i nodejsServer/api/swagger/swagger.yaml -l typescript-angular2 -o client/src/app/codegen
