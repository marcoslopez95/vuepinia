export enum COMMONS_PERMISSIONS {
    INDEX = 'index',
    SHOW = 'show',
    STORE = 'store',
    UPDATE = 'updated',
    DELETE = 'delete',
    RESTORE = 'restore'
}
export enum USERS {
    TITLE = 'Usuarios',
    REFERENCE = 'users'
}

export enum COUNTRIES {
    TITLE = 'Paises',
    REFERENCE = 'countrys'
}

export enum DEPARTAMENTS {
    TITLE = 'Departamentos',
    REFERENCE = 'departments'
}

export enum MUNICIPALITIES {
    TITLE = 'Municipios',
    REFERENCE = 'municipalitys'
}
export enum TYPE_DOCUMENTS {
    TITLE = 'Tipos de documento de usuario',
    REFERENCE = 'type_documents'
}
export enum IMAGES {
    TITLE = 'Imagenes',
    REFERENCE = 'images'
}
export enum BANKS {
    TITLE = 'Bancos',
    REFERENCE = 'banks'
}
export enum FAQ_CATEGORIES {
    TITLE = 'Categoria de FAQ',
    REFERENCE = 'categoryFaq'
}
export enum KYC {
    TITLE = 'Kyc',
    REFERENCE = 'kyc'
}
export enum TICKET_CATEGORIES {
    TITLE = 'Categoria de tickes',
    REFERENCE = 'category_tickets'
}
export enum FAQ {
    TITLE = 'FAQ',
    REFERENCE = 'faq'
}
export enum CURRENCIES {
    TITLE = 'Monedas',
    REFERENCE = 'currency'
}
export enum TYPE_ACCOUNTS {
    TITLE = 'Tipos de Cuentas de la compañía',
    REFERENCE = 'typeCompanyAccounts'
}
export enum ACCOUNTS {
    TITLE = 'Cuentas de la compañía',
    REFERENCE = 'companyBankAccount'
}
export enum TYPE_BANK_ACCOUNTS {
    TITLE = 'Tipos de Cuentas de banco',
    REFERENCE = 'typeCompanyAccounts'
}
export enum CLIENT_ACCOUNTS {
    TITLE = 'Cuentas de el cliente',
    REFERENCE = 'clientAccount'
}
export enum CURRENCY_TYPES {
    TITLE = 'Tipos de moneda',
    REFERENCE = 'typeCurrency'
}
export enum COMPANY_WALLETS {
    TITLE = 'Wallets de la compañia',
    REFERENCE = 'companyWallet'
}
export enum CLIENT_WALLETS {
    TITLE = 'Wallets de el cliente',
    REFERENCE = 'clientWallet'
}
export enum METHOD_PAYMENTS {
    TITLE = 'Tipos de pago',
    REFERENCE = 'paymentTypes'
}
export enum SHIPPING_TYPES {
    TITLE = 'Tipos de envio',
    REFERENCE = 'shippingTypes'
}
export enum ORDERS {
    TITLE = 'Ordenes',
    REFERENCE = 'orders'
}
export enum PAYMENT_SUBTYPE {
    TITLE = 'Subtipos de pago',
    REFERENCE = 'subPaymentType'
}
export enum PENALTY_TYPES {
    TITLE = 'Tipo de penalizacion',
    REFERENCE = 'typePenalty'
}
export enum PENALTIES {
    TITLE = 'Penalizacion',
    REFERENCE = 'penalty'
}
export enum PERMISS_CATEGORIES {
    TITLE = 'Categoria de permisos',
    REFERENCE = 'permissionCategory'
}
export enum PAYMENT_NETWORKS {
    TITLE = 'Redes de pago',
    REFERENCE = 'red'
}
export enum ROLES {
    TITLE = 'Roles',
    REFERENCE = 'roles'
}
export enum PERMISSIONS {
    TITLE = 'Permisos',
    REFERENCE = 'permissions'
}
export enum SETTINGS {
    TITLE = 'configuracion general',
    REFERENCE = 'configurations'
}
export enum DEPOSIT_EXTERNAL {
    TITLE = 'Compras externas',
    REFERENCE = 'external_purchases'
}

export type PERMISSION_ENUM = 
COMMONS_PERMISSIONS |
USERS |
COUNTRIES |
DEPARTAMENTS |
MUNICIPALITIES |
TYPE_DOCUMENTS |
IMAGES |
BANKS |
FAQ_CATEGORIES |
KYC |
TICKET_CATEGORIES |
FAQ |
CURRENCIES |
TYPE_ACCOUNTS |
ACCOUNTS |
TYPE_BANK_ACCOUNTS |
CLIENT_ACCOUNTS |
CURRENCY_TYPES |
COMPANY_WALLETS |
CLIENT_WALLETS |
METHOD_PAYMENTS |
SHIPPING_TYPES |
ORDERS |
PAYMENT_SUBTYPE |
PENALTY_TYPES |
PENALTIES |
PERMISS_CATEGORIES |
PAYMENT_NETWORKS |
ROLES |
PERMISSIONS |
SETTINGS |
DEPOSIT_EXTERNAL 