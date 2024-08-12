"use client";
import React from "react";
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

import { getCategories } from "@/app/actions/settings";
import { PlusIcon } from "lucide-react";

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

  const handleAddCategory = () => {};

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(
        fetchedCategories.map((category) => ({
          _id: category.id,
          name: category.name,
        }))
      );
    };

    fetchCategories();
  }, []);

  console.log("category", categories);

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="bg-transparent text-white">
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item p-regular-14"
              onClick={() => onChangeHandler()}
            >
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="text-xs flex w-full items-center rounded-sm py-1 pl-2 hover:text-black  hover:bg-primary">
            <PlusIcon className="mr-2 w-2 h-2" /> add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-black ring-primary-500">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="text-black">
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
