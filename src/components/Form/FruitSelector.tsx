import {
  ArrayPath,
  FieldValues,
  Path,
  UseFieldArrayRemove,
  UseFormReturn,
  useFieldArray,
} from "react-hook-form";
import { FormControl, FormField, FormItem } from "../ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { FruitName, fruitNameArray } from "@/validators/fruitSchema";
import { cn } from "@/lib/utils";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { Trashcan } from "../svg/Trashcan";

const kgRange = Array.from({ length: 7 }, (_, i) => i * 5).filter(
  (i) => i !== 0
);

interface FruitSelectorProps<TData extends FieldValues> {
  id: number;
  form: UseFormReturn<TData>;
  fruitName: Path<TData>;
  kgName: Path<TData>;
  remove: UseFieldArrayRemove;
  canDelete: boolean;
  excludeFruit: FruitName[];
}

export function FruitSelector<TData extends FieldValues>({
  id,
  form,
  fruitName,
  kgName,
  remove,
  canDelete,
  excludeFruit,
}: FruitSelectorProps<TData>) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-1 sm:grid-cols-2 border sm:border-none rounded-md shadow-md sm:shadow-none mt-4 mb-4 py-2 sm:mt-0 sm:mb-0 sm:py-0"
      )}
    >
      <FormField
        control={form.control}
        name={fruitName}
        render={({ field }) => (
          <FormItem className="px-2 my-1">
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Bær" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="px-2 py-1 mx-6 my-1">
                      Bær
                    </SelectLabel>
                    {fruitNameArray
                      .filter((fruit) => !excludeFruit.includes(fruit))
                      .map((fruit, i) => (
                        <SelectItem key={`${fruit}.${i}`} value={fruit}>
                          {fruit}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
      <div className="flex items-center">
        <FormField
          control={form.control}
          name={kgName}
          render={({ field }) => (
            <FormItem className="px-2 w-full my-1">
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={"5"}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Kg" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="px-2 py-1 mx-6 my-1">
                        Kg
                      </SelectLabel>
                      {kgRange.map((range, i) => (
                        <SelectItem
                          key={`${range}.${i}`}
                          value={range.toString()}
                        >
                          {range}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <Trashcan
          onClick={() => handleDelete(id)}
          className={cn(
            "sm:mr-4 absolute sm:relative right-0 top-0 bg-white sm:bg-none border rounded-full w-10 h-10 p-2 translate-x-3 -translate-y-4 sm:border-none sm:p-0 sm:translate-x-0 sm:-translate-y-0 sm:w-6 sm:h-6",
            canDelete && "hidden sm:visible"
          )}
          disabled={canDelete}
        />
      </div>
    </div>
  );

  function handleDelete(index: number) {
    if (canDelete) return;

    remove(index);
  }
}
