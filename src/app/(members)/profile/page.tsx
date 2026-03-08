import { Section } from "@/components/Section";
import { Mail, MapPin, Briefcase, GraduationCap, Calendar } from "lucide-react";
import { UserType, UserGender } from "@/models/users";

const mockUser = {
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

const profileStats = [
  { label: "Conexões", value: "142" },
  { label: "Publicações", value: "27" },
  { label: "Eventos", value: "8" },
];

export default function ProfilePage() {
  return (
    <div>
      <Section title="Meu Perfil">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm text-left">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-primary/80 to-primary" />

          {/* Avatar + basic info */}
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-10 mb-4">
              <div className="size-20 rounded-full border-4 border-white bg-primary/10 flex items-center justify-center text-primary text-3xl font-black shadow">
                {mockUser.name.charAt(0)}
              </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              {mockUser.name}
            </h2>
            <p className="text-sm text-slate-500 mb-1">{mockUser.userType}</p>

            {mockUser.description && (
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                {mockUser.description}
              </p>
            )}

            {/* Stats */}
            <div className="flex gap-6 mt-4 py-4 border-y border-slate-100">
              {profileStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-lg font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Mail className="size-4 text-primary" />
                {mockUser.email}
              </div>
              {mockUser.localWorkplace && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Briefcase className="size-4 text-primary" />
                  {mockUser.localWorkplace}
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <GraduationCap className="size-4 text-primary" />
                {mockUser.course}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar className="size-4 text-primary" />
                Ingressou em {mockUser.enrollmentYear}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="size-4 text-primary" />
                Sorocaba, SP
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
