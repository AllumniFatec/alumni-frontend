# React Hook Form + Zod - Guia Completo

Este projeto utiliza **React Hook Form** para gerenciamento de formulários e **Zod** para validação de esquemas. Este README documenta todos os conceitos, padrões e implementações utilizadas.

## 📋 Índice

- [Instalação](#instalação)
- [Zod - Validação de Esquemas](#zod---validação-de-esquemas)
- [React Hook Form - Gerenciamento de Estado](#react-hook-form---gerenciamento-de-estado)
- [Modos de Validação](#modos-de-validação)
- [Objetos Destruturados do useForm](#objetos-destruturados-do-useform)
- [Controller para Componentes Customizados](#controller-para-componentes-customizados)
- [Exemplos Práticos](#exemplos-práticos)
- [Boas Práticas](#boas-práticas)

## 🚀 Instalação

```bash
npm install react-hook-form zod @hookform/resolvers
```

## 🔍 Zod - Validação de Esquemas

### Definindo um Schema

```typescript
import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z.string().min(4, "Nome completo é obrigatório"),
    email: z.email("E-mail inválido"),
    entryYear: z
      .string()
      .min(4, "Ano de ingresso inválido")
      .max(4, "Ano de ingresso inválido"),
    course: z.string().nonempty("Selecione um curso"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(100, "A senha deve ter no máximo 100 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], // Campo onde o erro será exibido
  });
```

### Validações Zod Disponíveis

```typescript
z.string(); // String obrigatória
z.string().optional(); // String opcional
z.string().min(4, "Mensagem"); // Mínimo de caracteres
z.string().max(100, "Msg"); // Máximo de caracteres
z.email("E-mail inválido"); // Validação de email
z.number(); // Número
z.boolean(); // Booleano
z.date(); // Data
z.enum(["A", "B", "C"]); // Enum
z.array(z.string()); // Array de strings
z.object({}); // Objeto aninhado
```

### Função `refine` para Validações Customizadas

```typescript
.refine((data) => {
  // Validação customizada
  return data.password === data.confirmPassword;
}, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"] // Campo que receberá o erro
})
```

### Inferindo Tipos do Zod

```typescript
// Opção 1: Inferir automaticamente
export type SignUpData = z.infer<typeof signUpSchema>;

// Opção 2: Definir manualmente (usado no projeto)
export type SignUpData = {
  fullName: string;
  email: string;
  entryYear: string;
  course: string;
  password: string;
  confirmPassword: string;
};
```

## 🎯 React Hook Form - Gerenciamento de Estado

### Configuração Básica

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const {
  register,
  handleSubmit,
  control,
  clearErrors,
  setError,
  watch,
  reset,
  formState: { errors, isValid, isSubmitting },
} = useForm<SignUpData>({
  resolver: zodResolver(signUpSchema),
  mode: "onSubmit", // Modo de validação
  defaultValues: {
    fullName: "",
    email: "",
    // ... outros campos
  },
});
```

## 📊 Modos de Validação

### Comparação dos Modos

| Modo        | Quando Valida                       | Performance | Uso Recomendado                |
| ----------- | ----------------------------------- | ----------- | ------------------------------ |
| `onSubmit`  | Apenas no submit                    | ⭐⭐⭐⭐⭐  | Formulários simples            |
| `onBlur`    | Ao sair do campo                    | ⭐⭐⭐⭐    | Validação intermediária        |
| `onChange`  | A cada mudança                      | ⭐⭐        | **Evitar** - muito custoso     |
| `onTouched` | Após primeiro blur, depois onChange | ⭐⭐⭐⭐    | **Recomendado** - melhor UX    |
| `all`       | Em todos os eventos                 | ⭐          | **Evitar** - máxima sobrecarga |

### Exemplos de Uso

```typescript
// Para formulários simples
useForm({ mode: "onSubmit" });

// Para melhor experiência do usuário
useForm({ mode: "onTouched" });

// Para validação ao sair dos campos
useForm({ mode: "onBlur" });

// Para cotações em tempo real (com debounce)
useForm({ mode: "onChange" });
```

### Quando Usar Debounce

```typescript
import { useDebounce } from "use-debounce";

// Para cotações em tempo real
const birthDate = watch("birthDate");
const [debouncedBirthDate] = useDebounce(birthDate, 500);

useEffect(() => {
  if (debouncedBirthDate) {
    calculateQuote(debouncedBirthDate);
  }
}, [debouncedBirthDate]);
```

## 🎮 Objetos Destruturados do useForm

### Métodos Principais

```typescript
const {
  // ===== REGISTRO DE CAMPOS =====
  register, // Registra campos input normais

  // ===== CONTROLE DE FORMULÁRIO =====
  handleSubmit, // Wrapper para função de submit
  control, // Para componentes customizados (Controller)

  // ===== GERENCIAMENTO DE ERROS =====
  clearErrors, // Remove erros: clearErrors() ou clearErrors("campo")
  setError, // Define erros manuais

  // ===== OBSERVADORES =====
  watch, // Observa mudanças em campos

  // ===== CONTROLE DE ESTADO =====
  reset, // Reseta formulário
  setValue, // Define valor de campo
  getValues, // Obtém valores atuais

  // ===== ESTADO DO FORMULÁRIO =====
  formState: {
    errors, // Objeto com erros atuais
    isValid, // Se formulário está válido
    isSubmitting, // Se está fazendo submit
    isDirty, // Se formulário foi modificado
    isSubmitted, // Se já foi submetido
    touchedFields, // Campos que foram tocados
    dirtyFields, // Campos que foram modificados
  },
} = useForm();
```

### Exemplos de Uso dos Métodos

#### `register` - Campos Simples

```typescript
<Input
  {...register("email")}
  type="email"
  placeholder="E-mail"
  error={errors.email?.message}
/>
```

#### `handleSubmit` - Submit do Formulário

```typescript
const onSubmit = (data: FormData) => {
  console.log(data);
};

<form onSubmit={handleSubmit(onSubmit)}>
```

#### `setError` - Erros Manuais

```typescript
// Erro em campo específico
setError("email", {
  type: "server",
  message: "Este e-mail já está cadastrado",
});

// Erro geral do formulário
setError("root", {
  type: "server",
  message: "Erro no servidor",
});
```

#### `watch` - Observar Mudanças

```typescript
// Observar um campo
const email = watch("email");

// Observar múltiplos campos
const [email, password] = watch(["email", "password"]);

// Observar todos os campos
const allValues = watch();
```

#### `reset` - Resetar Formulário

```typescript
// Resetar para valores padrão
reset();

// Resetar com novos valores
reset({
  email: "novo@email.com",
  password: "",
});
```

## 🎛️ Controller para Componentes Customizados

### Quando Usar Controller

Use `Controller` para componentes que **não são** `<input>`, `<select>` ou `<textarea>` nativos:

- Componentes de UI libraries (Material-UI, Ant Design, etc.)
- Componentes customizados
- Componentes que não seguem o padrão `value`/`onChange`

### Implementação Completa

```typescript
import { Controller } from "react-hook-form";

<Controller
  name="course" // Nome do campo no formulário
  control={control} // Objeto control do useForm
  rules={{
    // Validações opcionais (além do Zod)
    required: "Campo obrigatório",
  }}
  render={({
    field, // { value, onChange, onBlur, name }
    fieldState, // { error, isDirty, isTouched }
    formState, // Estado completo do formulário
  }) => (
    <Select
      onValueChange={field.onChange} // Conecta mudanças ao formulário
      value={field.value} // Valor atual do campo
      error={errors.course?.message} // Exibe erros
    >
      <SelectTrigger error={!!errors.course}>
        <SelectValue placeholder="Curso realizado" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ads">
          Análise e Desenvolvimento de Sistemas
        </SelectItem>
        <SelectItem value="gestao-ti">
          Gestão da Tecnologia da Informação
        </SelectItem>
      </SelectContent>
    </Select>
  )}
/>;
```

### Propriedades do `field`

```typescript
render={({ field }) => {
  // field.value     - Valor atual do campo
  // field.onChange  - Função para atualizar o valor
  // field.onBlur    - Função para marcar campo como "touched"
  // field.name      - Nome do campo
}}
```

## 💡 Exemplos Práticos

### Formulário Completo com Validação

```typescript
const SignUpPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched", // Melhor UX
    defaultValues: {
      fullName: "",
      email: "",
      entryYear: "",
      course: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpData) => {
    try {
      await registerUser(data);
      router.push("/dashboard");
    } catch (error) {
      if (error.field === "email") {
        setError("email", {
          type: "server",
          message: "E-mail já cadastrado",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos normais */}
      <Input
        {...register("fullName")}
        placeholder="Nome completo"
        error={errors.fullName?.message}
      />

      {/* Componentes customizados */}
      <Controller
        name="course"
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
            error={errors.course?.message}
          >
            {/* Opções do select */}
          </Select>
        )}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
      </Button>

      <Button
        type="button"
        onClick={() => {
          clearErrors();
          router.push("/sign-in");
        }}
      >
        Cancelar
      </Button>
    </form>
  );
};
```

### Validação Assíncrona

```typescript
const checkEmailExists = async (email: string) => {
  const response = await api.checkEmail(email);
  return response.exists;
};

// No onBlur ou com debounce
const handleEmailBlur = async () => {
  const email = getValues("email");
  if (email && (await checkEmailExists(email))) {
    setError("email", {
      type: "server",
      message: "Este e-mail já está em uso",
    });
  }
};
```

## ✅ Boas Práticas

### 1. **Escolha do Modo de Validação**

- `onSubmit`: Formulários simples, melhor performance
- `onTouched`: Melhor experiência do usuário
- `onBlur`: Para validações que não precisam ser imediatas
- Evite `onChange` sem debounce

### 2. **Gerenciamento de Tipos**

```typescript
// ✅ Prefira inferir do Zod
type FormData = z.infer<typeof schema>;

// ❌ Evite definir tipos duplicados
type FormData = {
  email: string;
  password: string;
};
```

### 3. **Tratamento de Erros**

```typescript
// ✅ Sempre limpe erros ao cancelar
<Button
  type="button"
  onClick={() => {
    clearErrors();
    router.push("/login");
  }}
>
  Cancelar
</Button>

// ✅ Use type="button" para botões que não fazem submit
<Button type="button" onClick={handleCancel}>
```

### 4. **Performance**

```typescript
// ✅ Use watch com cuidado
const email = watch("email"); // OK para um campo

// ❌ Evite observar todos os campos desnecessariamente
const allValues = watch(); // Pode impactar performance
```

### 5. **Validações Complexas**

```typescript
// ✅ Use refine para validações entre campos
.refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

// ✅ Use setError para erros de servidor
setError('email', {
  type: 'server',
  message: 'E-mail já cadastrado'
});
```
