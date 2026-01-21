'use server'

import { revalidatePath } from 'next/cache'

export async function refreshContent(path: string = '/') {
  revalidatePath(path)
}