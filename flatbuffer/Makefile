build:
	rm -rf build
	flatc -o src/messages/ --gen-object-api --ts src/monster.fbs
.PHONY: build

run: build
	yarn build
	yarn start
.PHONY: run
