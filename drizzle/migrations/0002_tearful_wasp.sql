ALTER TABLE `consultation_requests` ADD `region` varchar(100);--> statement-breakpoint
ALTER TABLE `consultation_requests` ADD `updated_at` datetime DEFAULT CURRENT_TIMESTAMP;