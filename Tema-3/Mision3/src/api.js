export const BASE_URL = "https://dragonball-api.com/api"
export const URL_PERSONAJES = `${BASE_URL}/characters?limit=58`

export function urlDetalle(id) {
  return `${BASE_URL}/characters/${id}`
}
