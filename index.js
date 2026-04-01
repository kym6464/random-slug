#!/usr/bin/env node

import { program } from "commander";
import { generateSlug, totalUniqueSlugs } from "random-word-slugs";

const ADJECTIVE_CATEGORIES = [
  "appearance",
  "color",
  "condition",
  "personality",
  "quantity",
  "shapes",
  "size",
  "sounds",
  "taste",
  "time",
  "touch",
];

const NOUN_CATEGORIES = [
  "animals",
  "business",
  "education",
  "family",
  "food",
  "health",
  "media",
  "people",
  "place",
  "profession",
  "religion",
  "science",
  "sports",
  "technology",
  "thing",
  "time",
  "transportation",
];

function parseCategories(value, valid, label) {
  const categories = value.split(",").map((c) => c.trim());
  const invalid = categories.filter((c) => !valid.includes(c));
  if (invalid.length > 0) {
    console.error(
      `Invalid ${label} categories: ${invalid.join(", ")}\nValid options: ${valid.join(", ")}`
    );
    process.exit(1);
  }
  return categories;
}

program
  .name("random-slug")
  .description("Generate random word slugs")
  .argument("[words]", "number of words per slug", "3")
  .option("-n, --count <n>", "number of slugs to generate", "1")
  .option(
    "-f, --format <format>",
    "output format: kebab, camel, sentence, lower, title",
    "kebab"
  )
  .option(
    "--adjective-categories <categories>",
    `comma-separated adjective categories (${ADJECTIVE_CATEGORIES.join(", ")})`
  )
  .option(
    "--noun-categories <categories>",
    `comma-separated noun categories (${NOUN_CATEGORIES.join(", ")})`
  )
  .option("--count-combinations", "print total unique slug combinations and exit")
  .action((words, options) => {
    const numWords = parseInt(words, 10);
    if (isNaN(numWords) || numWords < 1) {
      console.error("[words] must be a positive integer");
      process.exit(1);
    }

    const validFormats = ["kebab", "camel", "sentence", "lower", "title"];
    if (!validFormats.includes(options.format)) {
      console.error(
        `Invalid format: ${options.format}\nValid options: ${validFormats.join(", ")}`
      );
      process.exit(1);
    }

    const slugOptions = { format: options.format };

    if (options.adjectiveCategories) {
      slugOptions.categories = slugOptions.categories || {};
      slugOptions.categories.adjective = parseCategories(
        options.adjectiveCategories,
        ADJECTIVE_CATEGORIES,
        "adjective"
      );
    }

    if (options.nounCategories) {
      slugOptions.categories = slugOptions.categories || {};
      slugOptions.categories.noun = parseCategories(
        options.nounCategories,
        NOUN_CATEGORIES,
        "noun"
      );
    }

    if (options.countCombinations) {
      const total = totalUniqueSlugs(numWords, slugOptions);
      console.log(total);
      return;
    }

    const numSlugs = parseInt(options.count, 10);
    if (isNaN(numSlugs) || numSlugs < 1) {
      console.error("--count must be a positive integer");
      process.exit(1);
    }

    for (let i = 0; i < numSlugs; i++) {
      console.log(generateSlug(numWords, slugOptions));
    }
  });

program.parse();
