# Dependencies

- Python ^3.10 (recommend you use [Pyenv](https://github.com/pyenv/pyenv#installation) to manage Python versions)

# Quick Start

## Installation

Install [Poetry](https://python-poetry.org/docs/) if you don't have it yet

```shell
$ pip install poetry
```

From inside the `server` folder, install the dependencies with

```shell
$ poetry install
```

After installing the dependencies you should install the git hooks

```shell
$ poetry run task prepare
```

## Running

Update your database (uses sqlite for now, so no need to install anything)

```shell
$ poetry run task db-upgrade
```

Run the start command

```shell
$ poetry run task dev
```

### Migrations

After you make any changes in the `model` folder you will need to create a new migration file with the migrate command

```shell
$ poetry run task db-migrate "<my migration message here>"
```

Also, migrations don't run by themselves, you will also need to run the upgrade command

```shell
$ poetry run task db-upgrade
```