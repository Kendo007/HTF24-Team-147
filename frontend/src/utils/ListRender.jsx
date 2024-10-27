import { cn } from "@/lib/utils";
import React from "react";

export default function ListRender({ className, ItemRender, data }) {
  return (
    <div className={cn("flex gap-4 flex-wrap justify-center my-4", className)}>
      {data.map((ele, id) => (
        <ItemRender key={id} {...ele} />
      ))}
    </div>
  );
}
