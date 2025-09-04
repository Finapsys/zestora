import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FORMS_DIR = path.join(process.cwd(), "public/forms");

export async function GET() {
  if (!fs.existsSync(FORMS_DIR)) {
    fs.mkdirSync(FORMS_DIR, { recursive: true });
  }

  const files = fs.readdirSync(FORMS_DIR);
  const forms = files
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const json = JSON.parse(
        fs.readFileSync(path.join(FORMS_DIR, f), "utf-8")
      );
      return {
        name: json.name || f.replace(".json", ""),
        category: json.category || "",
        data: json.data || [],
      };
    });

  return NextResponse.json({ forms });
}
