import { UserType, UserGender } from "@/models/users";

export const mockUser = {
  id: 1,
  name: "João da Silva",
  email: "joao.silva@alumni.fatec.br",
  enrollmentYear: 2019,
  userType: UserType.ALUMNI,
  course: "Análise e Desenvolvimento de Sistemas",
  gender: UserGender.MALE,
  description:
    "Desenvolvedor full stack apaixonado por tecnologia e inovação. Formado pela FATEC Sorocaba em 2022, atualmente trabalhando na área de produtos SaaS. Amo compartilhar conhecimento e contribuir com a comunidade.",
  localWorkplace: "TechSorocaba – Sorocaba, SP",
};

export const profileStats = [
  { label: "Conexões", value: "142" },
  { label: "Publicações", value: "27" },
  { label: "Eventos", value: "8" },
];
