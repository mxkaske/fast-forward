/*
  Warnings:

  - You are about to drop the column `memberId` on the `Invite` table. All the data in the column will be lost.
  - Added the required column `teamId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invite` DROP COLUMN `memberId`;

-- AlterTable
ALTER TABLE `Project` ADD COLUMN `teamId` VARCHAR(191) NOT NULL;
