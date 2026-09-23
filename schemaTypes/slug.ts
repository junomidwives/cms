import type {SlugRule} from 'sanity'

// The site is statically generated, so a slug becomes a file path at build
// time. Anything other than lowercase letters, numbers and single hyphens
// (e.g. a trailing space) produces a page that 404s on refresh.
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const slugify = (input: string) =>
  input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
    .replace(/-+$/, '')

export const slugValidation = (Rule: SlugRule) =>
  Rule.custom((value) =>
    !value?.current || SLUG_PATTERN.test(value.current)
      ? true
      : 'Use only lowercase letters, numbers and hyphens, with no spaces (e.g. my-new-page). Click "Generate" to fix it automatically.',
  )
