-- AlterTable
ALTER TABLE `Feedback` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Project` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;
