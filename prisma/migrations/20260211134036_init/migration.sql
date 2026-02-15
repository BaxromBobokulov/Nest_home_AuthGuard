-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datas" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "datas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "datas" ADD CONSTRAINT "datas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
