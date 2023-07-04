"use client";

import { ArrowLeftCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type HeaderDocumentProps = {
  documentNo: string;
  title: string;
};

export function HeaderDocument({ documentNo, title }: HeaderDocumentProps) {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center">
        <button className="cursor-pointer mr-3" onClick={() => router.back()}>
          <ArrowLeftCircleIcon />
        </button>
        <h1 className="text-4xl">{title}</h1>
      </div>
      <h2 className="text-xl text-slate-600 mt-4">{documentNo}</h2>
    </div>
  );
}
