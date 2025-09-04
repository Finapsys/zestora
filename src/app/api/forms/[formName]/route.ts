import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const FORMS_DIR = path.join(process.cwd(), "public/forms");

export async function GET(
  req: NextRequest,
  { params }: { params: { formName: string } }
) {
  const { formName } = params;

  if (!fs.existsSync(FORMS_DIR)) {
    fs.mkdirSync(FORMS_DIR, { recursive: true });
  }

  const filePath = path.join(FORMS_DIR, `${formName}.json`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Form not found" }, { status: 404 });
  }

  const data = fs.readFileSync(filePath, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

export async function POST(
  req: NextRequest,
  { params }: { params: { formName: string } }
) {
  const { formName } = params;

  if (!fs.existsSync(FORMS_DIR)) {
    fs.mkdirSync(FORMS_DIR, { recursive: true });
  }

  const filePath = path.join(FORMS_DIR, `${formName}.json`);
  const data = await req.json();

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  return NextResponse.json({ message: "Form saved successfully" });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { formName: string } }
) {
  const { formName } = params;

  if (!fs.existsSync(FORMS_DIR)) {
    fs.mkdirSync(FORMS_DIR, { recursive: true });
  }

  const filePath = path.join(FORMS_DIR, `${formName}.json`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "Form not found. Cannot update non-existing form." },
      { status: 404 }
    );
  }

  try {
    const data = await req.json();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json({ message: "Form updated successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update form" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { formName: string } }
) {
  const { formName } = params;

  const filePath = path.join(FORMS_DIR, `${formName}.json`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Form not found" }, { status: 404 });
  }

  fs.unlinkSync(filePath);
  return NextResponse.json({ message: "Form deleted successfully" });
}
