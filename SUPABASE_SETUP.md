# Guia de Configuração do Supabase - CalmaMentev2

Este guia detalha como configurar o backend do CalmaMentev2 usando Supabase.

## 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Preencha:
   - **Name**: CalmaMentev2
   - **Database Password**: (escolha uma senha forte)
   - **Region**: escolha a mais próxima (ex: South America - São Paulo)
5. Clique em "Create new project"
6. Aguarde a criação (pode levar alguns minutos)

## 2. Configurar o Banco de Dados

### 2.1. Executar o Schema SQL

1. No painel do Supabase, vá em **SQL Editor** (menu lateral)
2. Clique em "New query"
3. Copie todo o conteúdo do arquivo `supabase-schema.sql`
4. Cole no editor
5. Clique em "Run" (ou pressione Ctrl+Enter)
6. Verifique se todas as tabelas foram criadas sem erros

### 2.2. Verificar Tabelas Criadas

Vá em **Table Editor** e confirme que as seguintes tabelas existem:
- `users`
- `content`
- `sessions`
- `mood_checks`

## 3. Configurar Storage para Áudios

### 3.1. Criar Bucket

1. Vá em **Storage** no menu lateral
2. Clique em "Create a new bucket"
3. Preencha:
   - **Name**: `audios`
   - **Public bucket**: ✅ Marque como público
4. Clique em "Create bucket"

### 3.2. Configurar Políticas de Acesso

1. Clique no bucket `audios`
2. Vá em "Policies"
3. Adicione uma política de leitura pública:

```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'audios' );
```

## 4. Adicionar Conteúdos de Áudio

### 4.1. Upload de Áudios

1. Vá em **Storage** > `audios`
2. Clique em "Upload file"
3. Faça upload dos seus arquivos de áudio (.mp3)
4. Anote as URLs dos arquivos

### 4.2. Inserir Registros na Tabela Content

1. Vá em **Table Editor** > `content`
2. Clique em "Insert row"
3. Preencha os campos:

**Exemplo - Respiração:**
```
title: Respiração Calmante
audio_url: https://seu-projeto.supabase.co/storage/v1/object/public/audios/respiracao.mp3
category: respiracao
duration_seconds: 300
offline_available: true
```
https://vaxfjwdcndvchoukvmps.supabase.co/storage/v1/object/public/audios/RespiracaoCalmante.mp3
**Exemplo - Desaceleração:**
```
title: Desaceleração Mental
audio_url: https://seu-projeto.supabase.co/storage/v1/object/public/audios/desaceleracao.mp3
category: desaceleracao
duration_seconds: 480
offline_available: true
```

**Exemplo - Grounding:**
```
title: Grounding 5-4-3-2-1
audio_url: https://seu-projeto.supabase.co/storage/v1/object/public/audios/grounding.mp3
category: grounding
duration_seconds: 420
offline_available: true
```

**Exemplo - Relaxamento:**
```
title: Relaxamento Progressivo
audio_url: https://seu-projeto.supabase.co/storage/v1/object/public/audios/relaxamento.mp3
category: relaxamento_progressivo
duration_seconds: 600
offline_available: true
```

## 5. Obter Credenciais do Projeto

### 5.1. API Keys

1. Vá em **Settings** > **API**
2. Copie as seguintes informações:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (chave longa)

### 5.2. Configurar no App

O arquivo `.env.local` já existe na raiz do projeto com as credenciais atuais:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...sua_chave_aqui
```

⚠️ **IMPORTANTE**: Nunca commite o arquivo `.env.local` no Git!

## 6. Testar a Configuração

### 6.1. Testar Autenticação

1. Execute o app: `npm run dev`
2. Tente criar uma conta
3. Verifique se o usuário aparece em:
   - **Authentication** > **Users**
   - **Table Editor** > `users`

### 6.2. Testar Sessões

1. Faça login no app
2. Verifique se as sessões aparecem na Home
3. Tente iniciar uma sessão
4. Verifique se o áudio toca corretamente

### 6.3. Verificar Dados

Após usar o app, verifique no Supabase:
- **Table Editor** > `sessions` - deve ter registros de sessões
- **Table Editor** > `mood_checks` - deve ter check-ins salvos

## 7. Segurança e Políticas RLS

### 7.1. Verificar RLS Ativado

Vá em **Authentication** > **Policies** e confirme que as políticas estão ativas:

- ✅ Users podem ver apenas seu próprio perfil
- ✅ Users podem criar/ver apenas suas próprias sessões
- ✅ Users podem criar/ver apenas seus próprios mood checks
- ✅ Content são públicos (leitura para todos)

### 7.2. Testar Isolamento de Dados

1. Crie dois usuários diferentes
2. Faça login com cada um
3. Confirme que cada usuário vê apenas seus próprios dados

## 8. Monitoramento

### 8.1. Logs

Vá em **Logs** para ver:
- Requisições de API
- Erros
- Queries lentas

### 8.2. Database

Vá em **Database** > **Usage** para monitorar:
- Tamanho do banco
- Número de conexões
- Performance

## 9. Backup (Recomendado)

### 9.1. Backup Automático

Supabase faz backups automáticos diários (plano gratuito: 7 dias de retenção)

### 9.2. Backup Manual

1. Vá em **Database** > **Backups**
2. Clique em "Create backup"
3. Aguarde a conclusão

## 10. Troubleshooting

### Erro: "Invalid API key"
- Verifique se copiou a chave correta
- Confirme que o arquivo `.env.local` está na raiz do projeto
- Reinicie o servidor após alterar `.env.local`

### Erro: "Row Level Security policy violation"
- Verifique se as políticas RLS foram criadas corretamente
- Execute novamente o script `supabase-schema.sql`

### Áudio não carrega
- Verifique se o bucket `audios` é público
- Confirme que a URL do áudio está correta
- Teste a URL diretamente no navegador

### Usuário não é criado na tabela users
- Verifique se o trigger `on_auth_user_created` foi criado
- Veja os logs em **Logs** > **Postgres Logs**

## 11. Recursos Adicionais

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage](https://supabase.com/docs/guides/storage)

## 12. Limites do Plano Gratuito

- 500 MB de banco de dados
- 1 GB de storage
- 2 GB de transferência/mês
- 50 MB de tamanho máximo de arquivo
- Projeto pausa após 1 semana de inatividade

Para produção, considere upgrade para plano Pro.

---

**Configuração concluída!** Seu backend está pronto para uso.
