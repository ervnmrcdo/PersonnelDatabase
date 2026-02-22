import sql from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handleSubmit(submitter_id: string, award_id: string, publication_id: string, data: any) {
  try {

    const pdf = await fetch('/api/generate-ipa-award/route', {
      method: "POST",
      body: JSON.stringify(data)
    })

    const foo = await pdf.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(foo))
    const { ipaData } = data


    const payload = {
      submitter_id,
      award_id,
      publication_id,
      ipaData,
      buffer
    }

    const temp = await fetch('/api/post-ipa-award/route', {
      method: "POST",
      body: JSON.stringify(payload)
    })

    if (temp.ok) {
      alert('Form Submitted')
    } else {
      alert('Failed to submit form.')
    }


  } catch (err) {
    console.log(err)
    // return res.status(500).json(`Internal Server Error, ${err}`);
  }
}
