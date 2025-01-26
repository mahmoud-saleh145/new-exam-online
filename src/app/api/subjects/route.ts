import { JSON_HEADER } from "@/lib/constants/api.constants";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    const accessToken = token?.token;

    // fetch subjects //
    const res = await fetch('https://exam.elevateegy.com/api/v1/subjects', {
        method: 'GET',
        headers: {
            token: accessToken || '',
            ...JSON_HEADER
        }
    })
    const data: APIResponse<PaginatedResponse<Subjects[]>> = await res.json()


    return NextResponse.json(data)
}