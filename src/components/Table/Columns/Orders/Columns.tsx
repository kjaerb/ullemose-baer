"use client";

import { FirebaseOrder } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";
import { nameColumn } from "./NameColumn";
import { emailColumn } from "./EmailColumn";
import { fruitOrderColumn } from "./FruitOrderColumn";
import { createdAtColumn } from "./CreatedAtColumn";
import { orderIdColumn } from "./OrderIdColumn";
import { actionsColumn } from "./Actions/ActionsColumn";

export const ordersColumns: ColumnDef<FirebaseOrder>[] = [
  nameColumn,
  emailColumn,
  fruitOrderColumn,
  createdAtColumn,
  orderIdColumn,
  actionsColumn,
];
