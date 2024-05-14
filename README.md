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
    path: <optional - default is ./>
```
