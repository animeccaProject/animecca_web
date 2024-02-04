'use server'

import { cookies } from 'next/headers'

export async function setCookie(name, value) {
  cookies().set(name, value)
}

export async function getCookie(name) {
  const obj = cookies().get(name)
  if (obj) {
    return obj.value
  }
}

export async function deleteCookie(name) {
  cookies().delete(name)
}
