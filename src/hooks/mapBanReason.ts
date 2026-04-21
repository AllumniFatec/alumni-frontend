import { BanReason } from "@/models/admin";

const banReasonMap: Record<BanReason, string> = {
  [BanReason.Spam]: "Spam",
  [BanReason.Harassment]: "Assédio",
  [BanReason.HateSpeech]: "Discurso de ódio",
  [BanReason.InappropriateContent]: "Conteúdo inapropriado",
  [BanReason.Threats]: "Ameaças",
  [BanReason.Fraud]: "Fraude",
  [BanReason.Scam]: "Golpe",
  [BanReason.Impersonation]: "Falsidade ideológica",
  [BanReason.PrivacyViolation]: "Violação de privacidade",
  [BanReason.UnauthorizedAdvertisement]: "Publicidade não autorizada",
  [BanReason.MaliciousLink]: "Link malicioso",
  [BanReason.MaliciousActivity]: "Atividade maliciosa",
  [BanReason.MultipleViolations]: "Múltiplas violações",
  [BanReason.TermsOfServiceViolation]: "Violação dos Termos de Serviço",
  [BanReason.Others]: "Outros",
};

export function mapBanReason(reason: BanReason): string {
  return banReasonMap[reason];
}

