"use client";
import React, { startTransition, useCallback } from "react";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { createCategories, getCategories } from "@/app/actions/settings";
import { PlusIcon } from "lucide-react";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface ICategory {
  _id: string;
  name: string;
}

type DropdownProps = {
  value?: string;
  onFieldChange: (value: string) => void;
};

const Dropdown = ({ value, onFieldChange }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryPoints, setNewCategoryPoints] = useState<number | null>(
    null
  );

  const handleAddCategory = async () => {
    const toastId = toast.loading("Add Category...");

    startTransition(() => {
      if (newCategoryPoints === null) {
        toast.error("Points cannot be empty", { id: toastId });
        return;
      }
      createCategories(newCategoryName, newCategoryPoints)
        .then((data) => {
          if (data.error) {
            toast.error(data.error, { id: toastId });
            return;
          }
          if (data.success) {
            setCategories((prevCategories) => [
              ...prevCategories,
              { _id: data.id, name: data.name },
            ]);
            setNewCategoryName("");
            setNewCategoryPoints(null);
            toast.success(data.success, {
              id: toastId,
            });
          }
        })
        .catch(() => {
          toast.error("Failed to add category");
        });
    });
  };

  const fetchCategories = useCallback(async () => {
    const fetchedCategories = await getCategories();
    setCategories(
      fetchedCategories.map((category) => ({
        _id: category.id,
        name: category.name,
      }))
    );
    // console.log("Categories fetched:", fetchedCategories);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Select onValueChange={onFieldChange} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="choose category" />
      </SelectTrigger>
      <SelectContent className="bg-black  ">
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="hover:text-black text-xs "
            >
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="text-xs flex bg-black w-full items-center rounded-sm py-1 pl-2 hover:text-black  hover:bg-primary">
            <PlusIcon className="mr-2 w-2 h-2" /> add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-black ring-primary-500">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Category Name"
                  className=" mt-3 bg-black text-white"
                />
                <Input
                  type="number"
                  value={newCategoryPoints !== null ? newCategoryPoints : ""}
                  onChange={(e) => setNewCategoryPoints(Number(e.target.value))}
                  placeholder="Points"
                  className=" mt-3 bg-black text-white"
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="text-black"
                onClick={() => handleAddCategory()}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
