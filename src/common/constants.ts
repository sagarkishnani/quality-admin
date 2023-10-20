export const ConstantHttpErrors = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    PROHIBITED: 403,
    DUPLICATED: 409,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502
}

export const ConstantRoles = {
    LIDER_FUNCIONAL: '103305bc-58b9-40c2-a017-7dcae0b07028',
    ADMINISTRADOR_TI: '7a4af493-d279-4dd8-be2c-afb56c08e480',
    TECNICO: '508ed316-0aef-47e7-b4a8-655c44b45630',
    USUARIO: 'aee6e3c3-1843-4b0e-a0c1-0a2165a5c9be'
}

export const ConstantTicketStatus = {
    PENDIENTE: '95e1c52c-b66f-4c03-8a36-a76029d80f94',
    EN_PROGRESO: '99c38c1f-365c-4cf8-8a6c-0667f4693280',
    ATENDIDO: '6bcf6b09-cfb6-4132-a4ad-ae41d97d1dd5',
    FINALIZADO: '76371a4e-7e7c-48f0-bed3-dcecd6b18737',
    CANCELADO: '0ee92009-9ea0-41bd-b819-f8447ddf55d3',
}

export const ConstantTicketTypes = {
    FACTURABLE: '670b81bc-fc0d-48a9-96b5-122d0e32ba86',
    NO_FACTURABLE: 'bd3d04aa-6d00-4922-9cd0-cd7c704cf197',
}

export const ConstantMessage = {
    SERVICE_ERROR: 'Error en el servidor',
    SERVICE_DUPLICATED: 'El elemento ya existe'
}

export const ConstantCompanyMessage = {
    COMPANY_REGISTER_SUCCESS: 'La empresa se registró correctamente',
    COMPANY_LOGO_NOT_UPLOADED: 'Logo de empresa es obligatorio',
    COMPANY_LOGO_ERROR: 'Error al subir imagen'
}

export const ConstantTicketMessage = {
    TICKET_REGISTER_SUCCESS: 'El ticket se registró correctamente',
    TICKET_ASSIGNED_SUCCESS: 'Se asignó a un técnico correctamente',
    TICKET_CANCEL_QUESTION: '¿Está seguro de cancelar el ticket?',
    TICKET_FACTURABLE: 'El servicio técnico debe ser',
    TICKET_CANCEL_SUCCESS: 'El ticket se canceló correctamente',
    TICKET_CANCEL_ERROR: 'Hubo un error al cancelar',
}

export const ConstantMasterTableMessage = {
    MT_REGISTER_SUCCESS: 'El item se registró correctamente',
    MT_EDIT_SUCCESS: 'El item se actualizó correctamente',
    MT_DELETE_SUCCESS: 'El item se eliminó correctamente',
    MT_DELETE_ERROR: 'Hubo un error al eliminar',
    MT_DELETE_QUESTION: '¿Está seguro de eliminar el item?'
}

export const ConstantUserMessage = {
    USER_INCORRECT: 'El usuario o contraseña es incorrecto.',
    USER_DELETE_QUESTION: '¿Está seguro de eliminar el usuario?'
}

export const ConstantsMasterTable = {
    DEVICES: '00100',
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
    ID_COMPANY: 'localStorageIdCompany',
    ID_MASTER_TABLE: 'localStorageIdMasterTable',
    ID_TICKET: 'localStorageIdTicket',
    ID_USER: 'localStorageIdUser',
    TICKET_STEP_THREE_FORM_ONE: 'localStorageTicketStepThreeFormOne',
    TICKET_STEP_THREE_FORM_TWO: 'localStorageTicketStepThreeFormTwo',
    TICKET_STEP_THREE_FORM_THREE: 'localStorageTicketStepThreeFormThree',
    TICKET_STEP_THREE_FORM_FOUR: 'localStorageTicketStepThreeFormFour',
    TICKET_STEP_THREE_FORM_FIVE: 'localStorageTicketStepThreeFormFive',
    USER: 'localStorageUser'
}

export const ConstantStorageBuckets = {
    COMPANY: 'companies',
    USER: 'users'
}