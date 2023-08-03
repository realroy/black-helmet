import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";

export default function Home() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto">
      <div className="flex items-center justify-between pt-9">
        <h1 className="text-center font-bold text-3xl">Black Helmet</h1>
      </div>
      <ul className="grid grid-cols-2 py-4 gap-4">
        <Link href={"/business-documents"}>
          <li>
            <Card>
              <CardHeader>
                <CardTitle>Business Documents</CardTitle>
                <CardDescription>
                  Manage your business documents
                </CardDescription>
              </CardHeader>
            </Card>
          </li>
        </Link>
        <li>
          <Card>
            <CardHeader>
              <CardTitle>Coming soon</CardTitle>
              <CardDescription>TBA</CardDescription>
            </CardHeader>
          </Card>
        </li>
      </ul>
    </main>
  );
}
