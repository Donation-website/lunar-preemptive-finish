// components/CheckoutEmail.js
export function generateConfirmationEmail(parcel, email) {
  return `
Hello,

Thank you for purchasing lunar parcel #${parcel.id}.

Parcel Details:
- Size: ${parcel.size} km²
- Price: $${parcel.price}
- Status: ${parcel.sold ? 'Sold' : 'Purchased'}

Your certification number: ${parcel.certification || 'Not yet issued'}

Please keep this email for your records.

Regards,
Lunar Pre-Emptive Rights Team
  `
}
