import sql from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handleSubmit(submitter_id: string, award_id: string, publication_id: string, data: any, actor_name: string) {
  try {

    const generateFormData = { data: data, submitter_id, isSubmitting: true }


    const pdf = await fetch('/api/generate-ipa-award/route', {
      method: "POST",
      body: JSON.stringify(generateFormData)
    })



    const foo = await pdf.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(foo))
    const { ipaData } = data

    const payload = {
      submitter_id,
      award_id,
      publication_id,
      ipaData,
      buffer,
      actor_name
    }

    const temp = await fetch('/api/post-ipa-award/route', {
      method: "POST",
      body: JSON.stringify(payload)
    })


    if (temp.ok) {
      alert('Form Submitted')
    } else {
      console.log(await temp.json())
      alert('Failed to submit form.')
    }


  } catch (err) {
    console.log(err)
  }
}
