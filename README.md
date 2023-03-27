# nihongo-go

Japanese vocab quiz created based on Udemy JLPT L5 course. Various of coding techniques/tooling will also be experimented.

## Local dev

- At repo root, run `lerna run start`

### Turn repo into Lerna monorepo

- Run `npm i --global lerna`
- Copy existing package.json into temp location
- At repo root, run `lerna init`
- `cd packages`. Create an empty folder
- Move project source and built-artifact to folder
- Copy the package.json from temp location back to new folder

### Add new package to monorepo

- `cd packages`
- `npm init` or use other ways to init a new package
