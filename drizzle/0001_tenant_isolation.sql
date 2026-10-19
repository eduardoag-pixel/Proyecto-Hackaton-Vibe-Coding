CREATE TABLE IF NOT EXISTS tenant_records (tenant_id text NOT NULL,id text NOT NULL,kind text NOT NULL,data text NOT NULL,updated text NOT NULL,PRIMARY KEY(tenant_id,id));
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS tenant_records_kind ON tenant_records(tenant_id,kind,updated);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS tenant_documents (tenant_id text NOT NULL,id text NOT NULL,client_id text NOT NULL,case_id text,type text NOT NULL,name text NOT NULL,key text NOT NULL,size integer NOT NULL,mime text NOT NULL,created text NOT NULL,actor text NOT NULL,expires text,approved integer DEFAULT 0 NOT NULL,PRIMARY KEY(tenant_id,id));
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS tenant_documents_client ON tenant_documents(tenant_id,client_id);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS tenant_migrations (name text PRIMARY KEY NOT NULL,tenant_id text NOT NULL);
