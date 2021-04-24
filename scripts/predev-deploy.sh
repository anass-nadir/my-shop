#!/usr/bin/env bash
set -e

deploy_secrets() {
      echo "🤫 Deploying secrets ..."
      for service_location in $PWD/app/server/services/*; do
            service_name=${service_location##*/}
            service_env=$service_location/.env.development.local
            service_db_env=$service_location/.env.development-db.local

            if [ ! -f $service_env ] || [ ! -f $service_db_env ]; then
                  [ ! -f $service_env ] && echo "👉 ${service_env} doesn't exist. 😃"
                  [ ! -f $service_db_env ] && echo "👉 ${service_db_env} doesn't exist. 😃"
                  continue
            fi
            if ! kubectl get secret $service_name.env; then
                  kubectl create secret generic $service_name.env --from-env-file=$service_env
            fi

            if ! kubectl get secret $service_name-db.env; then
                  kubectl create secret generic $service_name-db.env --from-env-file=$service_db_env
            fi

      done

      client_env=$PWD/app/client/.env.development.local

      if [ ! -f $client_env ]; then
            echo "👉 ${client_env} does not exist. 😃"
      fi

      if ! kubectl get secret client.env; then
            kubectl create secret generic client.env --from-env-file=$client_env
      fi
}
deploy_databases() {
      echo "🚀 Deploying Databases ..."
      kubectl apply -f $PWD/infra/k8s/dev/databases/
}

deploy_services() {
      echo "🚀 Deploying Services ..."
      kubectl apply -f $PWD/infra/k8s/dev/services/
}

title="Pre Dev Deployments"
options=("(1: Secrets)" "(2: Databases)" "(3: Services)" "(4: All)" "(5|s: Skip)")
prompt="Would you like to deploy ? ${options[@]} :"

echo "$title"
PS3="$prompt"
select opt in "${options[@]}"; do
      case "$REPLY" in
      1) deploy_secrets ;;
      2) deploy_databases ;;
      3) deploy_services ;;
      4)
            deploy_secrets
            deploy_databases
            deploy_services
            ;;
      5 | s)
            echo "Leaving Pre Dev Deployments!"
            break
            ;;
      *)
            echo "Invalid option. Available options ${options[@]}"
            continue
            ;;
      esac
done
