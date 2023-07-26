import { FirebaseOrder } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";
import { nameColumn } from "./NameColumn";
import { rowSelectColumn } from "./RowSelectColumn";
import { fruitOrderColumn } from "./FruitOrderColumn";
import { setEmailColumn } from "./SetEmailColumn";
import { hasReceivedEmailColumn } from "./HasReceivedEmailColumn";

export const emailColumns: ColumnDef<FirebaseOrder>[] = [
  rowSelectColumn,
  hasReceivedEmailColumn,
  nameColumn,
  fruitOrderColumn,
  setEmailColumn,
];
