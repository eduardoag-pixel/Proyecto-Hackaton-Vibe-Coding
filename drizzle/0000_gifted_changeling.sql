CREATE TABLE `documents` (
	`id` text PRIMARY KEY NOT NULL,
	`client_id` text NOT NULL,
	`case_id` text,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`key` text NOT NULL,
	`size` integer NOT NULL,
	`mime` text NOT NULL,
	`created` text NOT NULL,
	`actor` text NOT NULL,
	`expires` text,
	`approved` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `records` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`data` text NOT NULL,
	`updated` text NOT NULL
);
