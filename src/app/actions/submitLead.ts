'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface LeadData {
  name: string
  email: string
  whatsapp?: string
  services: string[]
  business: string
  industry: string
  brief?: string
}

export async function submitLead(data: LeadData): Promise<{ success: boolean; error?: string }> {
  try {
    const servicesText = data.services.join(', ')
    const submittedAt = new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })

    // Send to Google Sheets
    const sheetRes = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp || '',
        services: servicesText,
        business: data.business,
        industry: data.industry,
        brief: data.brief || '',
      }),
    })

    if (!sheetRes.ok) {
      console.error('Google Sheets error:', await sheetRes.text())
    }

    // Send email notification via Resend
    await resend.emails.send({
      from: 'Letus Leads <leads@mail.letusbrandworks.com>',
      to: process.env.CONTACT_EMAIL!,
      replyTo: data.email,
      subject: `New Lead — ${data.business}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #f05a28; padding: 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Lead from Letus Website</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">${submittedAt}</p>
          </div>
          <div style="background: #faf9f6; padding: 32px; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #777; font-size: 13px; width: 140px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; font-weight: 600;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #777; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px;"><a href="mailto:${data.email}" style="color: #f05a28;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #777; font-size: 13px;">WhatsApp</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px;">${data.whatsapp || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #777; font-size: 13px;">Services</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px;">${servicesText}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #777; font-size: 13px;">Business</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px;">${data.business}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #777; font-size: 13px;">Industry</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px;">${data.industry}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #777; font-size: 13px; vertical-align: top;">Brief</td>
                <td style="padding: 10px 0; font-size: 14px; line-height: 1.6;">${data.brief || '—'}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
    })

    return { success: true }
  } catch (err) {
    console.error('submitLead error:', err)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
