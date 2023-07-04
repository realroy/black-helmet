"use client";

import { ArrowLeftCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type HeaderDocumentProps = {
  documentNo: string;
  title: string;
  isLoading?: boolean;
};

export function HeaderDocument({
  documentNo,
  title,
  isLoading,
}: HeaderDocumentProps) {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center">
        <button className="cursor-pointer mr-3" onClick={() => router.back()}>
          <ArrowLeftCircleIcon />
        </button>
        <h1 className="text-4xl">{title}</h1>
      </div>
      {isLoading ? (
        <h2 className="bg-slate-200 h-6 w-40 animate-pulse mt-4"></h2>
      ) : (
        <h2 className="text-xl text-slate-600 mt-4">{documentNo}</h2>
      )}
    </div>
  );
}
