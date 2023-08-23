export const ConstantHttpErrors = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    PROHIBITED: 403,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502
}

export const ConstantMessage = {
    SERVICE_ERROR: 'Error en el servidor',
}

export const ConstantCompanyMessage = {
    COMPANY_REGISTER_SUCCESS: 'La empresa se registró correctamente',
    COMPANY_LOGO_NOT_UPLOADED: 'Logo de empresa es obligatorio',
    COMPANY_LOGO_ERROR: 'Error al subir imagen'
}

export const ConstantMasterTableMessage = {
    MT_REGISTER_SUCCESS: 'El registro se registró correctamente',
    MT_EDIT_SUCCESS: 'El registro se actualizó correctamente',
    MT_DELETE_SUCCESS: 'El registro se eliminó correctamente',
    MT_DELETE_ERROR: 'Hubo un error al eliminar',
    MT_DELETE_QUESTION: '¿Está seguro de eliminar el registro?'
}

export const ConstantsMasterTable = {
    TICKET_STATUS: '00100',
    TICKET_TYPES: '00200',
    AREAS: '00300',
    FLOORS: '00400',
    POSITIONS: '00500',
    CURRENCIES: '00600',
    PAYMENT_CONDITIONS: '00700',
    CE: '00800',
    BANKS: '00900'
}

export const ConstantLocalStorage = {
    ID_MASTER_TABLE: 'localStorageIdMasterTable'
}

export const ConstantStorageBuckets = {
    COMPANY: 'companies'
}