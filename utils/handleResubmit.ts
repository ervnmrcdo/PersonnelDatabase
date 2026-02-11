import { EditableAwardFormData, IPAFormData, SubmissionLog } from "@/lib/types"

export default async function handleResubmit(data: EditableAwardFormData, submission_id: string, logs: SubmissionLog[]) {
  try {

    const pdf = await fetch('/api/generate-ipa-award/route', {
      method: "POST",
      body: JSON.stringify(data)
    })

    const foo = await pdf.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(foo))
    const { ipaData } = data

    const resubmissionLog: SubmissionLog = {
      action: 'RESUBMITTED',
      remarks: '',
      date: Date().toLocaleString()
    }

    const newLogs = [...logs]
    newLogs.push(resubmissionLog)


    const payload = {
      ipaData,
      buffer,
      submission_id,
      newLogs,
    }

    console.log(payload)
    const temp = await fetch('/api/resubmit-award/route', {
      method: "POST",
      body: JSON.stringify(payload)
    })

    if (temp.ok) {
      alert('Form Resubmitted')
    } else {
      alert('Failed to submit form.')
    }

  } catch (err) {
    console.log(err)
  }
}
// export const handleResubmit = async (data: ) => {
//   try {
//     const response = await fetch("/api/generate-ipc-award/route", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//
// if (shouldSubmit) {
//   if (response.ok) {
//     alert('Form successfully Submitted.')
//   } else {
//     alert('Failed to submit application.')
//   }
//   return;
// }
// const blob = await response.blob();
// const url = window.URL.createObjectURL(blob);
// const a = document.createElement("a");
// a.href = url;
// a.download = "ipc-award-form.pdf";
// a.click();
//
//   } catch (err) {
//     alert('Submission Failed');
//     console.log(`Internal Server Error: ${err}`)
//   }
// };
//

// if (isResubmitting && shouldSubmit) {
//   const buffer = Buffer.from(pdfBytes);
//   const teachingId = null;
//   const nonTeachingId = 1;
//
//   const result = await sql`
//     UPDATE pendingawards
//     SET status = 'RETURNED', reviewed_by_admin_id = ${admin_id}
//     WHERE submission_id = ${submission_id} AND status = 'PENDING'
//
//     RETURNING *;
//   `;
//   console.log('INSERT result:', result);
//
//   // Verify what was actually inserted
//   const check = await sql`
//     SELECT submission_id, status, date_submitted, submitter_type, award_id
//     FROM PendingAwards
//     WHERE submission_id = ${result[0].submission_id};
//   `;
//   console.log('Verification query:', check);
// }

