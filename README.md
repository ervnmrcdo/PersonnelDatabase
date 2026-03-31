# Awards Form Database

A Next.js 16 application for managing award form submissions (IPA, IPC awards) for university faculty and staff. Built with Supabase for authentication, database, and storage.

## Features

- **User Authentication** - Three user roles: Teaching, Non-Teaching, and Admin
- **Award Submission** - Submit publications for various awards (IPA Award - Journal, IPA Award - Book)
- **Form Management** - Generate and manage PDF forms (4.1, 4.2, 4.3, 4.4)
- **Review Workflow** - Admin can review, validate, or return submissions
- **Document Editing** - Integrated OnlyOffice for document editing
- **Publication Tracking** - Track publications and their associated awards

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS
- **Backend**: Supabase (Auth, Database, Storage)
- **Document Server**: OnlyOffice (via Docker)
- **Database**: PostgreSQL

## Prerequisites

- Node.js 18 or later
- Docker and Docker Compose
- Supabase account
- Git

## Project Structure

```
awards-form-database/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── teaching/          # Teaching staff pages
│   ├── nonteaching/       # Non-teaching staff pages
│   ├── login/             # Login page
│   └── ...
├── components/            # React components
│   ├── Dashboard/         # Dashboard components
│   ├── Profile/           # Profile components
│   ├── Review/            # Review workflow components
│   ├── Submissions/       # Submission components
│   └── Sidebar/           # Navigation sidebar
├── context/               # React contexts
│   ├── AuthContext.tsx     # Authentication state
│   ├── AwardsFlowContext.tsx
│   ├── ReviewFlowContext.tsx
│   └── SubmissionsFlowContext.tsx
├── lib/                    # Utilities and configurations
│   ├── types.tsx          # TypeScript interfaces
│   └── supabase/          # Supabase client configurations
├── public/                # Static assets
│   ├── *.pdf              # PDF form templates
│   └── *.docx             # Word document templates
├── supabase/              # Supabase configurations
│   ├── migrations/        # Database migrations
│   ├── seed.sql           # Seed data
│   └── config.toml        # Local Supabase config
├── docker-compose.yaml    # OnlyOffice Docker setup
├── schema.sql             # Database schema
└── package.json           # Dependencies
```

## Setup Guide

### 1. Clone the Repository

```bash
git clone <repository-url>
cd awards-form-database
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase (Production)

#### a. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and API keys

#### b. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Replace the values with your Supabase project credentials:
- `NEXT_PUBLIC_SUPABASE_URL` - Found in Project Settings > API
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Found in Project Settings > API (anon key)
- `SUPABASE_SERVICE_ROLE_KEY` - Found in Project Settings > API (service_role key)

#### c. Set Up Database Schema

Run the SQL commands from `schema.sql` in your Supabase SQL Editor. The schema creates:

**Tables:**
- `users` - User profiles (linked to Supabase Auth)
- `awards` - Available awards (IPA Award - Journal, IPA Award - Book)
- `publications` - Publication records
- `submissions` - Award form submissions
- `publication_type` - Publication types (JOURNAL, BOOK CHAPTER)
- `publication_authors` - Publication-author relationships
- `publication_award_applications` - Publication-award associations
- `publication_per_award` - Award publication type requirements
- `departments` - Department records

**Storage Buckets:**
- `signatures` - User signature images
- `pdfs` - PDF documents
- `award-documents` - Award-related documents
- `submissions-documents` - Submission PDFs

**Row Level Security (RLS) Policies:**
- Public read access to user profiles
- Users can insert/update their own profile

#### d. Optional: Seed Data

Run the SQL commands from `supabase/seed.sql` in the Supabase SQL Editor to add test data:
- Sample users (testfaculty1@gmail.com, testadmin@gmail.com, test3@gmail.com)
- Sample awards
- Sample publications
- Sample submissions

### 4. Set Up OnlyOffice Document Server

OnlyOffice is used for editing Word documents within the application.

#### Using Docker Compose

```bash
docker-compose up -d
```

This starts the OnlyOffice document server on port 8080.

#### Configuration

The `docker-compose.yaml` includes:
- JWT authentication enabled (secret: `my_super_secret_key`)
- Macro support enabled
- Port mapping: `8080:80`

#### Environment Variables for OnlyOffice

If needed, add these to your environment:
```bash
ONLYOFFICE_JWT_SECRET=my_super_secret_key
NEXT_PUBLIC_ONLYOFFICE_URL=http://localhost:8080
```

### 5. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## User Roles

### Teaching Staff
- View and edit profile
- Add publications
- Submit publications for awards
- View submission status

### Non-Teaching Staff
- View and edit profile
- Submit publications for awards
- View submission status

### Admin
- View all submissions
- Review and validate submissions
- Return submissions with remarks
- Manage user profiles
- Database administration

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Supabase CLI (Local Development)

For local development, you can use the Supabase CLI:

```bash
# Start local Supabase
npx supabase start

# Stop local Supabase
npx supabase stop

# Reset local database
npx supabase db reset

# Push schema to local database
npx supabase db push
```

Update your `.env.local` for local development:
```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-local-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-local-service-role-key>
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

## Database Schema Overview

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (linked to auth.users) |
| role | text | 'teaching', 'nonteaching', or 'admin' |
| email | text | User email |
| first_name | text | First name |
| middle_name | text | Middle name |
| last_name | text | Last name |
| university | varchar | University |
| college | varchar | College |
| department | varchar | Department |
| position | varchar | Position |
| contact_number | varchar | Contact number |
| signature_path | text | Path to signature image |

### Awards Table
| Column | Type | Description |
|--------|------|-------------|
| award_id | integer | Primary key |
| title | varchar | Award title |
| description | text | Award description |

### Submissions Table
| Column | Type | Description |
|--------|------|-------------|
| submission_id | integer | Primary key |
| submitter_id | uuid | FK to users |
| award_id | integer | FK to awards |
| publication_id | integer | FK to publications |
| status | varchar | 'PENDING', 'VALIDATED', 'RETURNED' |
| reviewed_by_admin_id | uuid | FK to users (admin who reviewed) |
| pdf_json_data | jsonb | Form data |
| logs | jsonb | Submission history |
| form41_path | varchar | Path to form 4.1 |
| form42_path | varchar | Path to form 4.2 |
| form43_path | varchar | Path to form 4.3 |
| form44_path | varchar | Path to form 4.4 |

## License

ISC