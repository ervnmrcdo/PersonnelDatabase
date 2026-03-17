import sql from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";

interface MultiFormSubmitData {
  ipaData: any;
  isResubmitting: boolean;
  form42?: File | null;
  form43?: File | null;
  form44?: File | null;
}

export default async function handleSubmit(
  submitter_id: string, 
  award_id: string, 
  publication_id: string, 
  data: MultiFormSubmitData, 
  actor_name: string
) {
  try {

    const generateFormData = { data: data, submitter_id, isSubmitting: true }

    const pdf = await fetch('/api/generate-ipa-award/route', {
      method: "POST",
      body: JSON.stringify(generateFormData)
    })

    const foo = await pdf.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(foo))
    const { ipaData, form42, form43, form44 } = data

    const payload = {
      submitter_id,
      award_id,
      publication_id,
      ipaData,
      buffer,
      actor_name,
      form42,
      form43,
      form44
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
