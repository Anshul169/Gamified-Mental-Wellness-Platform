import { Table } from 'flowbite-react'
import React from 'react'

export default function LeaderboardWin({data,flagS=false}) {
  return (
    <Table className='w-[75vw] mx-auto my-4 shadow-sm'>
        <Table.Head>
            <Table.HeadCell>S No.</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Active Since</Table.HeadCell>
            {
                flagS === true ? ( <Table.HeadCell>Streak Count</Table.HeadCell>) : (<Table.HeadCell>Score Count</Table.HeadCell> )
            }
        </Table.Head>
        <Table.Body>
        {
            data.map((entry,index)=> {
                return (
                    <Table.Row key={index}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{entry.username}</Table.Cell>
                        <Table.Cell>{entry.createdAt}</Table.Cell>
                        <Table.Cell>{flagS === true ? (entry.streak_count) : (entry.score)}</Table.Cell>
                    </Table.Row>
                )
            })
        }
        </Table.Body>
    </Table>
  )
}
