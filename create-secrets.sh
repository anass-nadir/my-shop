#!/bin/bash

services=(auth cart payment product)
for s in "${services[@]}"
do
    kubectl delete secret $s.env
    kubectl delete secret $s-db.env
    kubectl create secret generic $s.env --from-env-file=$PWD/server/$s/.env.production.local
    kubectl create secret generic $s-db.env --from-env-file=$PWD/server/$s/.env.production.mongo
done
