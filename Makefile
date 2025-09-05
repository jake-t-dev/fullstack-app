.PHONY: server-up server-down client

server-up:
	cd server && docker-compose up --build

server-down:
	cd server && docker-compose down --volumes

client:
	cd client && npm install && npm run dev