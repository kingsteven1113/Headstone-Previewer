export function buildQuote(project) {
  const basePrice = 2200;
  const accessorySurcharge = (project?.accessories?.length || 0) * 175;
  const premiumSurcharge = project?.type === 'Die_And_Base' ? 350 : 0;
  const total = basePrice + accessorySurcharge + premiumSurcharge;

  return {
    id: project?.id || 'quote-preview',
    title: project?.title || 'Memorial proposal',
    summary: project?.wording ? `Custom wording: ${project.wording}` : 'Custom memorial design proposal',
    type: project?.type || 'Custom design',
    color: project?.color || 'Custom color',
    shape: project?.shape || 'Custom shape',
    name: project?.name || 'Custom name',
    accessories: project?.accessories || [],
    basePrice,
    accessorySurcharge,
    premiumSurcharge,
    total,
    generatedAt: new Date().toISOString(),
  };
}
