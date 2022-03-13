include .env
export

DIR=$(notdir $(shell pwd))
export DIR


#------------------------------DEVELOPEMENT---------------------------------------------------------------
web-dev-log:  ## run the api in developement mode with logs
	@echo -e "\n\t 🎧 🤖 \n\t💻 🔧 💉\n\t🚀 🛸 🛰\n"
	@docker-compose -f docker-compose.dev.yml -p $(DIR) up --build --force-recreate --remove-orphans

web-dev: ## run the api in developement mode in background
	@echo -e "\n\t 🎧 🤖 \n\t💻 🔧 💉\n\t🚀 🛸 🛰\n"
	@docker-compose -f docker-compose.dev.yml -p $(DIR) up --build --force-recreate --remove-orphans -d

web-dev-down: ## stop containers
	@echo -e "\n\t 🚨 🚧 ⭕️ 🛑 ⛔️\n\n"
	@docker-compose -f docker-compose.dev.yml -p $(DIR) down --remove-orphans

web-dev-down-clean: ## stop containers and delete all volumes
	@echo -e "\n\t 🚨 🚧 ⭕️ 🛑 ⛔️\n\n"
	@docker-compose -f docker-compose.dev.yml -p $(DIR) down --remove-orphans --volumes
#------------------------------DEVELOPEMENT---------------------------------------------------------------

help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(firstword $(MAKEFILE_LIST)) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

.PHONY: help web-dev-down-clean web-dev-down web-dev web-dev-log
.DEFAULT_GOAL = help