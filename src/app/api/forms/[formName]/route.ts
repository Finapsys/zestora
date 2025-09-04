import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const FORMS_DIR = path.join(process.cwd(), "public/forms");

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ formName: string }> }
) {
  const { formName } = await context.params;

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
  context: { params: Promise<{ formName: string }> }
) {
  const { formName } = await context.params;

  if (!fs.existsSync(FORMS_DIR)) {
    fs.mkdirSync(FORMS_DIR, { recursive: true });
  }

  const filePath = path.join(FORMS_DIR, `${formName}.json`);
  const body = await req.json();

  const formPayload = {
    name: formName,
    category: body.category || "",
    data: body.data || [],
  };

  fs.writeFileSync(filePath, JSON.stringify(formPayload, null, 2), "utf-8");
  return NextResponse.json({ message: "Form saved successfully" });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ formName: string }> }
) {
  const { formName } = await context.params;

  if (!fs.existsSync(FORMS_DIR)) {
    fs.mkdirSync(FORMS_DIR, { recursive: true });
  }

  const oldFilePath = path.join(FORMS_DIR, `${formName}.json`);

  if (!fs.existsSync(oldFilePath)) {
    return NextResponse.json(
      { error: "Form not found. Cannot update non-existing form." },
      { status: 404 }
    );
  }

  try {
    const body = await req.json();
    const { newName, data, category } = body;

    let targetFilePath = oldFilePath;

    if (newName && newName !== formName) {
      targetFilePath = path.join(FORMS_DIR, `${newName}.json`);

      if (fs.existsSync(targetFilePath)) {
        return NextResponse.json(
          { error: "A form with the new name already exists." },
          { status: 400 }
        );
      }

      fs.renameSync(oldFilePath, targetFilePath);
    }

    const formPayload = {
      name: newName || formName,
      category: category || "",
      data: data || [],
    };

    fs.writeFileSync(
      targetFilePath,
      JSON.stringify(formPayload, null, 2),
      "utf-8"
    );

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
  context: { params: Promise<{ formName: string }> }
) {
  const { formName } = await context.params;

  const filePath = path.join(FORMS_DIR, `${formName}.json`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Form not found" }, { status: 404 });
  }

  fs.unlinkSync(filePath);
  return NextResponse.json({ message: "Form deleted successfully" });
}
