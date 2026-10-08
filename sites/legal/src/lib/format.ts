const dateFmt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

export const formatDate = (iso: string) => dateFmt.format(new Date(`${iso}T12:00:00`))

export const pad = (n: number) => String(n).padStart(2, '0')
