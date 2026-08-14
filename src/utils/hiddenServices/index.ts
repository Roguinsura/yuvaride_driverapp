/*
  Services temporarily withheld from the pickers.

  Listed by slug, matching `slug` on the /service response. This hides them from
  places where a user *chooses* a service — signup vehicle registration, and the
  fleet add-driver dropdown. It deliberately does NOT filter display paths such
  as Vehicle Details, which resolves a driver's own service name: filtering
  there would make an already-registered driver's service read "Not set".

  To show a service again, delete its slug from this list. Nothing else needs
  changing.
*/
export const HIDDEN_SERVICE_SLUGS: string[] = ['freight']

const isHidden = (service: any): boolean => {
  const slug = String(service?.slug || '')
    .toLowerCase()
    .replace(/[-_\s]/g, '')
  return HIDDEN_SERVICE_SLUGS.some(
    hidden => hidden.replace(/[-_\s]/g, '') === slug,
  )
}

/** Drops hidden services from a /service list. Safe with undefined input. */
export const visibleServices = (services: any[] | undefined | null): any[] => {
  if (!Array.isArray(services)) return []
  return services.filter(service => !isHidden(service))
}
