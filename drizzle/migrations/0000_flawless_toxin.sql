CREATE TABLE `consultation_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`company_name` varchar(255) NOT NULL,
	`manager_name` varchar(255) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`email` varchar(255),
	`employee_count` varchar(100),
	`inquiry_type` varchar(100),
	`message` text,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `consultation_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `material_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`company_name` varchar(255) NOT NULL,
	`manager_name` varchar(255) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`email` varchar(255),
	`download_file` varchar(255),
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `material_requests_id` PRIMARY KEY(`id`)
);
