import sql from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleSubmit(data: any) {
  try {

    const pdf = await fetch('/api/generate-ipa-award/route', {
      method: "POST",
      body: JSON.stringify(data)
    })

    const foo = await pdf.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(foo))
    const { ipaData } = data

    const payload = {
      ipaData,
      buffer
    }

    const temp = await fetch('/api/post-ipa-award/route', {
      method: "POST",
      body: JSON.stringify(payload)

    })
  } catch (err) {
    console.log(err)
    // return res.status(500).json(`Internal Server Error, ${err}`);
  }
}
