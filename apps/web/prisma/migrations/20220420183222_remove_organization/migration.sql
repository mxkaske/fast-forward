/*
  Warnings:

  - You are about to drop the column `organizationId` on the `Invite` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Survey` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WidgetProject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Invite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `Member` table without a default value. This is not possible if the table is not empty.
  - The required column `teamId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Invite` DROP COLUMN `organizationId`,
    ADD COLUMN `memberId` VARCHAR(191) NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Member` DROP COLUMN `organizationId`,
    ADD COLUMN `accepted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `teamId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `organizationId`,
    ADD COLUMN `teamId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Organization`;

-- DropTable
DROP TABLE `Question`;

-- DropTable
DROP TABLE `Survey`;

-- DropTable
DROP TABLE `Template`;

-- DropTable
DROP TABLE `WidgetProject`;

-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `private` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Project_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
