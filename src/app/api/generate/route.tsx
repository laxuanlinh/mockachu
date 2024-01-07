import Column from "@/models/column";
import { generateSQL } from "@/services/generateService";



export async function GET(request: Request) {
    return Response.json({}, { status: 200 });
}

export async function POST(request: Request) {
    const columns: Column[] = await request.json();
    // console.log("Receiving request to generate for the following columns "+JSON.stringify(columns))
    
    return Response.json(await generateSQL(columns, 100), { status: 200 });
}