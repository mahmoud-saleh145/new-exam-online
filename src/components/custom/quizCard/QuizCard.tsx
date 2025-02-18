'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Grid } from 'react-virtualized';

export default function QuizCard() {

    const [subject, setSubject] = useState<Subjects[] | undefined>()

    const CARD_WIDTH = 370; // Card width
    const COLUMN_COUNT = 3; // Cards per row


    useEffect(() => {
        // fetch subjects
        async function getData() {

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subjects`)
            const data: APIResponse<PaginatedResponse<Subjects[]>> = await res.json()
            if (!('code' in data)) {
                setSubject(data.subjects)
            }
        }
        getData()
    }, [])


    const cellRenderer = ({ columnIndex, rowIndex, key, style }: { columnIndex: number, rowIndex: number, key: string, style: React.CSSProperties }) => {

        const index = rowIndex * COLUMN_COUNT + columnIndex;
        if (!subject || index >= subject.length) return null;

        // return cards in infinity pagination
        return (
            <div key={key} style={{ ...style, padding: "10px" }}>

                <Link href={{
                    pathname: '/quiz',
                    query: {
                        id: subject[index]._id
                    }
                }}>
                    <div key={subject[index]._id} className="position-relative cursor-pointer" >
                        <img src={subject[index].icon} className="w-100" alt='subject image'></img>
                        <h5 className="position-absolute title w-75 text-white p-4">{subject[index].name}</h5>
                    </div>
                </Link >
            </div>
        );
    };


    return (
        <>
            {subject ? (
                <Grid
                    cellRenderer={cellRenderer}
                    columnCount={COLUMN_COUNT}
                    columnWidth={CARD_WIDTH}
                    height={330} // Two rows visible
                    rowCount={2}
                    rowHeight={340}
                    width={1150} // Three cards per row
                />
            ) : (
                <h2>Loading...</h2>
            )
            }

        </>
    )
}
