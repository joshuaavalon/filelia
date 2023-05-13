-- CreateTable
CREATE TABLE "site" (
    "type" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT,
    "url" TEXT,
    "person_id" TEXT NOT NULL,

    PRIMARY KEY ("id", "type"),
    CONSTRAINT "site_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category_id" TEXT NOT NULL,
    CONSTRAINT "tag_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "tag_category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tag_alias" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "tag_alias_id_fkey" FOREIGN KEY ("id") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tag_category" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "tag_category_alias" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "tag_category_alias_id_fkey" FOREIGN KEY ("id") REFERENCES "tag_category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "key_value" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProjectToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "tag_alias_id_name_key" ON "tag_alias"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_category_alias_name_key" ON "tag_category_alias"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_category_alias_id_name_key" ON "tag_category_alias"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTag_AB_unique" ON "_ProjectToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToTag_B_index" ON "_ProjectToTag"("B");
