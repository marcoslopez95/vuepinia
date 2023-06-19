import type { KYC_STATUS } from "@/enums/Kyc.enum";
import type { BaseModel } from "@/interfaces/Base.model";
import type { TypeDocument } from "@/interfaces/TypeDocument/TypeDocument.model";

export declare interface Kyc extends BaseModel<KycAttributes,KycRelationships> {}

export declare interface KycRelationships {
  typeDocument: TypeDocument;
}

export declare interface KycAttributes {
  user_id: number;
  country_id: number;
  type_documents_id: number;
  document: string;
  front_identity_document_status: KYC_STATUS;
  reverse_identity_document_status: KYC_STATUS;
  selfie_identity_document_status: KYC_STATUS;
  status: KYC_STATUS;
  created_at: string;
  updated_at: string;
  url_aws_front: string;
  url_aws_reverse: string;
  url_aws_selfie: string;
}