# actions-converter


A collection of codemods for actions-converter.

## Usage

To run a specific codemod from this project, you would run the following:

```
npx actions-converter <TRANSFORM NAME> path/of/files/ or/some**/*glob.js

# or

yarn global add actions-converter
actions-converter <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Local Usage
```
node ./bin/cli.js <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`