import { useState } from 'react';
import './styles/global.css';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Forms Structure
const createUserFormSchema = z.object({
  name: z.string()
    .nonempty('O nome é obrigatório'),
  email: z.string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z.string()
    .min(6, 'A senha preciso de no mínimo 6 caracteres'),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export function App() {
  const [output, setOutput] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2))
  }
 
  return (
    <main className="h-screen bg-zinc-50 flex flex-col gap-10 items-center justify-center">
      <form 
        onSubmit={handleSubmit(createUser)} // High-order function
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome</label>
          <input 
            type="text"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3" 
            {...register('name')}
          />
          {errors.email && <span>{errors.name?.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="e-mail">E-mail</label>
          <input 
            type="email"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3" 
            {...register('email')}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3" 
            {...register('password')}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button 
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600 transition"
        >
          Submit
        </button>     
      </form>

      <pre>{output}</pre>
    </main>
  )
}