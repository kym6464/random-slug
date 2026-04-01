# random-slug

A CLI tool for generating random word slugs.

## Usage

```sh
npx random-slug [words] [options]
```

By default, generates a single 1-word slug in kebab-case:

```
$ random-slug
delightful
```

### Options

```
Usage: random-slug [options] [words]

Generate random word slugs

Arguments:
  words                                number of words per slug (default: "1")

Options:
  -n, --count <n>                      number of slugs to generate (default: "1")
  -f, --format <format>                output format: kebab, camel, sentence, lower, title (default: "kebab")
  --adjective-categories <categories>  comma-separated adjective categories (appearance, color, condition, personality, quantity,
                                       shapes, size, sounds, taste, time, touch)
  --noun-categories <categories>       comma-separated noun categories (animals, business, education, family, food, health, media,
                                       people, place, profession, religion, science, sports, technology, thing, time,
                                       transportation)
  --count-combinations                 print total unique slug combinations and exit
  -h, --help                           display help for command
```

### Examples

```sh
# Generate 5 slugs
random-slug -n 5

# 2-word slug in title case
random-slug 2 -f title

# Only use color adjectives and animal nouns
random-slug --adjective-categories color --noun-categories animals

# Count possible combinations
random-slug --count-combinations
```

## Credits

Powered by [random-word-slugs](https://github.com/nas5w/random-word-slugs)
