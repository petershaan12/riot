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
  onChangeHandler: () => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = async () => {
    const toastId = toast.loading("Add Category...");
    if (newCategory.trim()) {
      try {
        const addedCategory = await createCategories(newCategory);
        setCategories((prevCategories) => [
          ...prevCategories,
          { _id: addedCategory.id, name: addedCategory.name },
        ]);
        setNewCategory("");
        toast.success("Category added", {
          id: toastId,
        });
      } catch (error) {
        console.error("Error adding category:", error);
        toast.error("Failed to add category", {
          id: toastId,
        });
      }
    }
  };

  const fetchCategories = useCallback(async () => {
    const fetchedCategories = await getCategories();
    setCategories(
      fetchedCategories.map((category) => ({
        _id: category.id,
        name: category.name,
      }))
    );
    console.log("Categories fetched:", fetchedCategories);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="choose category" />
      </SelectTrigger>
      <SelectContent className="bg-black text-white ">
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item text-xs hover:bg-primary  hover:text-black"
              onClick={() => onChangeHandler()}
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
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Category Name"
                  className=" mt-3 bg-black text-white"
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="text-black"
                onClick={() => startTransition(handleAddCategory)}
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
