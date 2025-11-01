/*
  Warnings:

  - You are about to drop the column `context` on the `ErrorLog` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `ErrorLog` table. All the data in the column will be lost.
  - You are about to drop the column `stack` on the `ErrorLog` table. All the data in the column will be lost.
  - Added the required column `msg` to the `ErrorLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ErrorLog` DROP COLUMN `context`,
    DROP COLUMN `message`,
    DROP COLUMN `stack`,
    ADD COLUMN `msg` VARCHAR(191) NOT NULL;
