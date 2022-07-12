include .env
export

DIR=$(notdir $(shell pwd))
export DIR


#------------------------------DEVELOPEMENT---------------------------------------------------------------
web-$(MODE)-log:
	@echo -e "\n\t 🎧 🤖 \n\t💻 🔧 💉\n\t🚀 🛸 🛰\n"
	@docker-compose -f docker-compose.$(MODE).yml -p $(DIR) up --build --force-recreate --remove-orphans

web-$(MODE):
	@echo -e "\n\t 🎧 🤖 \n\t💻 🔧 💉\n\t🚀 🛸 🛰\n"
	@docker-compose -f docker-compose.$(MODE).yml -p $(DIR) up --build --force-recreate --remove-orphans -d

web-$(MODE)-down:
	@echo -e "\n\t 🚨 🚧 ⭕️ 🛑 ⛔️\n\n"
	@docker-compose -f docker-compose.$(MODE).yml -p $(DIR) down --remove-orphans

web-$(MODE)-down-clean:
	@echo -e "\n\t 🚨 🚧 ⭕️ 🛑 ⛔️\n\n"
	@docker-compose -f docker-compose.$(MODE).yml -p $(DIR) down --remove-orphans --volumes
#------------------------------DEVELOPEMENT---------------------------------------------------------------

