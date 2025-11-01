/*
  Warnings:

  - You are about to drop the `ErrorLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `ErrorLog`;

-- CreateTable
CREATE TABLE `Log` (
    `id` VARCHAR(191) NOT NULL,
    `id_company` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `status_code` INTEGER NOT NULL,
    `msg` VARCHAR(191) NOT NULL,
    `origin` VARCHAR(191) NOT NULL,
    `json` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
