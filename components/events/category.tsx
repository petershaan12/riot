"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCallback, useEffect, useState } from "react";
import { getCategories } from "@/app/actions/settings";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface ICategory {
  _id: string;
  name: string;
}

const Category = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

const onSelectCategory = (category: string | null) => {
    setSelectedCategory(category);
    let newUrl = "";
    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="bg-[#393939]/20 rounded-2xl border border-white/20 backdrop-blur-xl my-5">
      <h1 className="py-2 px-5 text-xl font-semibold text-start">Filter</h1>
      <Separator className="bg-white/20 " />
      <div className="p-5">
        <RadioGroup
          value={selectedCategory || "All"}
          onValueChange={(value) =>
            onSelectCategory(value === selectedCategory ? null : value)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="All" id="all" />
            <Label htmlFor="all">All Event</Label>
          </div>
          {categories.map((category) => (
            <div key={category._id} className="flex items-center space-x-2">
              <RadioGroupItem value={category.name} id={category._id} />
              <Label htmlFor={category._id}>{category.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default Category;
