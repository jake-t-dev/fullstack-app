.PHONY: server-up server-down

server-up:
	cd server && docker-compose up --build

server-down:
	cd server && docker-compose down -v