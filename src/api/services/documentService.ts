import { document } from '../endpoints/documentEndPoint'
import { GET_API } from '../methods'

/*
  `vehicleTypeId` scopes the list to one vehicle type. The backend returns
  documents with no vehicle types attached (they apply to everyone) plus the
  ones attached to this type — so a Bike driver is asked for PUC and RC while a
  Car driver is not, entirely from the admin configuration.

  Omitting it keeps the old behaviour: filter by `type` alone.
*/
export const documentType = async ({
  type,
  vehicleTypeId,
}: {
  type: string
  vehicleTypeId?: number | string | null
}) => {
  const scope = vehicleTypeId ? `&vehicle_type_id=${vehicleTypeId}` : ''
  return GET_API(`${document}?type=${type}${scope}`)
    .then(res => {
      return res
    })
    .catch(e => {
      return e?.response
    })
}

const documentServices = {
  documentType,
}

export default documentServices
