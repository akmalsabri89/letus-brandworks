export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-MY', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}
