/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `UpdateDate` on the `users` table. All the data in the column will be lost.
  - Added the required column `id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateDate` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `Id`,
    DROP COLUMN `UpdateDate`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `role` ENUM('PACIENTE', 'DENTISTA') NOT NULL DEFAULT 'PACIENTE',
    ADD COLUMN `updateDate` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `agendamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,
    `pacienteId` INTEGER NOT NULL,
    `funcionarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `agendamentos` ADD CONSTRAINT `agendamentos_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agendamentos` ADD CONSTRAINT `agendamentos_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
