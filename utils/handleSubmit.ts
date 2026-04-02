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

    const payload = new FormData();
    payload.append("submitter_id", submitter_id);
    payload.append("award_id", award_id);
    payload.append("publication_id", publication_id);
    payload.append("ipaData", JSON.stringify(ipaData));
    payload.append("pdf", new Blob([foo]));

    payload.append("actor_name", actor_name);
    if (form42) payload.append("form42", form42);
    if (form43) payload.append("form43", form43);
    if (form44) payload.append("form44", form44);

    const temp = await fetch('/api/post-ipa-award/route', {
      method: "POST",
      body: payload
    })


    if (temp.ok) {
      alert('Form Submitted')
    } else {
      alert('Failed to submit form.')
    }


  } catch (err) {
    console.log(err)
  }
}
