# easyware-io/get-version@v1

![CI](https://github.com/easyware-io/get-version/actions/workflows/build.yml/badge.svg)

Get version of an app.

## Usage

### Basic usage

```yaml
- name: Get version of app
  uses: easyware-io/get-version@v1
  with:
    app: angular || quarkus
```

### Parameters

#### `app`

Valid values are `angular` and `quarkus`.

#### `path`

Optional. Path of file to read in case of not root directory. Default is `./`

#### `error-on-unknown`

Optional. If true, throws error if version is not found. Default is false.

### Outputs

#### `version`

String containing the app version number. If not found, returns `null`.
