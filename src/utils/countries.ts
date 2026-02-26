import countries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'
import ar from 'i18n-iso-countries/langs/ar.json'

// Register languages
countries.registerLocale(en)
countries.registerLocale(ar)

export interface Country {
  code: string
  name: string
}

/**
 * Get all countries with their ISO codes
 * @param locale - Language code (en or ar)
 * @returns Array of countries with code and name
 */
export function getAllCountries(locale: 'en' | 'ar' = 'en'): Country[] {
  const countryObj = countries.getNames(locale, { select: 'official' })
  
  return Object.entries(countryObj)
    .map(([code, name]) => ({
      code,
      name
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Get country name from ISO code
 * @param code - ISO country code (e.g., 'US', 'SA')
 * @param locale - Language code (en or ar)
 * @returns Country name
 */
export function getCountryName(code: string, locale: 'en' | 'ar' = 'en'): string {
  return countries.getName(code, locale) || code
}

/**
 * Validate if country code exists
 * @param code - ISO country code
 * @returns true if valid country code
 */
export function isValidCountryCode(code: string): boolean {
  return countries.isValid(code)
}
