export function buildProposalText(quote) {
  const lines = [
    `Proposal: ${quote.title}`,
    `Prepared for: ${quote.preparedFor || 'Client'}`,
    '',
    'Design details',
    `- Type: ${quote.type}`,
    `- Color: ${quote.color}`,
    `- Shape: ${quote.shape}`,
    `- Name: ${quote.name || 'Not specified'}`,
    `- Accessories: ${quote.accessories.length ? quote.accessories.join(', ') : 'None'}`,
    '',
    'Pricing',
    `- Base price: $${quote.basePrice}`,
    `- Accessory surcharge: $${quote.accessorySurcharge}`,
    `- Premium surcharge: $${quote.premiumSurcharge}`,
    `- Total: $${quote.total}`,
  ];

  return lines.join('\n');
}
