interface Social {
  platform: string
  handle: string
  url: string
}

export const CONTACT = {
  email: 'hello@letusbrandworks.com',
  whatsapp: {
    number: '+60143693225',
    display: '+6014-369 3225',
    url: 'https://wa.me/60143693225',
  },
  socials: [] as Social[],
  // Uncomment and fill in when ready:
  // socials: [
  //   { platform: 'Instagram', handle: '@letusbrandworks', url: 'https://instagram.com/letusbrandworks' },
  //   { platform: 'LinkedIn', handle: 'Letus Brandworks', url: 'https://linkedin.com/company/letusbrandworks' },
  //   { platform: 'Facebook', handle: 'Letus Brandworks', url: 'https://facebook.com/letusbrandworks' },
  // ] as Social[],
}
