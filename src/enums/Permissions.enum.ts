export enum COMMONS_PERMISSIONS {
    INDEX = 'index',
    SHOW = 'show',
    STORE = 'store',
    UPDATE = 'updated',
    DELETE = 'delete',
    RESTORE = 'restore',
    GET = "get",
}
export enum USERS {
    TITLE = 'Usuarios',
    REFERENCE = 'users',
    REFERREDS= "referreds",
    WALLETS= "wallets",
    PERSONAL_DATA= "personal_data",
    ACCOUNTS= "accounts",
    BANK_ACCOUNTS= "bank_accounts",
    OTHER_ACCOUNTS= "other_accounts",
    SEND_EMAIL= "send_email",
    SEND_SMS= "send_sms",
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
    REFERENCE = 'orders',
    ONLY_USER = "only_user",
    BUY = "buy",
    SELL = "sell",
    ACCEPT = "accept",
    BLOCKED = "blocked",
    EXTERNAL_PURCHASE = "external_purchase",
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
    REFERENCE = 'configurations',
    DASHBOARD= 'dashboard',
    CURRENCY_STADISTIC= 'currency_stadistic'
}
export enum DEPOSIT_EXTERNAL {
    TITLE = 'Compras externas',
    REFERENCE = 'external_purchases'
}
export enum BUSSINESS {
    TITLE = 'Empresas',
    REFERENCE = 'bussiness'
}
export enum KYC_BUSSINESS {
    TITLE = 'KYC Empresas',
    REFERENCE = 'kyc_bussiness'
}
export enum WALLET_XCOP {
    TITLE = 'WALLET_XCOP',
    REFERENCE = 'wallet_xcop',
    RECEIVED = "received",
    SEND = "send",
    WITHDRAWAL = "withdrawal",
    ACCEPT = "accept",
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
DEPOSIT_EXTERNAL  |
BUSSINESS |
KYC_BUSSINESS 