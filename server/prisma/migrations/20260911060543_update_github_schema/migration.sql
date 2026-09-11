/*
  Warnings:

  - You are about to drop the column `projectId` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Repository` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TestRunStatus" AS ENUM ('RUNNING', 'PASSED', 'FAILED');

-- DropForeignKey
ALTER TABLE "Repository" DROP CONSTRAINT "Repository_projectId_fkey";

-- DropIndex
DROP INDEX "Repository_projectId_fullName_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "AgentRun" ADD COLUMN     "branchName" TEXT,
ADD COLUMN     "currentStep" TEXT,
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Repository" DROP COLUMN "projectId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "name";

-- CreateTable
CREATE TABLE "TestRun" (
    "id" TEXT NOT NULL,
    "status" "TestRunStatus" NOT NULL,
    "command" TEXT,
    "output" TEXT,
    "error" TEXT,
    "totalTests" INTEGER NOT NULL DEFAULT 0,
    "passedTests" INTEGER NOT NULL DEFAULT 0,
    "failedTests" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentRunId" TEXT NOT NULL,

    CONSTRAINT "TestRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TestRun_agentRunId_idx" ON "TestRun"("agentRunId");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "AgentRun_taskId_idx" ON "AgentRun"("taskId");

-- CreateIndex
CREATE INDEX "AgentStep_agentRunId_idx" ON "AgentStep"("agentRunId");

-- CreateIndex
CREATE INDEX "FileChange_agentRunId_idx" ON "FileChange"("agentRunId");

-- CreateIndex
CREATE INDEX "Project_userId_idx" ON "Project"("userId");

-- CreateIndex
CREATE INDEX "PullRequest_taskId_idx" ON "PullRequest"("taskId");

-- CreateIndex
CREATE INDEX "PullRequest_repositoryId_idx" ON "PullRequest"("repositoryId");

-- CreateIndex
CREATE INDEX "Repository_userId_idx" ON "Repository"("userId");

-- CreateIndex
CREATE INDEX "Task_userId_idx" ON "Task"("userId");

-- CreateIndex
CREATE INDEX "Task_projectId_idx" ON "Task"("projectId");

-- CreateIndex
CREATE INDEX "Task_repositoryId_idx" ON "Task"("repositoryId");

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestRun" ADD CONSTRAINT "TestRun_agentRunId_fkey" FOREIGN KEY ("agentRunId") REFERENCES "AgentRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;
