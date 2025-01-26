import { JSON_HEADER } from "@/lib/constants/api.constants";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    const accessToken = token?.token;

    // logout user //
    const res = await fetch('https://exam.elevateegy.com/api/v1/auth/logout', {
        method: 'GET',
        headers: {
            token: accessToken || '',
            ...JSON_HEADER
        }
    }
    )
    const data = await res.json()
    return NextResponse.json(data)
}